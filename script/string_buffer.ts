export class Buffer {
  buffer: string[] = [];
  length: number;

  constructor() {
    this.buffer = [];
    this.length = 0;
  }

  write(s: string) {
    this.length += s.length;
    this.buffer.push(s);
  }

  toString(joiner: string = '') {
    return this.buffer.join(joiner);
  }
}
