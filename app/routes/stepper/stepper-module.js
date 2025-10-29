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
      console.log("回限位...");
      await this.RS485.write(new homeCMD(1).buf);
      await this.RS485.write(new homeCMD(2).buf);
      await this.RS485.write(new homeCMD(3).buf);
      await sleep(6000);
      console.log("運轉中...");
      // 步進馬達參數
      let targetRun = 1.2; // 1秒內轉360度
      let pulse57 = 0.036/50.0;

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
	  
	  

    } catch (error) {
      logging.error(error);
    }
  }

}

module.exports = ScreenModule;
