const add = (a: number, b: number) => a + b;
describe('App', () => {
  test('first test', () => {
    const sum = add(2, 2);

    expect(sum).toBe(4);
  });
});
