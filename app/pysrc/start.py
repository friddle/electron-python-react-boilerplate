import os;os.chdir(os.path.dirname(os.path.abspath(__file__)))
import sys;sys.path.append('./src')

from helloworld import HelloWorld;
import zerorpc

OPEN_PORT=str(4242)

class Server:
    def __init__(self):
        self.objects = []

    def register(self, obj):
        self.objects.append(obj)
        for method in dir(obj):
            if callable(getattr(obj, method)) and not method.startswith("__"):
                if dir(self).__contains__(method):print("you have register method:"+method);sys.exit(0);
                setattr(self,method,getattr(obj,method))


def main(port):
    addr='tcp://127.0.0.1:'+ port
    server = Server()
    server.register(HelloWorld())
    s = zerorpc.Server(server)
    s.bind(addr);
    print("start running on {}".format(addr))
    s.run()

if __name__=="__main__":
    main(sys.argv[1])
