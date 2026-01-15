class stepperCMD {
  /**
   * stepper CMD
   * @param {Number} id Slave id 1-4
   * @param {Number} mode Absolute or relative
   * @param {Number} pulse pulse
   * @param {Number} runTime runTime
   * @param {Number} angle angle
   */
  constructor(id, mode, pulse, runTime, angle, addRunTime = true) {
    this.id = id;
    this.mode = mode;
    this.pos = Math.round(angle / pulse);
    this.speed = this.calSpeed(pulse, runTime, 0.1);
    this.rpm = Math.round(pulse/360.0*this.speed*60.0);
    this.accrpm = this.calAccDecRPM(this.rpm, 0.3);
    // console.log(this.pos);
    // console.log(this.speed);
    // console.log(this.rpm);
    // console.log(this.accrpm);
    // this.acc = this.rpm;
    // this.dec = this.rpm;

    this.cmd = Buffer.allocUnsafe(25);
    this.cmd.writeUint8(id, 0); //1
    this.cmd.writeUint8(16, 1); //1 fc
    this.cmd.writeUint16BE(25088, 2); //2 fc
    this.cmd.writeUint16BE(8, 4); //2 write word
    this.cmd.writeUint8(16, 6); //1 write byte
    this.cmd.writeUint16BE(mode, 7); //2 mode
    this.cmd.writeInt32BE(this.pos, 9); //4 pos
    this.cmd.writeUint16BE(this.rpm, 13); //2 speed
    this.cmd.writeUint16BE(this.accrpm, 15); //2 acc
    this.cmd.writeUint16BE(this.accrpm, 17); //2 acc
    this.cmd.writeUint16BE(0, 19); //2 delay time
    this.cmd.writeUint16BE(16, 21); //2 trigger
    let crc = this.crc16(this.cmd);
    this.cmd.writeUint16LE(crc, 23); //2 crc
  }

  calSpeed(pulse, stepperRunTime, stepperAdTime) {
    let A = ((360*1000000)/(pulse*1000000));
    let initTime = 0;
    return  Math.round((A-initTime*stepperAdTime)/(stepperRunTime-stepperAdTime));
  }

  calAccDecRPM(speed, stepperAdTime) {
    let initTime = 0;
    let acc = (1000.0*stepperAdTime)/speed;
    acc = Math.round(acc);
    return acc;
  }

  crc16(buffer) {
    var crc = 0xFFFF;
    var odd;

    for (var i = 0; i < buffer.length-2; i++) {
        crc = crc ^ buffer[i];

        for (var j = 0; j < 8; j++) {
            odd = crc & 0x0001;
            crc = crc >> 1;
            if (odd) {
                crc = crc ^ 0xA001;
            }
        }
    }

    return crc;
  };

  get buf() {
    return this.cmd;
  }
}

module.exports = stepperCMD;

// class stepperCMD {
//   /**
//    * stepper CMD
//    * @param {Number} id Slave id 1-4
//    * @param {Number} mode Absolute or relative
//    * @param {Number} pos 32bit
//    * @param {Number} speed rpm
//    * @param {Number} acc ms/1000rpm
//    * @param {Number} dec ms/1000rpm
//    */
//   constructor(id, mode, pos, speed, acc, dec) {
//     this.id = id;
//     this.mode = mode;
//     this.pos = pos;
//     this.speed = speed;
//     this.acc = acc;
//     this.dec = dec;

//     this.cmd = Buffer.allocUnsafe(25);
//     this.cmd.writeUint8(id, 0); //1
//     this.cmd.writeUint8(16, 1); //1 fc
//     this.cmd.writeUint16BE(25088, 2); //2 fc
//     this.cmd.writeUint16BE(8, 4); //2 write word
//     this.cmd.writeUint8(16, 6); //1 write byte
//     this.cmd.writeUint16BE(mode, 7); //2 mode
//     this.cmd.writeUint32BE(pos, 9); //4 pos
//     this.cmd.writeUint16BE(speed, 13); //2 speed
//     this.cmd.writeUint16BE(acc, 15); //2 acc
//     this.cmd.writeUint16BE(dec, 17); //2 acc
//     this.cmd.writeUint16BE(0, 19); //2 delay time
//     this.cmd.writeUint16BE(16, 21); //2 trigger
//     let crc = this.crc16(this.cmd);
//     this.cmd.writeUint16LE(crc, 23); //2 crc
//   }

//   crc16(buffer) {
//     var crc = 0xFFFF;
//     var odd;

//     for (var i = 0; i < buffer.length-2; i++) {
//         crc = crc ^ buffer[i];

//         for (var j = 0; j < 8; j++) {
//             odd = crc & 0x0001;
//             crc = crc >> 1;
//             if (odd) {
//                 crc = crc ^ 0xA001;
//             }
//         }
//     }

//     return crc;
//   };

//   get buf() {
//     return this.cmd;
//   }
// }

// export default stepperCMD;
