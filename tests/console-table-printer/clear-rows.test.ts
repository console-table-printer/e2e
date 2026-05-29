import { Table } from 'console-table-printer';

describe('Console Table Printer - TypeScript clearRows Feature Tests', () => {
  test('should clear rows and return the table for chaining', () => {
    const table = new Table({
      columns: [
        { name: 'id', title: 'ID' },
        { name: 'name', title: 'Name' },
      ],
    });

    table.addRows([
      { id: 1, name: 'Removed row' },
      { id: 2, name: 'Also removed' },
    ]);

    const result: Table = table.clearRows();
    result.addRow({ id: 3, name: 'Replacement row' });

    const output = table.render();
    table.printTable();

    expect(result).toBe(table);
    expect(output).toContain('Replacement row');
    expect(output).not.toContain('Removed row');
    expect(output).not.toContain('Also removed');
  });

  test('should preserve column options after clearing rows', () => {
    const table = new Table({
      columns: [
        { name: 'item', alignment: 'left' },
        {
          name: 'price',
          alignment: 'right',
          transform: (value: unknown) => `$${Number(value).toFixed(2)}`,
        },
      ],
    });

    table.addRow({ item: 'Old coffee', price: 3 });
    table.clearRows().addRow({ item: 'Tea', price: 2.5 });

    const output = table.render();
    table.printTable();

    expect(output).toContain('Tea');
    expect(output).toContain('$2.50');
    expect(output).not.toContain('Old coffee');
    expect(output).not.toContain('$3.00');
  });
});
