export function generateInvoiceId(): string {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // Pick 2 random letters
  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)];

  // Pick 4 random digits
  const randomNumbers = Array.from(
    { length: 4 },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  ).join("");

  return `${randomLetters}${randomNumbers}`;
}

export const formatCurrencyWithoutFormating = (
  value: number,
  currency = "NGN"
) => {
  const userLocale = "en-NG";

  return new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
  }).format(value);
};

export const formatCurrency = (
  value: number,
  currency = "NGN",

  abbreviate = true
) => {
  const userLocale = "en-NG";

  if (abbreviate) {
    if (Math.abs(value) >= 1_000_000_000) {
      return (
        new Intl.NumberFormat(userLocale, {
          style: "currency",
          currency,
          currencyDisplay: "narrowSymbol",
          maximumFractionDigits: 1,
        }).format(value / 1_000_000_000) + "B"
      );
    } else if (Math.abs(value) >= 1_000_000) {
      return (
        new Intl.NumberFormat(userLocale, {
          style: "currency",
          currency,
          currencyDisplay: "narrowSymbol",
          maximumFractionDigits: 1,
        }).format(value / 1_000_000) + "M"
      );
    }
  }

  // Fallback: normal formatting
  return new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency,
    // currencyDisplay,
  }).format(value);
};
