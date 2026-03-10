/*
Original implementation used recursive Fibonacci.

Problem:
- Extremely slow
- Blocks Node.js event loop
- Server becomes unresponsive during heavy requests

Fix:
Replace recursive Fibonacci with iterative approach.
Time complexity reduced significantly.
*/

export function heavyComputation(n) {
  let a = 0;
  let b = 1;

  for (let i = 0; i < n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }

  return a;
}
