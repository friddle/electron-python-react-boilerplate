import os;os.chdir(os.path.dirname(os.path.abspath(__file__)))
import sys;sys.path.append('./src')

from helloworld import HelloWorld;
import zerorpc


OPEN_PORT=str(4242)

def main():
    addr='tcp://127.0.0.1:'+ OPEN_PORT
    s=zerorpc.Server(HelloWorld())
    s.bind(addr);
    print("start running on {}".format(addr))
    s.run()

if __name__=="__main__":
    main()
