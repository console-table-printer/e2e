import { Table } from 'console-table-printer';

const PRECISE_BIGINT = 9007199254740993n;
const BIGINT_VALUES = [0n, -1n, PRECISE_BIGINT, 2n ** 64n];

describe('Console Table Printer - BigInt input', () => {
  test('renders raw BigInt values without manual string conversion', () => {
    const table = new Table();

    table.addRows(
      BIGINT_VALUES.map((value, index) => ({
        index,
        value
      }))
    );

    const output = table.render();
    table.printTable();
    for (const value of BIGINT_VALUES) {
      expect(output).toContain(value.toString());
    }
    expect(output).not.toContain('9007199254740992');
  });

  test('prints raw BigInt values in the table', () => {
    const table = new Table();
    const logSpy = jest.spyOn(console, 'log');

    table.addRows(
      BIGINT_VALUES.map((value, index) => ({
        index,
        value
      }))
    );

    table.printTable();

    const printedTable = logSpy.mock.calls
      .map(([message]) => String(message))
      .join('\n');

    for (const value of BIGINT_VALUES) {
      expect(printedTable).toContain(value.toString());
    }
    
    logSpy.mockRestore();
  });

  test('supports a column literally named Bigint', () => {
    const table = new Table();

    table.addRow({ Bigint: PRECISE_BIGINT, label: 'precise' });

    table.printTable();
    const output = table.render();

    expect(output).toContain(PRECISE_BIGINT.toString());
    expect(output).toContain('precise');
  });

  test('still renders BigInt values when callers provide strings', () => {
    const table = new Table();

    table.addRows(
      BIGINT_VALUES.map((value, index) => ({
        index,
        value: value.toString()
      }))
    );

    const output = table.render();
    table.printTable();

    for (const value of BIGINT_VALUES) {
      expect(output).toContain(value.toString());
    }
  });
});
