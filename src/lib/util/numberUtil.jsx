export const comma = (value, digit = 0) => {
    if (!value) return '-';
    
    // Convert value to number first to ensure toFixed is available
    const num = Number(value);
    if (isNaN(num)) return '-';

    // Split into integer and decimal parts
    const [integerPart, decimalPart] = num.toFixed(digit).split('.');
    
    // Add commas only to the integer part
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
    // Combine with decimal part if exists
    return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};