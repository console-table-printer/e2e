import { wcswidth } from 'simple-wcswidth';

// Test that all types are properly exported
interface WcswidthModule {
  wcswidth: (str: string) => number;
}

// Verify that the module shape matches our expected interface
const moduleCheck: WcswidthModule = { wcswidth };

describe('Simple WCSWidth - TypeScript Advanced Tests', () => {
  test('should export all expected functions with correct types', () => {
    // Verify that the function exists and is a function
    expect(typeof wcswidth).toBe('function');
  });

  test('should return correct width for CJK characters', () => {
    // Chinese characters (each should have width 2)
    expect(wcswidth('你好')).toBe(4);
    expect(wcswidth('中文')).toBe(4);
    
    // Japanese characters
    expect(wcswidth('こんにちは')).toBe(10); // 5 characters, each width 2
    expect(wcswidth('ありがとう')).toBe(10); // 5 characters, each width 2
    
    // Korean characters
    expect(wcswidth('안녕하세요')).toBe(10); // 5 characters, each width 2
  });

  test('should return correct width for mixed ASCII and CJK characters', () => {
    expect(wcswidth('hello 你好')).toBe(10); // 'hello ' (6) + '你好' (4) = 10
    expect(wcswidth('こんにちは world')).toBe(16); // 'こんにちは' (10) + ' world' (6) = 16
  });

  test('should return correct width for emoji characters', () => {
    // Most emoji have width 2
    expect(wcswidth('😀')).toBe(2);
    expect(wcswidth('👍')).toBe(2);
    expect(wcswidth('🚀')).toBe(2);
    
    // String with multiple emoji
    expect(wcswidth('😀👍🚀')).toBe(6);
    
    // Mixed with ASCII
    expect(wcswidth('hello 😀')).toBe(8); // 'hello ' (6) + '😀' (2) = 8
  });

  test('should handle strings with complex mixed character sets', () => {
    const complexString = 'Hello 你好 こんにちは 안녕하세요 😀 café';
    // 'Hello ' (6) + '你好 ' (5) + 'こんにちは ' (11) + '안녕하세요 ' (11) + '😀 ' (3) + 'café' (4) = 40
    expect(wcswidth(complexString)).toBe(40);
  });
}); 