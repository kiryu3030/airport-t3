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

module.exports = RS485Port;

// let stepperPort1 = new RS485Port('COM3', 38400);

// stepperPort1.setErrorHandler((err)=>{
//   try {
//     logging.info('Stepper1Error: ', err.message);
//   } catch (error) {
//     logging.error(error);
//   }
// });

// const RS485 = {
//   stepperPort1: stepperPort1,
//   open: () => {
//     stepperPort1.open();
//   },
// }

// module.exports = RS485;
