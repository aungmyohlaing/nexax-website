export function formatMmk(amount: number): string {
  return `${new Intl.NumberFormat("en-US").format(amount)} MMK`
}
