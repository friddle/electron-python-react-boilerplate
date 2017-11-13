## electron-react-mobx-python-boilerplate
[项目地址](https://github.com/friddle/electron-react-mobx-python-boilerplate])    
后端改成python。前端改成mobx-react   


### 原因
当时用过这个项目撸过[electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate)项目，还觉得挺好用的。      
但是后端用js的几个牛叉的库后顿感还是不很爽。前端倒是用React+MaterialUI挺舒服的。就是redux有点繁杂。所以果断换成mobx来取代了。    
后端换成python是参考了[electron-python-sample](https://github.com/friddle/electron-python-example.git)这个项目。    

### 注意
1.NodeJs的Node_Module必须是42.Node的版本必须8开头.    
2.Linux 需要安装gcc/libzmq-dev    
3.Windows 需要安装vc。cnpm install --global windows-build-tools 还有python的基础环境.   
4.mac 需要安装xcode为了编译.   

#### mac的pyinstaller打包问题
[Issue] (https://github.com/zeromq/pyzmq/issues/1105)  

找到文件:`/python2.7/site-packages/zmq/init.py`
```$python
    try:
        from . import libzmq
    except ImportError as e:
        pass
```
修改成这个
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


#### mac的打包问题   
electron在最新的mac上是有安全毛病的（正在解决中） 

### 用法  
去掉了test和flow，因为前端用的不多。项目不大。    
后端写的不爽换Python了。    
推荐使用tyarn：cnpm install -g tyarn yarn    

1.   测试环境
tyarn run start-render-dev  
tyarn run start-main-dev   

2.   打包
tyarn run package-mac   
tyarn run package-win    
tyarn run package-linux     

3.   python入口
入口文件在：app/pysrc/start.py   
python app/pysrc/start.py  
测试方法终端。 zerorpc tcp://localhost:4242 hello "world"   

4.   前端入口  
在   app/index.js   


