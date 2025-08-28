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

// export const formatCurrency = (value: number, currency = "NGN") => {
//   const userLocale = navigator.language || "en-NG";

//   return new Intl.NumberFormat(userLocale, {
//     style: "currency",
//     currency,
//   }).format(value);
// };
export const formatCurrency = (
  value: number,
  currency = "NGN",
  abbreviate = true
) => {
  const userLocale = navigator.language || "en-NG";

  if (abbreviate) {
    if (Math.abs(value) >= 1_000_000_000) {
      return (
        new Intl.NumberFormat(userLocale, {
          style: "currency",
          currency,
          maximumFractionDigits: 1,
        }).format(value / 1_000_000_000) + "B"
      );
    } else if (Math.abs(value) >= 1_000_000) {
      return (
        new Intl.NumberFormat(userLocale, {
          style: "currency",
          currency,
          maximumFractionDigits: 1,
        }).format(value / 1_000_000) + "M"
      );
    } else if (Math.abs(value) >= 1_000) {
      return (
        new Intl.NumberFormat(userLocale, {
          style: "currency",
          currency,
          maximumFractionDigits: 1,
        }).format(value / 1_000) + "K"
      );
    }
  }

  // Fallback: normal formatting
  return new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency,
  }).format(value);
};
