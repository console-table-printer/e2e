const wcswidth = require('simple-wcswidth');

describe('simple-wcswidth exports', () => {
  test('should export wcswidth function', () => {
    expect(wcswidth.wcswidth).toBeDefined();
    expect(typeof wcswidth.wcswidth).toBe('function');
    
    // Test functionality
    expect(wcswidth.wcswidth('hello')).toBe(5);
    expect(wcswidth.wcswidth('你好')).toBe(4);
    expect(wcswidth.wcswidth('こんにちは')).toBe(10);
    expect(wcswidth.wcswidth('안녕하세요')).toBe(10);
  });

  test('should export wcwidth function', () => {
    expect(wcswidth.wcwidth).toBeDefined();
    expect(typeof wcswidth.wcwidth).toBe('function');
    
    // Test functionality with character codes
    expect(wcswidth.wcwidth('a'.charCodeAt(0))).toBe(1);
    expect(wcswidth.wcwidth('你'.charCodeAt(0))).toBe(2);
    expect(wcswidth.wcwidth('こ'.charCodeAt(0))).toBe(2);
    expect(wcswidth.wcwidth('안'.charCodeAt(0))).toBe(2);
  });
}); 