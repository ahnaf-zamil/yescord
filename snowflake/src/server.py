from xmlrpc.server import SimpleXMLRPCServer
from .snowflake import SnowflakeGenerator

server = SimpleXMLRPCServer(("localhost", 9000), logRequests=True)
snowflake = SnowflakeGenerator()

server.register_function(snowflake.generate, name="generate_snowflake")
