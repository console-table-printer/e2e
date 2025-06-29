import { wcswidth } from 'simple-wcswidth';

// Test that the types are properly exported
type WcswidthFunction = (str: string) => number;
const typedWcswidth: WcswidthFunction = wcswidth;

describe('Simple WCSWidth - TypeScript Basic Tests', () => {
  test('should be properly typed and importable', () => {
    // Verify that the imported function exists and is a function
    expect(typeof wcswidth).toBe('function');
  });

  test('should return correct width for ASCII characters', () => {
    expect(wcswidth('hello')).toBe(5);
    expect(wcswidth('hello world')).toBe(11);
    expect(wcswidth('123456789')).toBe(9);
  });

  test('should return correct width for empty string', () => {
    expect(wcswidth('')).toBe(0);
  });

  test('should return correct width for strings with spaces', () => {
    expect(wcswidth('  ')).toBe(2);
    expect(wcswidth('hello  world')).toBe(12);
  });

  test('should return correct width for strings with special ASCII characters', () => {
    expect(wcswidth('!@#$%^&*()')).toBe(10);
    expect(wcswidth('hello-world')).toBe(11);
    expect(wcswidth('user_name')).toBe(9);
  });

  test('should handle control characters', () => {
    // Control characters like tabs and newlines return -1 for their individual width
    expect(wcswidth('\t')).toBe(-1);
    expect(wcswidth('\n')).toBe(-1);
    
    // Strings with control characters also return -1
    expect(wcswidth('hello\tworld')).toBe(-1);
    expect(wcswidth('hello\nworld')).toBe(-1);
  });
}); 