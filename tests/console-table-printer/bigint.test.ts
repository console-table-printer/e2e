import { Table } from 'console-table-printer';

// Tests for BigInt data input into console-table-printer.
//
// Note: the project's tsconfig targets ES2020, so BigInt *literals* (`1n`)
// are available and used directly here.
//
// Findings about the library's BigInt handling (v2.15.0):
//  - addRow / addRows accept BigInt values without throwing.
//  - render() / printTable() throw on raw BigInt values, because the
//    renderer does JSON.parse(JSON.stringify(row)) and JSON.stringify
//    cannot serialize a BigInt ("Do not know how to serialize a BigInt").
//  - Converting BigInt to string before rendering works and preserves the
//    full precision (beyond Number.MAX_SAFE_INTEGER).

const HUGE = 9007199254740993n; // 2^53 + 1, not exactly representable as Number

describe('Console Table Printer - BigInt input', () => {
  test('addRow accepts a BigInt value without throwing', () => {
    const p = new Table();

    expect(() => {
      p.addRow({ id: HUGE, label: 'huge' });
    }).not.toThrow();
  });

  test('addRows accepts multiple BigInt values without throwing', () => {
    const p = new Table();

    expect(() => {
      p.addRows([
        { id: 0n, label: 'zero' },
        { id: -42n, label: 'negative' },
        { id: HUGE, label: 'beyond max safe integer' }
      ]);
    }).not.toThrow();
  });

  test('rendering a raw BigInt value throws (JSON.stringify limitation)', () => {
    const p = new Table();
    p.addRow({ id: HUGE, label: 'huge' });

    expect(() => p.render()).toThrow(/serialize a BigInt/);
  });

  test('printTable with a raw BigInt value throws', () => {
    const p = new Table();
    p.addRow({ id: 1n, label: 'one' });

    expect(() => p.printTable()).toThrow(/serialize a BigInt/);
  });

  test('BigInt converted to string renders with full precision', () => {
    const p = new Table({
      columns: [
        { name: 'id', alignment: 'right' },
        { name: 'label', alignment: 'left' }
      ]
    });

    p.addRow({ id: HUGE.toString(), label: 'huge' });

    const out = p.render();

    expect(out).toContain('9007199254740993');
    expect(out).toContain('huge');
  });

  test('table of mixed BigInt-as-string values renders each value', () => {
    const p = new Table();

    const values: bigint[] = [
      0n,
      -1n,
      12345678901234567890n,
      2n ** 64n
    ];

    p.addRows(
      values.map((v, index) => ({ index, value: v.toString() }))
    );

    const out = p.render();

    for (const v of values) {
      expect(out).toContain(v.toString());
    }
  });

  test('preserves precision lost when a BigInt is coerced through Number', () => {
    // The unsafe Number coercion loses the last digit...
    expect(Number(HUGE).toString()).toBe('9007199254740992');

    // ...but rendering the BigInt's own string keeps it intact.
    const p = new Table();
    p.addRow({ id: HUGE.toString(), label: 'precise' });

    const out = p.render();
    expect(out).toContain('9007199254740993');
    expect(out).not.toContain('9007199254740992');
  });

  test('prints a table with a column named Bigint holding a raw BigInt', () => {
    const p = new Table({
      columns: [
        { name: 'Bigint', alignment: 'right' },
        { name: 'label', alignment: 'left' }
      ]
    });

    p.addRow({ Bigint: 123123123918239810923809123n, label: 'huge' });

    // Raw BigInt values cannot be rendered: JSON.stringify throws on them.
    expect(() => p.render()).toThrow(/serialize a BigInt/);
  });

  test('prints a formatted table of BigInt values to the console', () => {
    const p = new Table({
      title: 'BigInt values (raw)',
      columns: [
        { name: 'index', alignment: 'right', color: 'cyan' },
        { name: 'value', alignment: 'right' },
        { name: 'note', alignment: 'left', color: 'yellow' }
      ]
    });

    p.addRow({ index: 0, value: 0n, note: 'zero' });
    p.addRow({ index: 1, value: -1n, note: 'negative' });
    p.addRow({ index: 2, value: HUGE, note: '2^53 + 1' });
    p.addRow({ index: 3, value: 2n ** 64n, note: '2^64' });
    p.addRow({
      index: 4,
      value: 123123123918239810923809123n,
      note: 'arbitrary precision'
    });

    // Actually print the rendered table so it shows up in the test output.
    p.printTable();

    const out = p.render();
    expect(out).toContain('9007199254740993');
    expect(out).toContain('18446744073709551616');
  });
});
