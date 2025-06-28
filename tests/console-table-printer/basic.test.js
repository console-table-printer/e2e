const { Table } = require('console-table-printer');

describe('Console Table Printer - Basic Tests', () => {
  let originalConsoleLog;
  let consoleOutput = [];

  // Mock console.log before each test
  beforeEach(() => {
    originalConsoleLog = console.log;
    console.log = jest.fn((...args) => {
      consoleOutput.push(args.join(' '));
    });
  });

  // Restore console.log after each test
  afterEach(() => {
    console.log = originalConsoleLog;
    consoleOutput = [];
  });

  test('should create a simple table', () => {
    // Create a table
    const p = new Table();
    
    // Add rows
    p.addRow({ index: 1, text: 'Hello', value: 100 });
    p.addRow({ index: 2, text: 'World', value: 200 });
    
    // Print the table
    p.printTable();
    
    // Verify output contains expected strings
    expect(consoleOutput.length).toBeGreaterThan(0);
    expect(consoleOutput.join('\n')).toContain('index');
    expect(consoleOutput.join('\n')).toContain('text');
    expect(consoleOutput.join('\n')).toContain('value');
    expect(consoleOutput.join('\n')).toContain('Hello');
    expect(consoleOutput.join('\n')).toContain('World');
    expect(consoleOutput.join('\n')).toContain('100');
    expect(consoleOutput.join('\n')).toContain('200');
  });

  test('should support colored rows', () => {
    // Create a table
    const p = new Table();
    
    // Add colored rows
    p.addRow({ index: 1, text: 'Success', value: 100 }, { color: 'green' });
    p.addRow({ index: 2, text: 'Error', value: 200 }, { color: 'red' });
    
    // Print the table
    p.printTable();
    
    // Verify output contains ANSI color codes
    const output = consoleOutput.join('\n');
    expect(output).toContain('\x1b['); // Contains ANSI color codes
    expect(output).toContain('Success');
    expect(output).toContain('Error');
  });

  test('should create table with custom columns', () => {
    // Create a table with custom columns
    const p = new Table({
      columns: [
        { name: 'index', alignment: 'left' },
        { name: 'name', alignment: 'center', title: 'FULL NAME' },
        { name: 'score', alignment: 'right' }
      ]
    });
    
    // Add rows
    p.addRow({ index: 1, name: 'John Doe', score: 95 });
    p.addRow({ index: 2, name: 'Jane Smith', score: 98 });
    
    // Print the table
    p.printTable();
    
    // Verify output contains expected strings
    const output = consoleOutput.join('\n');
    expect(output).toContain('FULL NAME');
    expect(output).toContain('John Doe');
    expect(output).toContain('Jane Smith');
    expect(output).toContain('95');
    expect(output).toContain('98');
  });
}); 