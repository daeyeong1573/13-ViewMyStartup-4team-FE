/* src/utils/format.js */

export function formatCurrencyToKorea(value) {
  if (value == null) return "-";

  const numValue = Number(value);

  if (isNaN(numValue)) return "-";

  const eok = Math.floor(numValue / 100000000);
  if (eok > 0) return `${eok.toLocaleString()}억`;

  const man = Math.floor(numValue / 10000);
  if (man > 0) return `${man.toLocaleString()}만`;

  return `${numValue.toLocaleString()}`;
}
