class VM {
  constructor(input) {
    this.instructions = input.split("\n").map(this._parseInputLine);

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

  run() {
    while (
      !this.seen.has(this.programCounter) &&
      this.programCounter < this.instructions.length
    ) {
      this._parseInstruction();
    }

    return [this.accummulator, this.programCounter];
  }
}

module.exports = VM;
