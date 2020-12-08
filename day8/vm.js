class VM {
  constructor(input) {
    this.instructions = input.split("\n");

    this.programCounter = 0;
    this.pastProgramCounters = [];
    this.accummulator = 0;
  }

  getOpCodeAndArg(instruction) {
    const [opCode, arg] = instruction.split(" ");
    return [opCode, parseInt(arg)];
  }

  parseInstruction() {
    if (this.pastProgramCounters.includes(this.programCounter)) return true;

    this.pastProgramCounters.push(this.programCounter);
    const instruction = this.instructions[this.programCounter];
    const [opCode, arg] = this.getOpCodeAndArg(instruction);

    if (opCode === "jmp") this.programCounter += arg;
    if (opCode === "acc") {
      this.accummulator += arg;
      this.programCounter++;
    }
    if (opCode === "nop") this.programCounter++;

    return false;
  }

  run() {
    let terminated = false;
    while (!terminated) {
      terminated = this.parseInstruction();
    }
  }
}

module.exports = VM;
