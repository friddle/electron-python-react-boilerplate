import zerorpc from 'zerorpc';
const child_process=require('child_process');
const path=require('path');

const PYTHON_DIR =path.join(__dirname,'pysrc/start.py');
const PY_PORT = 4242;
let pyProc = null;


const createPyProc = () => {
  if (process.env.NODE_ENV === 'development') {
    pyProc = child_process.spawn('python', [PYTHON_DIR, PY_PORT]);
  } else {
    console.log('child process not return');
  }
  if (pyProc != null) {
    console.log(`child process success on port ${PY_PORT}`);
  }
};

const exitPyProc = () => {
  if (pyProc != null)pyProc.kill();
  pyProc = null;
};

const createPyClient = () => {
  const client = new zerorpc.Client();
  client.connect(`tcp://127.0.0.1:${PY_PORT}`);
  return client;
};


export { createPyProc, exitPyProc, createPyClient };

