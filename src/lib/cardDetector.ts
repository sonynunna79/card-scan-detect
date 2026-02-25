export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'jcb' | 'unionpay' | 'maestro' | 'unknown';

export interface CardInfo {
  brand: CardBrand;
  brandName: string;
  type: 'debit' | 'credit' | 'unknown';
  valid: boolean;
  formatted: string;
  length: number[];
  cvvLength: number;
}

const CARD_PATTERNS: { brand: CardBrand; name: string; pattern: RegExp; lengths: number[]; cvv: number }[] = [
  { brand: 'visa', name: 'Visa', pattern: /^4/, lengths: [13, 16, 19], cvv: 3 },
  { brand: 'mastercard', name: 'Mastercard', pattern: /^(5[1-5]|2[2-7])/, lengths: [16], cvv: 3 },
  { brand: 'amex', name: 'American Express', pattern: /^3[47]/, lengths: [15], cvv: 4 },
  { brand: 'discover', name: 'Discover', pattern: /^(6011|65|64[4-9])/, lengths: [16, 19], cvv: 3 },
  { brand: 'diners', name: 'Diners Club', pattern: /^(30[0-5]|36|38)/, lengths: [14, 16], cvv: 3 },
  { brand: 'jcb', name: 'JCB', pattern: /^35/, lengths: [16, 19], cvv: 3 },
  { brand: 'unionpay', name: 'UnionPay', pattern: /^62/, lengths: [16, 17, 18, 19], cvv: 3 },
  { brand: 'maestro', name: 'Maestro', pattern: /^(50|5[6-9]|6)/, lengths: [12, 13, 14, 15, 16, 17, 18, 19], cvv: 3 },
];

export function luhnCheck(num: string): boolean {
  const digits = num.replace(/\D/g, '');
  if (digits.length < 2) return false;
  let sum = 0;
  let alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function detectCard(number: string): CardInfo {
  const digits = number.replace(/\D/g, '');
  
  let matched = CARD_PATTERNS.find(p => p.pattern.test(digits));
  
  const brand = matched?.brand ?? 'unknown';
  const brandName = matched?.name ?? 'Unknown';
  const lengths = matched?.lengths ?? [];
  const cvvLength = matched?.cvv ?? 3;
  const valid = digits.length >= 12 && luhnCheck(digits) && (lengths.length === 0 || lengths.includes(digits.length));

  // Format with spaces
  let formatted = digits;
  if (brand === 'amex') {
    formatted = digits.replace(/(\d{4})(\d{6})(\d{0,5})/, '$1 $2 $3').trim();
  } else {
    formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  }

  return { brand, brandName, type: 'unknown', valid, formatted, length: lengths, cvvLength };
}
