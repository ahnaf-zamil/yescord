from xmlrpc.client import ServerProxy
import os

snowflake_proxy = ServerProxy(os.environ["SNOWFLAKE_SERVICE"])


def get_db_url():
    user = os.environ["MYSQL_USER"]
    password = os.environ["MYSQL_PASSWORD"]
    server = os.environ["MYSQL_SERVER"]
    db = os.environ["MYSQL_DB"]
    return f"mysql+pymysql://{user}:{password}@{server}/{db}"


def get_snowflake() -> str:
    snowflake = snowflake_proxy.generate_snowflake()
    return snowflake  # XML-RPC returns string
