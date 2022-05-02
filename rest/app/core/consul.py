import dns.resolver
import os

resolver = dns.resolver.Resolver(configure=False)
resolver.nameservers = [os.environ["CONSUL_HOST"]]
resolver.port = int(os.environ["CONSUL_PORT"])
root_domain = ".service.dc1.consul"


class NoRecordFound(Exception):
    """Thrown when no records are found in Consul"""


def get_service_instance(service_name: str) -> str:
    records: dns.resolver.Answer = resolver.resolve(service_name + root_domain, "SRV")

    if not len(records):
        raise NoRecordFound("No records found")

    instance_ip = resolver.resolve(records[0].target)[0].address
    return f"{instance_ip}:{records[0].port}"
