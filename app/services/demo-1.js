const Driver = require('../drivers/driver.js');
const { sleep } = require('../utilities/utils.js');

class Demo_1 {
  /**
   * @param {Driver} stepperDriver 
   */
  constructor(stepperDriver) {
    this.driver = stepperDriver;
  }

  async run() {
    try {
      await sleep(3000);
      if(!this.driver.isOpen) return;
      console.log("回限位...");
      await this.driver.home([1,2,3]);
      await sleep(6000);
      console.log("運轉中...");
      // 步進馬達參數
      let targetRun = 1.2;
      let pulse57 = 1.8;

      for(let j=0;j<100;j++){
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:180});
        await this.driver.move({id:2, mode:1, runTime:targetRun, angle:180});
        await this.driver.move({id:3, mode:1, runTime:targetRun, angle:180});
        await sleep(5500);
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:0});
        for(let i=0;i<3;i++){
          await sleep(4100);
          await this.driver.move({id:1, mode:1, runTime:targetRun, angle:180});
          await this.driver.move({id:2, mode:1, runTime:targetRun, angle:0});
          await sleep(4100);
          await this.driver.move({id:2, mode:1, runTime:targetRun, angle:180});
          await this.driver.move({id:3, mode:1, runTime:targetRun, angle:0});
          await sleep(4100);
          await this.driver.move({id:3, mode:1, runTime:targetRun, angle:180});
          await this.driver.move({id:1, mode:1, runTime:targetRun, angle:0});
        }
        await sleep(4100);
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:180});
        await sleep(4100);
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:0});
        await this.driver.move({id:2, mode:1, runTime:targetRun, angle:0});
        await this.driver.move({id:3, mode:1, runTime:targetRun, angle:0});
        await sleep(5500);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
}

class Demo_2 {
  /**
   * @param {Driver} stepperDriver 
   */
  constructor(stepperDriver) {
    this.driver = stepperDriver;
  }

  async run() {
    try {
      await sleep(3000);
      if(!this.driver.isOpen) return;
      console.log("回限位...");
      await this.driver.home([1,2,3]);
      await sleep(6000);
      console.log("運轉中...");
      // 步進馬達參數
      let targetRun = 1.2;
      let pulse57 = 1.8;

      while(true){
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:40});
        await this.driver.move({id:2, mode:1, runTime:targetRun, angle:40});
        await this.driver.move({id:3, mode:1, runTime:targetRun, angle:40});
        await sleep(5500);
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:10});
        for(let i=0;i<3;i++){
          await sleep(4100);
          await this.driver.move({id:1, mode:1, runTime:targetRun, angle:40});
          await this.driver.move({id:2, mode:1, runTime:targetRun, angle:10});
          await sleep(4100);
          await this.driver.move({id:2, mode:1, runTime:targetRun, angle:40});
          await this.driver.move({id:3, mode:1, runTime:targetRun, angle:10});
          await sleep(4100);
          await this.driver.move({id:3, mode:1, runTime:targetRun, angle:40});
          await this.driver.move({id:1, mode:1, runTime:targetRun, angle:10});
        }
        await sleep(4100);
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:40});
        await sleep(4100);
        await this.driver.move({id:1, mode:1, runTime:targetRun, angle:0});
        await this.driver.move({id:2, mode:1, runTime:targetRun, angle:0});
        await this.driver.move({id:3, mode:1, runTime:targetRun, angle:0});
        await sleep(5500);
        await sleep(1000);

        console.log("回限位...");
        await this.driver.home([1,2,3]);
        await sleep(6000);
        console.log("運轉中...");
      }
      

    } catch (error) {
      console.error(error);
    }
  }
  
}

module.exports = { Demo_1, Demo_2 };
