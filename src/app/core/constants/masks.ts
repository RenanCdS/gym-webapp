import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export const phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];
export const numberMask = createNumberMask({
  prefix: '',
  integerLimit: 3,
  decimalLimit: 2,
  allowDecimal: true,
  decimalSymbol: ','
});
export const ageMask = createNumberMask({
  prefix: '',
  integerLimit: 3,
});
