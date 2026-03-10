export function heavyComputation(n) {
  function fibonacci(x) {
    if (x <= 1) return x;
    return fibonacci(x - 1) + fibonacci(x - 2);
  }

  return fibonacci(n);
}
