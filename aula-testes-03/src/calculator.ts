function sum(n1: number, n2: number) {
  return n1 + n2;
}

function sub(n1: number, n2: number) {
  return n1 - n2;
}

function div(n1: number, n2: number) {
  return n1 / n2;
}

function mul(n1: number, n2: number) {
  return n1 * n2;
}

const calculator = {
  sum, sub, div, mul
}

export default calculator;