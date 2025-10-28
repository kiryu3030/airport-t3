class homeCMD {
  /**
   * home CMD
   * @param {Number} id Slave id 1-4
   */
  constructor(id) {
    this.id = id;

    this.cmd = Buffer.allocUnsafe(8);
    this.cmd.writeUint8(id, 0); //1
    this.cmd.writeUint8(0x06, 1); //1
    this.cmd.writeUint8(0x60, 2); //1
    this.cmd.writeUint8(0x02, 3); //1
    this.cmd.writeUint8(0x00, 4); //1
    this.cmd.writeUint8(0x20, 5); //1
    let crc = this.crc16(this.cmd);
    this.cmd.writeUint16LE(crc, 6); //2 crc
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

export default homeCMD;

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
