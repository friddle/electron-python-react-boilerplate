#!/usr/bin/env python
import sys
import shutil
import os;os.chdir(os.path.join(os.path.dirname(__file__),"../../"))

python_excutable_location=os.path.join(os.environ['_'],"../")
zeromq_location=""
#for compatiable the zeromq bug, get zeromq location  and copy to pyinstaller location
# issues:https://github.com/zeromq/pyzmq/issues/999
#  https://github.com/zeromq/pyzmq/issues/581
'''
if sys.platform.startswith('win32'):
    zeromq_location=os.path.join(python_excutable_location,"Lib/site-packages/zmq/*")
    shutil.copy(zeromq_location,os.path.join(python_excutable_location,"Lib/site-packages/zmq/backend/cython/"))
elif sys.platform.startswith('darwin'):
    zeromq_location="/usr/local/lib/python2.7/site-packages/zmq"
    shutil.copy(zeromq_location+"/*",os.path.join(zeromq_location,"./backend/cython/"))
else:
    print(sys.platform+" platform not support")
    print("deal with zmq problem  https://github.com/zeromq/pyzmq/issues/999")
'''
    
os.system(
    "pyinstaller app/pysrc/start.py \
    --workpath app/pysrc/ \
    -p app/pysrc/src/ \
    --distpath app/pysrc/build/ \
    -F"\
   )