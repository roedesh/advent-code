class VM {
  constructor(input) {
    this.instructions = input.split("\n").map(this._parseInputLine);

    this._reset();
  }

  _reset() {
    this.programCounter = 0;
    this.accummulator = 0;
    this.seen = new Set();
  }

  _parseInputLine(inputLine) {
    const [opCode, arg] = inputLine.split(" ");
    return [opCode, +arg];
  }

  _parseInstruction() {
    this.seen.add(this.programCounter);
    const [opCode, arg] = this.instructions[this.programCounter];

    this.programCounter++;

    if (opCode === "jmp") this.programCounter += -1 + arg;
    if (opCode === "acc") this.accummulator += arg;
  }

  _swapOpCode(opCode) {
    return opCode === "jmp" ? "nop" : "jmp";
  }

  fixAndRunProgram() {
    for (let i = 0; i < this.instructions.length; i++) {
      const instruction = this.instructions[i];
      const [opCode, arg] = instruction;

      if (opCode === "acc") continue;

      this.instructions[i] = [this._swapOpCode(opCode), arg];
      const [exited, acc] = this.run();
      if (exited) {
        return [exited, acc];
      }
      this.instructions[i] = instruction;
    }
  }

  run() {
    this._reset();
    let exited = true;

    while (this.programCounter < this.instructions.length) {
      if (this.seen.has(this.programCounter)) {
        exited = false;
        break;
      }
      this._parseInstruction();
    }

    return [exited, this.accummulator];
  }
}

module.exports = VM;
