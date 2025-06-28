const { Table } = require('console-table-printer');

describe('Console Table Printer - Advanced Tests', () => {
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

  test('should support manual sorting of rows', () => {
    // Create a table
    const p = new Table();
    
    // Add rows in random order
    p.addRow({ id: 3, name: 'Charlie', score: 85 });
    p.addRow({ id: 1, name: 'Alice', score: 95 });
    p.addRow({ id: 2, name: 'Bob', score: 90 });
    
    // Sort manually by adding rows in sorted order
    const sortedTable = new Table();
    sortedTable.addRow({ id: 1, name: 'Alice', score: 95 });
    sortedTable.addRow({ id: 2, name: 'Bob', score: 90 });
    sortedTable.addRow({ id: 3, name: 'Charlie', score: 85 });
    
    // Print the sorted table
    sortedTable.printTable();
    
    // Get the output as a single string
    const output = consoleOutput.join('\n');
    
    // Check if names appear in sorted order
    const aliceIndex = output.indexOf('Alice');
    const bobIndex = output.indexOf('Bob');
    const charlieIndex = output.indexOf('Charlie');
    
    expect(aliceIndex).toBeLessThan(bobIndex);
    expect(bobIndex).toBeLessThan(charlieIndex);
  });

  test('should support table title', () => {
    // Create a table with a title
    const p = new Table({
      title: 'Student Scores'
    });
    
    // Add rows
    p.addRow({ id: 1, name: 'Alice', score: 95 });
    p.addRow({ id: 2, name: 'Bob', score: 90 });
    
    // Print the table
    p.printTable();
    
    // Check if title appears in output
    const output = consoleOutput.join('\n');
    expect(output).toContain('Student Scores');
  });

  test('should support colored rows', () => {
    // Create a table
    const p = new Table();
    
    // Add rows with different scores and colors
    p.addRow({ name: 'Alice', score: 95 }, { color: 'green' });
    p.addRow({ name: 'Bob', score: 85 }, { color: 'yellow' });
    p.addRow({ name: 'Charlie', score: 75 }, { color: 'blue' });
    p.addRow({ name: 'Dave', score: 65 }, { color: 'red' });
    
    // Print the table
    p.printTable();
    
    // Check if output contains ANSI color codes
    expect(consoleOutput.join('\n')).toContain('\x1b[');
  });

  test('should support basic pagination by manually limiting rows', () => {
    // Create a table
    const p = new Table({
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' }
      ]
    });
    
    // Add many rows
    for (let i = 1; i <= 20; i++) {
      p.addRow({ id: i, name: `Person ${i}` });
    }
    
    // Create first page table (manually)
    const firstPageTable = new Table({
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' }
      ]
    });
    
    // Add first 10 rows
    for (let i = 1; i <= 10; i++) {
      firstPageTable.addRow({ id: i, name: `Person ${i}` });
    }
    
    // Print first page
    firstPageTable.printTable();
    
    // Check output for first page
    let output = consoleOutput.join('\n');
    expect(output).toContain('Person 1');
    expect(output).toContain('Person 10');
    expect(output).not.toContain('Person 11');
    
    // Clear output
    consoleOutput = [];
    
    // Create second page table (manually)
    const secondPageTable = new Table({
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' }
      ]
    });
    
    // Add second 10 rows
    for (let i = 11; i <= 20; i++) {
      secondPageTable.addRow({ id: i, name: `Person ${i}` });
    }
    
    // Print second page
    secondPageTable.printTable();
    
    // Check output for second page
    output = consoleOutput.join('\n');
    expect(output).not.toContain('Person 10');
    expect(output).toContain('Person 11');
    expect(output).toContain('Person 20');
  });
}); 