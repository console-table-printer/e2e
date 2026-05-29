const { Table } = require('console-table-printer');

describe('Console Table Printer - clearRows Feature Tests', () => {
  test('should clear all existing rows while keeping configured columns and title', () => {
    const table = new Table({
      title: 'Inventory',
      columns: [
        { name: 'sku', title: 'SKU' },
        { name: 'name', title: 'Name' },
      ],
    });

    table.addRows([
      { sku: 'A-001', name: 'Old Keyboard' },
      { sku: 'A-002', name: 'Old Mouse' },
    ]);

    const result = table.clearRows();
    const output = table.render();
    table.printTable();

    expect(result).toBe(table);
    expect(output).toContain('Inventory');
    expect(output).toContain('SKU');
    expect(output).toContain('Name');
    expect(output).not.toContain('Old Keyboard');
    expect(output).not.toContain('Old Mouse');
  });

  test('should allow new rows to be added after clearing previous rows', () => {
    const table = new Table();

    table.addRows([
      { id: 1, name: 'Removed row' },
      { id: 2, name: 'Also removed' },
    ]);

    table.clearRows().addRow({ id: 3, name: 'Replacement row' });

    const output = table.render();
    table.printTable();

    expect(output).toContain('id');
    expect(output).toContain('name');
    expect(output).toContain('Replacement row');
    expect(output).toContain('3');
    expect(output).not.toContain('Removed row');
    expect(output).not.toContain('Also removed');
  });

  test('should preserve column options after rows are cleared', () => {
    const table = new Table({
      columns: [
        { name: 'item', alignment: 'left' },
        {
          name: 'price',
          alignment: 'right',
          transform: (value) => `$${Number(value).toFixed(2)}`,
        },
      ],
    });

    table.addRow({ item: 'Old coffee', price: 3 });
    table.clearRows();
    table.addRow({ item: 'Tea', price: 2.5 });

    const output = table.render();
    table.printTable();

    expect(output).toContain('Tea');
    expect(output).toContain('$2.50');
    expect(output).not.toContain('Old coffee');
    expect(output).not.toContain('$3.00');
  });
});
