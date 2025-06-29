const consolePrinter = require('console-table-printer');

describe('console-table-printer exports', () => {
  test('should export Table class', () => {
    expect(consolePrinter.Table).toBeDefined();
    expect(typeof consolePrinter.Table).toBe('function');
    
    // Test instantiation
    const table = new consolePrinter.Table();
    expect(table).toBeInstanceOf(consolePrinter.Table);
    expect(typeof table.addRow).toBe('function');
    expect(typeof table.addRows).toBe('function');
    expect(typeof table.printTable).toBe('function');
  });

  test('should export printTable function', () => {
    expect(consolePrinter.printTable).toBeDefined();
    expect(typeof consolePrinter.printTable).toBe('function');
  });
}); 