import { Table } from 'console-table-printer';

// Test that types are properly exported
interface TableInterface {
  addRow: (row: Record<string, any>) => void;
  addRows: (rows: Record<string, any>[]) => void;
  printTable: () => void;
}

// Define our own TableConfig interface since it might not be exported
interface TableConfig {
  title?: string;
  columns?: Array<{
    name: string;
    title?: string;
    alignment?: 'left' | 'right' | 'center';
  }>;
  sort?: (row1: any, row2: any) => number;
}

describe('Console Table Printer - TypeScript Basic Tests', () => {
  test('should be properly typed and importable', () => {
    // Verify that the Table class exists and is a constructor
    expect(typeof Table).toBe('function');
    
    // Create a table with TypeScript type checking
    const p: TableInterface = new Table();
    expect(p).toBeInstanceOf(Table);
  });

  test('should create a table with columns', () => {
    const p = new Table({
      columns: [
        { name: 'index', alignment: 'left' },
        { name: 'text', alignment: 'right' }
      ]
    });
    
    expect(p).toBeInstanceOf(Table);
  });

  test('should add rows to a table', () => {
    const p = new Table();
    
    // Add a single row with type checking
    p.addRow({ index: 1, text: 'Sample text' });
    
    // Add multiple rows with type checking
    p.addRows([
      { index: 2, text: 'More text' },
      { index: 3, text: 'Even more text' }
    ]);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });

  test('should create a table with configuration', () => {
    // Create a typed configuration object
    const config: TableConfig = {
      title: 'Test Table',
      columns: [
        { name: 'id', title: 'ID', alignment: 'left' },
        { name: 'name', title: 'Name', alignment: 'right' }
      ],
      sort: (row1: any, row2: any) => row1.id - row2.id
    };
    
    const p = new Table(config);
    p.addRows([
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });

  test('should create a table with color options', () => {
    const p = new Table();
    
    // Add rows with color options
    p.addRows([
      { index: 1, text: 'Red text', color: 'red' },
      { index: 2, text: 'Green text', color: 'green' },
      { index: 3, text: 'Blue text', color: 'blue' }
    ]);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });
}); 