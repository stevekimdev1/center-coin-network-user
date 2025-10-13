export const formatCoinAmount = (value, digit = 9, comma = true) => {
  if (!value) return '0';
  
  const dividedValue = digit > 0 ? value / Math.pow(10, digit) : value;
  
  if (comma) {
    return dividedValue.toLocaleString();
  }
  
  return dividedValue.toString();
};

export const getCoinCategory = (category) => {
  switch (category) {
    case 'BEP20':
      return 'BSC (Binance Smart Chain)';
    case 'KIP7':
      return 'Kaia';
    default:
      return '';
  }
}
export const getCoinCategoryByCoinType = (coinType) => {
  switch (coinType) {
    case 701:
      return 'Kaia';
    case 401:
      return 'BSC (Binance Smart Chain)';
    case 402:
      return 'BSC (Binance Smart Chain)';
    case 403:
      return 'Bitcoin';
    case 404:
      return 'Ethereum';
    case 405:
      return 'XRP';
    case 406:
      return 'Tron';
    case 7:
      return 'KAIA';
    case 407:
      return 'Solana';
    case 408:
      return 'Cardano';
    case 4:
      return 'BSC (Binance Smart Chain)';
    default:
      return '';
  }
}
