# electron-react-python-boilerplate

[中文](https://github.com/friddle/electron-react-mobx-python-boilerplate/blob/master/ReadME-CN.md)


### Reason   
Forked [electron-react-boilerplate:https://github.com/chentsulin/electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)   
Inspired by [electron-python:https://github.com/friddle/electron-python-example.git](https://github.com/friddle/electron-python-example.git)
Fixed to use python backend.   
Because Js is suck to write background code.    


### Attention:  
##### NodeJs:NODE_MODULE use version with 54 ,NODE version startwith 8
##### Linux must install libzmq-dev(sudo apt-get install libzmq-dev)


##### PyInstaller meet the problem on Mac System
Issue[https://github.com/zeromq/pyzmq/issues/1105]   

Fix by code blow
found code location:`/usr/local/lib/python2.7/site-packages/zmq/init.py`

```$python
    try:
        from . import libzmq
    except ImportError as e:
        pass
```
Change to
```
    try:
        from . import libzmq
    except ImportError as e:
        #for compatiable pyinstaller runner
        import os;os.chdir(os.path.join(os.path.dirname(__file__),"../"))
        import shutil;
        if os.path.exists("./zmq/libzmq.so"): shutil.copy('./zmq/libzmq.so','./');
        import libzmq
```


### Usage  
remove package test/flow method


####development
1.run development environment:
tyarn run start-render-dev
tyarn run start-main-dev

2.run package
tyarn run package-mac 
or other platform

more usage:please find 







