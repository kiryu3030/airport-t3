const mainApp = require('./app/app.js');
const logger = require('./app/config/log.config.js');

const logging = logger(__filename);

const RS485Port = require('./app/serial/rs485.js');

const ScreenModule = require('./app/routes/stepper/stepper-module.js');
const { sleep } = require('./app/utilities/utils.js');

// const PORT = 8084;
// mainApp.listen(PORT, () => {
//   logging.info(`WebServer is running on port ${PORT}`)
// })

const screen_1 = new ScreenModule(new RS485Port('COM3', 38400));
screen_1.init();
screen_1.outputDemo();

