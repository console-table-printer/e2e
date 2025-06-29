import { wcswidth, wcwidth } from 'simple-wcswidth';

describe('simple-wcswidth TypeScript exports', () => {
  test('should export wcswidth function with correct type', () => {
    // Check that wcswidth is a function
    expect(typeof wcswidth).toBe('function');
    
    // Test functionality with TypeScript types
    const width1: number = wcswidth('hello');
    expect(width1).toBe(5);
    
    const width2: number = wcswidth('你好');
    expect(width2).toBe(4);
    
    const width3: number = wcswidth('こんにちは');
    expect(width3).toBe(10);
    
    const width4: number = wcswidth('안녕하세요');
    expect(width4).toBe(10);
  });

  test('should export wcwidth function with correct type', () => {
    // Check that wcwidth is a function
    expect(typeof wcwidth).toBe('function');
    
    // Test functionality with TypeScript types
    const width1: number = wcwidth('a'.charCodeAt(0));
    expect(width1).toBe(1);
    
    const width2: number = wcwidth('你'.charCodeAt(0));
    expect(width2).toBe(2);
    
    const width3: number = wcwidth('こ'.charCodeAt(0));
    expect(width3).toBe(2);
    
    const width4: number = wcwidth('안'.charCodeAt(0));
    expect(width4).toBe(2);
  });
}); 