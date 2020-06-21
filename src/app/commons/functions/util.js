import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const Pattern = {
  CURRENCY: (/^.[\D]{1,2}\s\d{1,}/).toString().replace(/\//gm, ''),
  PHONE: (/^\(\d{2}\)\s\d{1}\s\d{4}\-\d{4}/).toString().replace(/\//gm, ''),
  USER_REGISTRY_CODE: (/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}/).toString().replace(/\//gm, ''),
  COMPANY_REGISTRY_CODE: (/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}/).toString().replace(/\//gm, ''),
  TEXT: (/^.{6,}/).toString().replace(/\//gm, ''),
  EMAIL: (/^.{6,}/).toString().replace(/\//gm, ''),
  PASSWORD: (/^.{6,}/).toString().replace(/\//gm, '')
}

const defaultMaskOptions = {
  prefix: 'R$',
  suffix: '',
  includeThousandsSeparator: true,
  thousandsSeparatorSymbol: ',',
  allowDecimal: true,
  decimalSymbol: '.',
  decimalLimit: 2,
  integerLimit: 7,
  allowNegative: false,
  allowLeadingZeroes: false,
}

const currencyMask = createNumberMask(defaultMaskOptions)

const Mask = {
  CURRENCY: currencyMask,
  PHONE: ['(', /[1-9]/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  USER_REGISTRY_CODE: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
  COMPANY_REGISTRY_CODE: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
}

function CleanMask(value, Mask) {
  switch (Mask) {
    case Mask.COMPANY_REGISTRY_CODE:
      return value.replace(/[^\d]+/g, '');
    case Mask.CURRENCY:
      return value.replace('R$', '');
    case Mask.PHONE:
      return value.replace(/[^\d]+/g, '');
    case Mask.USER_REGISTRY_CODE:
      return value.replace(/[^\d]+/g, '');
    default:
      return value.replace(/[^\d]+/g, '');
  }
}

function CreateMaskText(text, maskName) {
  switch (maskName) {
    case Mask.COMPANY_REGISTRY_CODE:
      return MaskCompanyText(text);
    case Mask.PHONE:
      return MaskPhoneText(text);
    case Mask.USER_REGISTRY_CODE:
      return MaskUserText(text);
    default:
      break;
  }
}

function MaskCompanyText(text) {
  let value;

  value = text.substring(0, 2) + '.' +
    text.substring(2, 5) + '.' +
    text.substring(5, 8) + '/' +
    text.substring(8, 12) + '-' +
    text.substring(12, 14);

  return (value);
}

function MaskPhoneText(text) {
  let value;

  value = '(' +
    text.substring(0, 2) + ')' + ' ' +
    text.substring(2, 3) + ' ' +
    text.substring(3, 7) + ' - ' +
    text.substring(7, 11);

  return value;
}

function MaskUserText(text) {
  let value;

  value = text.substring(0, 3) + '.' +
    text.substring(3, 6) + '.' +
    text.substring(6, 9) + '-' +
    text.substring(9, 11);
  
  return value;
}

export { CreateMaskText, CleanMask, Mask, Pattern };