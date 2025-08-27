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
