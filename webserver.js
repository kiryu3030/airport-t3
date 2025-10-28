const mainApp = require('./app/app.js');
const logger = require('./app/config/log.config.js');

const logging = logger(__filename);

// const PORT = 8084;
// mainApp.listen(PORT, () => {
//   logging.info(`WebServer is running on port ${PORT}`)
// })

console.log("test");
