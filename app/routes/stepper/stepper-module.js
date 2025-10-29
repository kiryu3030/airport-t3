const RS485 = require('../../serial/rs485.js');
const stepperCMD  = require('../../utilities/stepperCMD.js');
const homeCMD  = require('../../utilities/homeCMD.js');
const { sleep } = require('../../utilities/utils.js');

class ScreenModule {
  /**
   * Insert a car
   * @param {RS485} RS485 
   */
  constructor(RS485) {
    this.RS485 = RS485;
  }

  async init() {
    this.RS485.open();
  }
  
  async outputDemo() {
    try {
      await sleep(3000);
      if(!this.RS485.isOpen) return;
      console.log("運轉中...");
      // 步進馬達參數
      let targetRun = 2.0; // 1秒內轉360度
      let pulse57 = 0.036/50.0;

      await this.RS485.write(new stepperCMD(1, 1, pulse57, targetRun, 5, 5).buf);
      

    } catch (error) {
      logging.error(error);
    }
  }

}

module.exports = ScreenModule;
