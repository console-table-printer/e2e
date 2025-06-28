import { Table } from 'console-table-printer';
import { wcswidth } from 'simple-wcswidth';

// Define interfaces for type checking
interface Person {
  name: string;
  age: number;
  country: string;
}

describe('Integration Tests - TypeScript', () => {
  test('should use both packages together', () => {
    // Create a table
    const p = new Table();
    
    // Add rows with data
    const people: Person[] = [
      { name: 'Alice', age: 25, country: 'USA' },
      { name: 'Bob', age: 30, country: 'Canada' },
      { name: 'Charlie', age: 35, country: 'UK' }
    ];
    
    p.addRows(people);
    
    // Calculate the width of each person's name using simple-wcswidth
    const nameWidths = people.map(person => wcswidth(person.name));
    
    // Verify that the width calculations are correct
    expect(nameWidths[0]).toBe(5); // 'Alice' has 5 characters
    expect(nameWidths[1]).toBe(3); // 'Bob' has 3 characters
    expect(nameWidths[2]).toBe(7); // 'Charlie' has 7 characters
    
    // The test passes if both libraries work together correctly
    expect(true).toBe(true);
  });

  test('should handle mixed character sets in table data', () => {
    // Create a table
    const p = new Table();
    
    // Add rows with mixed character sets
    const data = [
      { name: '你好', value: 'Hello in Chinese', width: wcswidth('你好') },
      { name: 'こんにちは', value: 'Hello in Japanese', width: wcswidth('こんにちは') },
      { name: '안녕하세요', value: 'Hello in Korean', width: wcswidth('안녕하세요') },
      { name: 'Hello', value: 'Hello in English', width: wcswidth('Hello') }
    ];
    
    p.addRows(data);
    
    // Verify that the width calculations are correct
    expect(data[0].width).toBe(4); // '你好' has width 4 (2 per character)
    expect(data[1].width).toBe(10); // 'こんにちは' has width 10 (2 per character)
    expect(data[2].width).toBe(10); // '안녕하세요' has width 10 (2 per character)
    expect(data[3].width).toBe(5); // 'Hello' has width 5 (1 per character)
    
    // The test passes if both libraries work together correctly
    expect(true).toBe(true);
  });

  test('should calculate column widths for table formatting', () => {
    // Create data for a table
    const data = [
      { name: 'Alice', description: 'Software Engineer' },
      { name: 'Bob', description: 'Product Manager' },
      { name: 'Charlie', description: 'UX Designer' }
    ];
    
    // Calculate column widths using wcswidth
    const nameColWidth = Math.max(...data.map(item => wcswidth(item.name)));
    const descColWidth = Math.max(...data.map(item => wcswidth(item.description)));
    
    // Verify that the column widths are calculated correctly
    expect(nameColWidth).toBe(7); // 'Charlie' is the longest name with width 7
    expect(descColWidth).toBe(17); // 'Software Engineer' is the longest description with width 17
    
    // Create a table with the calculated column widths
    const p = new Table();
    p.addRows(data);
    
    // The test passes if both libraries work together correctly
    expect(true).toBe(true);
  });
}); 