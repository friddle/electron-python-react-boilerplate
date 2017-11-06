import os;

os.chdir(os.path.dirname(os.path.abspath(__file__)))
import sys;

sys.path.append('./src')
import zerorpc
import inspect

OPEN_PORT = str(4242)

from excel.parser import Parser;
from services.ClassDetailServices import ClassDetailServices


class Server:
    def __init__(self):
        self.objects = []

    def register(self, obj):
        self.objects.append(obj)
        for method in dir(obj):
            if callable(getattr(obj, method)) and not method.startswith("__"):
                if dir(self).__contains__(method):print("you have register method:"+method);sys.exit(0);
                setattr(self,method,getattr(obj,method))


def main():
    addr = 'tcp://127.0.0.1:' + OPEN_PORT
    server = Server()
    server.register(Parser())
    server.register(ClassDetailServices())
    s = zerorpc.Server(server)
    s.bind(addr)
    print("start running on {}".format(addr))
    s.run()


if __name__ == "__main__":
    main()
