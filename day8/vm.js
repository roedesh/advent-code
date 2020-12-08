class VM {
  constructor(input) {
    this.input = input.split("\n");

    this.programCounter = 0;
    this.pastProgramCounters = [];
    this.accummulator = 0;
  }

  _getNameAndArg(opCode) {
    const [name, arg] = opCode.split(" ");
    const parsedArg = parseInt(arg);
    return [name, parsedArg];
  }

  parseOpCode() {
    if (this.pastProgramCounters.includes(this.programCounter)) return true;

    this.pastProgramCounters.push(this.programCounter);
    const opCode = this.input[this.programCounter];
    const [name, arg] = this._getNameAndArg(opCode);

    if (name === "jmp") this.programCounter += arg;
    if (name === "acc") {
      this.accummulator += arg;
      this.programCounter++;
    }
    if (name === "nop") this.programCounter++;

    return false;
  }
}

module.exports = VM;
