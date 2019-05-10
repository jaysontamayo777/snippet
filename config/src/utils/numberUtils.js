export function insertDecimal(number, points = 2) {
  return Number(Math.round(number + 'e' + points) + 'e-' + points).toFixed(
    points
  );
}

export function currencySeparator(number) {
  return (
    number &&
    Number(number).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  );
}
