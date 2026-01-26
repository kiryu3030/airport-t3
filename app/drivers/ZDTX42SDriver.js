const Driver = require('./driver.js');
const RS485 = require('../serial/rs485.js');
const stepperCMD  = require('../utilities/ZDT_X42S/stepperCMD.js');
const homeCMD  = require('../utilities/ZDT_X42S/homeCMD.js');

/**
 * 控制ZDT_X42S 第二代閉迴路步進電機
 */
class ZDT_X42SModule extends Driver {
  /**
   * @param {RS485} rs485 
   */
  constructor(rs485, { step = 1.8, gr = 50.0 } = {}) {
    super();
    this.rs485 = rs485;
    this.step = step;
    this.gr = gr;
    this.pulse = step/gr;
  }

  async init() {
    this.rs485.open();
  }

  async home(ids) {
    for (const id of ids) {
      await this.rs485.write(new homeCMD(id).buf);
    }
  }

  async move({ id, mode, runTime, angle }) {
    await this.rs485.write(new stepperCMD(id, mode, this.pulse, runTime, angle).buf);
  }

  get isOpen() {
    return this.rs485.isOpen;
  }

}

module.exports = ZDT_X42SModule;
