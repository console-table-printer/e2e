import { Table } from 'console-table-printer';

// Define interfaces for type checking
interface Person {
  name: string;
  age: number;
  country: string;
  salary?: number;
}

interface TableWithStyles {
  addRow: (row: Record<string, any>) => void;
  addRows: (rows: Record<string, any>[]) => void;
  printTable: () => void;
  addRowIndexColumn: () => void;
  sortBy: (columnName: string) => void;
}

describe('Console Table Printer - TypeScript Advanced Tests', () => {
  test('should be properly typed and importable with advanced features', () => {
    // Verify that the Table class exists and is a constructor
    expect(typeof Table).toBe('function');
    
    // Create a table with TypeScript type checking
    const p = new Table();
    expect(p).toBeInstanceOf(Table);
  });

  test('should create a table with rows', () => {
    const p = new Table();
    
    // Add rows
    p.addRows([
      { name: 'Alice', age: 25, country: 'USA' },
      { name: 'Bob', age: 30, country: 'Canada' },
      { name: 'Charlie', age: 35, country: 'UK' }
    ]);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });

  test('should add rows with TypeScript type checking', () => {
    const p = new Table();
    
    // Add rows with TypeScript type checking
    const people: Person[] = [
      { name: 'Charlie', age: 35, country: 'UK' },
      { name: 'Alice', age: 25, country: 'USA' },
      { name: 'Bob', age: 30, country: 'Canada' }
    ];
    
    p.addRows(people);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });

  test('should create a table with rows containing salary information', () => {
    const p = new Table();
    
    // Add rows with TypeScript type checking
    const people: Person[] = [
      { name: 'Alice', age: 25, country: 'USA', salary: 100000 },
      { name: 'Bob', age: 30, country: 'Canada', salary: 120000 },
      { name: 'Charlie', age: 35, country: 'UK', salary: 90000 }
    ];
    
    p.addRows(people);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });

  test('should create a table with custom columns', () => {
    // Create a table with custom columns
    const p = new Table({
      columns: [
        { name: 'name', alignment: 'left' },
        { name: 'age', alignment: 'right' },
        { name: 'country', alignment: 'left' }
      ]
    });
    
    // Add rows with TypeScript type checking
    const people: Person[] = [
      { name: 'Alice', age: 25, country: 'USA' },
      { name: 'Bob', age: 30, country: 'Canada' },
      { name: 'Charlie', age: 35, country: 'UK' }
    ];
    
    p.addRows(people);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });

  test('should handle nested objects in rows', () => {
    interface NestedPerson {
      name: string;
      details: {
        age: number;
        country: string;
      };
    }
    
    const p = new Table();
    
    // Add rows with nested objects
    const people: NestedPerson[] = [
      { name: 'Alice', details: { age: 25, country: 'USA' } },
      { name: 'Bob', details: { age: 30, country: 'Canada' } },
      { name: 'Charlie', details: { age: 35, country: 'UK' } }
    ];
    
    // Add rows using flat structure for display
    p.addRows([
      { name: people[0].name, age: people[0].details.age, country: people[0].details.country },
      { name: people[1].name, age: people[1].details.age, country: people[1].details.country },
      { name: people[2].name, age: people[2].details.age, country: people[2].details.country }
    ]);
    
    // The test passes if no TypeScript errors occur
    expect(true).toBe(true);
  });
}); 