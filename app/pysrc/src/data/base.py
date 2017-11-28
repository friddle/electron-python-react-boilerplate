from peewee import Proxy, SqliteDatabase
import os

database_url = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
database_proxy = Proxy()
database = SqliteDatabase(os.path.join(database_url, "./data.db"));
database.connect()


# database = database_proxy
