//숫자를 억 단위로 변환

export function formatCurrencyToKorea(value) {
  if (value == null) return "-";
  const eok = Math.floor(value / 100000000);
  if (eok > 0) return `${eok}억`;
  const man = Math.floor(value / 10000);
  if (man > 0) return `${man}만`;
  return `${value}`;
}
