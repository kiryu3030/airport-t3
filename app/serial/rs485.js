const { SerialPort } = require('serialport');
const { sleep } = require('../utilities/utils.js');
const logger = require('../config/log.config.js');

const logging = logger(__filename);

function defaultRev (data) {
  console.log(data)
}

class RS485Port {
  constructor(port, baudRate) {
    this.comPort = port;

    /** @type {SerialPort} */
    this.serialport = new SerialPort({
      path: port,
      baudRate: baudRate,
      autoOpen: false,
    });

    this.serialport.on('close', ()=>{
      logging.info(`Close ${this.comPort}`);
    });

    this.serialport.on('data', defaultRev)
  }

  get isOpen() {
    return this.serialport.isOpen;
  }

  get readable() {
    return this.serialport.readable;
  }

  async open() {
    try {
      while(!this.serialport.isOpen) {
        logging.info(`Open ${this.comPort}...`);
        this.serialport.open((err) => {
          if (err) {
            logging.info(`Open ${this.comPort} failed wait 5s`)
            return 
          }
          logging.info(`Open ${this.comPort} successful`)
        });
        await sleep(5000);
      }
    } catch (error) {
      logging.error(error);
    }
  }

  async write(buf) {
    console.log(buf);
    // var buf = Buffer.from(data);
    this.serialport.write(buf);
    await sleep(40);
  }

  setErrorHandler(handler) {
    this.serialport.on('error', handler);
  }

  setResponeHandler(handler) {
    this.serialport.on('data', handler);
  }

  discon() {
    this.serialport.close();
  }

  rev(data) {
    console.log(data)
  }

  disableReceive() {
    this.serialport.off('data', defaultRev);
  }
}

let stepperPort1 = new RS485Port('COM21', 38400);
let stepperPort2 = new RS485Port('COM16', 38400);
let stepperPort3 = new RS485Port('COM17', 38400);
let servoPort1 = new RS485Port('COM18', 9600);
let servoPort2 = new RS485Port('COM6', 9600);
let servoResponePort1 = new RS485Port('COM25', 38400);
let servoResponePort2 = new RS485Port('COM26', 38400);

stepperPort1.setErrorHandler((err)=>{
  try {
    logging.info('Stepper1Error: ', err.message);
  } catch (error) {
    logging.error(error);
  }
});

stepperPort2.setErrorHandler((err)=>{
  try {
    logging.info('Stepper2Error: ', err.message);
  } catch (error) {
    logging.error(error);
  }
});

const RS485 = {
  stepperPort1: stepperPort1,
  stepperPort2: stepperPort2,
  stepperPort3: stepperPort3,
  servoPort1: servoPort1,
  servoPort2: servoPort2,
  open: () => {
    stepperPort1.open();
    stepperPort2.open();
    stepperPort3.open();
    servoPort1.open();
    servoResponePort1.open();
    servoResponePort2.open();
  },
}

export default RS485;
