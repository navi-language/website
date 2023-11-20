export class Buffer {
  buffer: string[] = [];
  length: number;

  constructor() {
    this.buffer = [];
    this.length = 0;
  }

  write(s: string | Buffer) {
    this.length += s.length;
    if (s instanceof Buffer) {
      s.buffer.forEach((s) => {
        this.buffer.push(s.toString());
      });
    } else {
      this.buffer.push(s);
    }
  }

  toString(joiner: string = '') {
    return this.buffer.join(joiner);
  }
}
