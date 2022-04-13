import time
import traceback
import random

APP_EPOCH = time.mktime((2022, 4, 12, 0, 0, 0, 0, 0, 0))

# Bits
SEQUENCE_BITS = 12
WORKER_ID_BITS = 5
DATACENTER_ID_BITS = 5

# Max values
M_WORKER_ID = (1 << WORKER_ID_BITS) - 1
M_DATACENTER_ID = (1 << DATACENTER_ID_BITS) - 1
SEQUENCE_MASK = (1 << SEQUENCE_BITS) - 1

# Shifted values
S_WORKER_ID = SEQUENCE_BITS
S_DATACENTER_ID = SEQUENCE_BITS + WORKER_ID_BITS
S_TIMESTAMP = SEQUENCE_BITS + WORKER_ID_BITS + DATACENTER_ID_BITS


class SnowflakeGenerator:
    """Unique snowflake ID generator"""

    last_timestamp = -1
    sequence = 0

    @staticmethod
    def time_till_next_ms(last_timestamp: int) -> int:
        timestamp = int((time.time()) * 1000)
        while timestamp <= timestamp:
            timestamp = int((time.time()) * 1000)
        return timestamp

    def generate(
        self,
        worker_id: int = random.randint(0, 30),
        datacenter_id: int = random.randint(0, 30),
    ):
        try:
            timestamp = int((time.time()) * 1000)

            if timestamp < self.last_timestamp:
                raise Exception(
                    f"System clock is moving backwards. Rejecting requests until {self.last_timestamp}"
                )

            if self.last_timestamp == timestamp:
                self.sequence = (self.sequence + 1) & SEQUENCE_MASK

                if self.sequence == 0:
                    timestamp = self.time_till_next_ms(self.last_timestamp)
                else:
                    self.sequence = 0

            self.last_timestamp = timestamp

            return str(
                ((timestamp - int(APP_EPOCH * 1000)) << S_TIMESTAMP)
                | (datacenter_id << S_DATACENTER_ID)
                | (worker_id << S_WORKER_ID)
                | self.sequence
            )  # Returning string because the integer exceeds RPC limits
        except Exception as e:
            print(
                traceback.format_exc()
            )  # Printing exception since XMLRPC does not print it
            raise e
