const Driver = require('./driver.js');
const RS485 = require('../serial/rs485.js');
const stepperCMD  = require('../utilities/stepperCMD.js');
const homeCMD  = require('../utilities/homeCMD.js');
const { sleep } = require('../utilities/utils.js');

/**
 * 控制DM2J 系列驅控一體成型步進驅動器
 */
class DM2JDriver extends Driver {
  /**
   * @param {RS485} rs485 
   */
  constructor(rs485, { step = 0.036, gr = 50.0 } = {}) {
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
    const pos = Math.round(angle * this.gr);
    await this.rs485.write(new stepperCMD(id, mode, this.pulse, runTime, pos).buf);
  }

  get isOpen() {
    return this.rs485.isOpen;
  }
  
  async outputDemo() {
    try {
      await sleep(3000);
      if(!this.RS485.isOpen) return;
      console.log("回限位...");
      await this.RS485.write(new homeCMD(1).buf);
      await this.RS485.write(new homeCMD(2).buf);
      await this.RS485.write(new homeCMD(3).buf);
      await sleep(6000);
      console.log("運轉中...");
      // 步進馬達參數
      let targetRun = 1.2; // 1秒內轉360度
      let pulse57 = 0.036/50.0;

      for(let j=0;j<100;j++){
        await this.RS485.write(new stepperCMD(1, 1, pulse57, targetRun, 40).buf);
        await this.RS485.write(new stepperCMD(2, 1, pulse57, targetRun, 40).buf);
        await this.RS485.write(new stepperCMD(3, 1, pulse57, targetRun, 40).buf);
        await sleep(5500);
        await this.RS485.write(new stepperCMD(1, 1, pulse57, targetRun, 10).buf);
        for(let i=0;i<3;i++){
          await sleep(4100);
          await this.RS485.write(new stepperCMD(1, 1, pulse57, targetRun, 40).buf);
          await this.RS485.write(new stepperCMD(2, 1, pulse57, targetRun, 10).buf);
          await sleep(4100);
          await this.RS485.write(new stepperCMD(2, 1, pulse57, targetRun, 40).buf);
          await this.RS485.write(new stepperCMD(3, 1, pulse57, targetRun, 10).buf);
          await sleep(4100);
          await this.RS485.write(new stepperCMD(3, 1, pulse57, targetRun, 40).buf);
          await this.RS485.write(new stepperCMD(1, 1, pulse57, targetRun, 10).buf);
        }
        await sleep(4100);
        await this.RS485.write(new stepperCMD(1, 1, pulse57, targetRun, 40).buf);
        await sleep(4100);
        await this.RS485.write(new stepperCMD(1, 1, pulse57, targetRun, 0).buf);
        await this.RS485.write(new stepperCMD(2, 1, pulse57, targetRun, 0).buf);
        await this.RS485.write(new stepperCMD(3, 1, pulse57, targetRun, 0).buf);
        await sleep(5500);
        await sleep(1000);

        console.log("回限位...");
        await this.RS485.write(new homeCMD(1).buf);
        await this.RS485.write(new homeCMD(2).buf);
        await this.RS485.write(new homeCMD(3).buf);
        await sleep(5000);
        console.log("運轉中...");
      }
      
	  
	  

    } catch (error) {
      console.error(error);
    }
  }

}

module.exports = DM2JDriver;
