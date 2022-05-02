from kafka import KafkaProducer, KafkaAdminClient
from kafka.admin import NewTopic

import os
import json

topics = {"MESSAGE_CREATE"}

kafka_admin = KafkaAdminClient(bootstrap_servers=os.environ["KAFKA_URI"])
kafka_admin.create_topics(
    new_topics=[
        NewTopic(name=i, num_partitions=1, replication_factor=1)
        for i in topics - set(kafka_admin.list_topics())
    ]
)

kafka_producer = KafkaProducer(
    bootstrap_servers=os.environ["KAFKA_URI"],
    value_serializer=lambda v: json.dumps(v).encode("utf-8"),
)
