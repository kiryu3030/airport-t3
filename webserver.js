const mainApp = require('./app/app.js');
const logger = require('./app/config/log.config.js');

const logging = logger(__filename);

const RS485 = require('./app/serial/rs485.js');

const { sleep } = require('./app/utilities/utils.js');

// const PORT = 8084;
// mainApp.listen(PORT, () => {
//   logging.info(`WebServer is running on port ${PORT}`)
// })

console.log("test");
RS485.open();

sleep(5);

