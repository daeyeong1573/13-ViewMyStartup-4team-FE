//숫자를 억 단위로 변환

export function formatCurrencyToKorea(value) {
  if (!value && value !== 0) return 0;

  const UNIT_EOK = Number(value) / 100000000;
  return `${UNIT_EOK.toFixed(1).replace(".0", "")}억`;
}
