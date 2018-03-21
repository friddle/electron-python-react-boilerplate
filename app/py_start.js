import zerorpc from 'zerorpc';

const child_process = require('child_process');
const path = require('path');
const app = require('electron').app;
const tcpPortUsed = require('tcp-port-used');

import { dialog } from 'electron';


const PYTHON_DIR = path.join(__dirname, 'pysrc/start.py');
let pyProc = null;

const RUNNING_PYTHON_DIR = path.join(app.getAppPath(), '../');


const testPyPort = async () => {
  let PY_PORT = 4242;
  let isUse = await tcpPortUsed.check(PY_PORT, '127.0.0.1');
  let times = 0;
  while (isUse) {
    PY_PORT += 1;
    times += 1;
    isUse = await tcpPortUsed.check(PY_PORT, '127.0.0.1');
    if (times > 10) {
      dialog.showMessageBox(
        {
          type: 'error',
          buttons: ['确认'],
          title: '错误',
          message: '端口已经被占'
        },
            () => {
              app.quit();
            },
        );
      process.exit(4);
    }
  }
  return PY_PORT;
};

const createPyProc = (pyPort) => {
  if (process.env.NODE_ENV === 'development') {
    console.info(`PythonDevelopLocation:${PYTHON_DIR}`);
    pyProc = child_process.spawn('python', [PYTHON_DIR,'4242']);
  } else {
    console.info(`PythonStartLocation:${RUNNING_PYTHON_DIR}`);
    pyProc = child_process.execFile(path.join(RUNNING_PYTHON_DIR, 'start', '4242'));
  }
  if (pyProc != null) {
    console.info(`child process success on port ${pyPort}`);
  }
};

const exitPyProc = () => {
  if (pyProc != null)pyProc.kill();
  pyProc = null;
};

const createPyClient = (pyPort) => {
  const client = new zerorpc.Client({ timeout: 100000 });
  client.connect(`tcp://127.0.0.1:${pyPort}`);
  return client;
};


export { createPyProc, exitPyProc, createPyClient, testPyPort };

