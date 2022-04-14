from py_eureka_client.eureka_client import EurekaClient

import os

eureka_client = EurekaClient(
    f"http://{os.environ['EUREKA_SERVER']}:{os.environ['EUREKA_PORT']}/eureka",
    should_register=False,
)
