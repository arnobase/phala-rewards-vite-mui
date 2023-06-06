
export const formatTokenBalance = (value) => {
    const formated = Number(value)?.toLocaleString?.('en-US', {
        style: 'currency',
        currency: 'PHA',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4,
      })
    return formated
}