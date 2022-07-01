const powers = [
  { key: 'Q', value: 10 ** 15 },
  { key: 'T', value: 10 ** 12 },
  { key: 'B', value: 10 ** 9 },
  { key: 'M', value: 10 ** 6 },
  { key: 'K', value: 1000 },
];

export const shortNumber = (number: number): string | null => {
  if (Number.isNaN(number) || number === null) {
    return null;
  }

  if (number === 0) {
    return '0';
  }

  if (number < 1000) {
    return `${number}`;
  }

  let key = '';
  let abs = Math.abs(number);
  const rounder = 10 ** 1;
  const isNegative = number < 0;

  for (let i = 0; i < powers.length; i++) {
    let reduced = abs / powers[i].value;
    reduced = Math.round(reduced * rounder) / rounder;

    if (reduced >= 1) {
      abs = reduced;
      key = powers[i].key;
      break;
    }
  }

  return (isNegative ? '-' : '') + abs + key;
};
