const logger = require('./app/config/log.config.js');
const logging = logger(__filename);

const RS485Port = require('./app/serial/rs485.js');
const DM2JDriver = require('./app/drivers/DM2JDriver.js');
const ZDT_X42SModule = require('./app/drivers/ZDTX42SDriver.js');
const { Demo_1, Demo_2 } = require('./app/services/demo-1.js');

// const screen_1 = new ScreenModule(new RS485Port('COM3', 38400));

// const driver = new DM2JDriver(new RS485Port('COM3', 115200), { step: 0.036 , gr: 50.0});
const driver = new ZDT_X42SModule(new RS485Port('COM3', 115200), { step: 1.8 , gr: 50.0});
driver.init();

// const demo1 = new Demo_1(driver);
// demo1.run();

const demo2 = new Demo_2(driver);
demo2.run();
