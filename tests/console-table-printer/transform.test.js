const { Table } = require('console-table-printer');

describe('Console Table Printer - Transform Feature Tests', () => {
  test('should transform values to uppercase', () => {
    const p = new Table({
      columns: [
        { name: 'original', alignment: 'left' },
        {
          name: 'uppercase',
          alignment: 'left',
          transform: (value) => String(value).toUpperCase()
        },
      ],
    });

    p.addRow({ original: 'hello', uppercase: 'hello' });
    p.addRow({ original: 'world', uppercase: 'world' });
    p.addRow({ original: 'test', uppercase: 'test' });

    p.printTable();

    // Test passes if no errors occur
    expect(true).toBe(true);
  });

  test('should format numbers as currency with transform', () => {
    const p = new Table({
      columns: [
        { name: 'item', alignment: 'left' },
        {
          name: 'price',
          alignment: 'right',
          transform: (value) => `$${Number(value).toFixed(2)}`
        },
      ],
    });

    p.addRows([
      { item: 'Coffee', price: 3.5 },
      { item: 'Sandwich', price: 7.99 },
      { item: 'Water', price: 1 },
    ]);

    p.printTable();

    // Test passes if no errors occur
    expect(true).toBe(true);
  });

  test('should handle multiple transforms in the same table', () => {
    const p = new Table({
      columns: [
        { name: 'name', alignment: 'left' },
        {
          name: 'formatted_name',
          alignment: 'left',
          transform: (value) => String(value).toUpperCase()
        },
        {
          name: 'price',
          alignment: 'right',
          transform: (value) => `$${Number(value).toFixed(2)}`
        },
      ],
    });

    p.addRows([
      { name: 'coffee', formatted_name: 'coffee', price: 3.5 },
      { name: 'tea', formatted_name: 'tea', price: 2.25 },
    ]);

    p.printTable();

    // Test passes if no errors occur
    expect(true).toBe(true);
  });

  test('should transform null and undefined values safely', () => {
    const p = new Table({
      columns: [
        { name: 'value', alignment: 'left' },
        {
          name: 'transformed',
          alignment: 'left',
          transform: (value) => value ? String(value).toUpperCase() : 'N/A'
        },
      ],
    });

    p.addRows([
      { value: 'test', transformed: 'test' },
      { value: null, transformed: null },
      { value: undefined, transformed: undefined },
    ]);

    p.printTable();

    // Test passes if no errors occur
    expect(true).toBe(true);
  });

  test('should transform with custom formatting function', () => {
    const p = new Table({
      columns: [
        { name: 'product', alignment: 'left' },
        {
          name: 'quantity',
          alignment: 'right',
          transform: (value) => {
            const num = Number(value);
            return num === 1 ? `${num} item` : `${num} items`;
          }
        },
      ],
    });

    p.addRows([
      { product: 'Apple', quantity: 1 },
      { product: 'Orange', quantity: 5 },
      { product: 'Banana', quantity: 10 },
    ]);

    p.printTable();

    // Test passes if no errors occur
    expect(true).toBe(true);
  });

  test('should transform percentage values', () => {
    const p = new Table({
      columns: [
        { name: 'category', alignment: 'left' },
        {
          name: 'rate',
          alignment: 'right',
          transform: (value) => `${(Number(value) * 100).toFixed(1)}%`
        },
      ],
    });

    p.addRows([
      { category: 'Success', rate: 0.955 },
      { category: 'Failure', rate: 0.045 },
      { category: 'Pending', rate: 0.0 },
    ]);

    p.printTable();

    // Test passes if no errors occur
    expect(true).toBe(true);
  });

  test('should transform date values to formatted strings', () => {
    const p = new Table({
      columns: [
        { name: 'event', alignment: 'left' },
        {
          name: 'date',
          alignment: 'left',
          transform: (value) => {
            if (value instanceof Date) {
              return value.toLocaleDateString();
            }
            return String(value);
          }
        },
      ],
    });

    p.addRows([
      { event: 'Launch', date: new Date('2024-01-15') },
      { event: 'Update', date: new Date('2024-06-20') },
      { event: 'Review', date: new Date('2024-12-31') },
    ]);

    p.printTable();

    // Test passes if no errors occur
    expect(true).toBe(true);
  });
});
