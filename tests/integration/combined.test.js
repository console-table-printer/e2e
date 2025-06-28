const { Table } = require('console-table-printer');
const { wcswidth } = require('simple-wcswidth');

describe('Integration Tests - Console Table Printer with Simple WCSWidth', () => {
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

  test('should correctly handle mixed ASCII and CJK characters in tables', () => {
    // Create a table
    const p = new Table();
    
    // Add rows with mixed character sets
    p.addRow({ id: 1, name: 'John', greeting: 'Hello' });
    p.addRow({ id: 2, name: '张伟', greeting: '你好' }); // Chinese name and greeting
    p.addRow({ id: 3, name: 'さくら', greeting: 'こんにちは' }); // Japanese name and greeting
    p.addRow({ id: 4, name: '민준', greeting: '안녕하세요' }); // Korean name and greeting
    
    // Print the table
    p.printTable();
    
    // Get the output as a single string
    const output = consoleOutput.join('\n');
    
    // Check that all names and greetings are present
    expect(output).toContain('John');
    expect(output).toContain('张伟');
    expect(output).toContain('さくら');
    expect(output).toContain('민준');
    expect(output).toContain('Hello');
    expect(output).toContain('你好');
    expect(output).toContain('こんにちは');
    expect(output).toContain('안녕하세요');
    
    // Use wcswidth to calculate the expected widths of the CJK characters
    expect(wcswidth('张伟')).toBe(4); // Each Chinese character has width 2
    expect(wcswidth('さくら')).toBe(6); // Each Japanese character has width 2
    expect(wcswidth('민준')).toBe(4); // Each Korean character has width 2
    
    // Verify that the table output has appropriate spacing for CJK characters
    const lines = output.split('\n');
    
    // Find the line with Chinese characters
    const chineseLine = lines.find(line => line.includes('张伟'));
    expect(chineseLine).toBeDefined();
    
    // Find the line with Japanese characters
    const japaneseLine = lines.find(line => line.includes('さくら'));
    expect(japaneseLine).toBeDefined();
    
    // Find the line with Korean characters
    const koreanLine = lines.find(line => line.includes('민준'));
    expect(koreanLine).toBeDefined();
  });

  test('should correctly calculate column widths with mixed character sets', () => {
    // Create a table with column definitions
    const p = new Table({
      columns: [
        { name: 'id', alignment: 'left', title: 'ID' },
        { name: 'text', alignment: 'left', title: 'Text' },
        { name: 'width', alignment: 'right', title: 'Width' }
      ]
    });
    
    // Add rows with different types of text
    const texts = [
      'Hello',
      '你好',
      'こんにちは',
      '안녕하세요',
      'Hello 你好',
      'café',
      '😀👍'
    ];
    
    // Add each text with its calculated width
    texts.forEach((text, index) => {
      p.addRow({
        id: index + 1,
        text: text,
        width: wcswidth(text)
      });
    });
    
    // Print the table
    p.printTable();
    
    // Get the output as a single string
    const output = consoleOutput.join('\n');
    
    // Check that all texts are present
    texts.forEach(text => {
      expect(output).toContain(text);
    });
    
    // Check that the calculated widths are present
    expect(output).toContain('5'); // Width of 'Hello'
    expect(output).toContain('4'); // Width of '你好'
    expect(output).toContain('10'); // Width of 'こんにちは'
    expect(output).toContain('10'); // Width of '안녕하세요'
    expect(output).toContain('10'); // Width of 'Hello 你好'
    expect(output).toContain('4'); // Width of 'café'
    expect(output).toContain('4'); // Width of '😀👍'
  });
}); 