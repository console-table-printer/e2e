import { Table } from 'console-table-printer';

describe('console-table-printer TypeScript exports', () => {
  test('should export Table class with correct type', () => {
    // Test instantiation with TypeScript types
    const table: Table = new Table();
    expect(table).toBeInstanceOf(Table);
    
    // Test with basic config
    const configTable: Table = new Table({
      title: 'Test Table'
    });
    expect(configTable).toBeInstanceOf(Table);
  });

  test('should have correct Table methods', () => {
    const table = new Table();
    
    // Check that the Table class has the expected methods
    expect(typeof table.addRow).toBe('function');
    expect(typeof table.addRows).toBe('function');
    expect(typeof table.printTable).toBe('function');
    
    // Test the methods
    table.addRow({ id: 1, name: 'Test' });
    table.addRows([
      { id: 2, name: 'Test 2' },
      { id: 3, name: 'Test 3' }
    ]);
    
    // If this compiles, the types are correct
    expect(true).toBe(true);
  });
}); 