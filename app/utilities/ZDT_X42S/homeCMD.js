class homeCMD {
  /**
   * home CMD
   * @param {Number} id Slave id 1-3
   */
  constructor(id) {
    this.id = id;

    this.cmd = Buffer.allocUnsafe(5);
    this.cmd.writeUint8(id, 0); //1
    this.cmd.writeUint8(0x9A, 1); //1
    this.cmd.writeUint8(0x03, 2); //1
    this.cmd.writeUint8(0x00, 3); //1
    this.cmd.writeUint8(0x6B, 4); //1
  }

  get buf() {
    return this.cmd;
  }
}

module.exports = homeCMD;
