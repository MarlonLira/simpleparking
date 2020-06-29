import { ReturnIfValid } from '../commons/functions/properties';

export default class Card {
  id!: number;
  status!: string;
  holder: string;
  flag: string;
  number: string;
  expirationDate: string;
  secureCode!: string;
  type: string;
  userId: number;

  constructor(json?: any) {
    this.id = ReturnIfValid(json.id);
    this.status = ReturnIfValid(json.status);
    this.holder = ReturnIfValid(json.holder);
    this.flag = ReturnIfValid(json.flag);
    this.number = ReturnIfValid(json.number);
    this.expirationDate = ReturnIfValid(json.expirationDate);
    this.secureCode = ReturnIfValid(json.secureCode);
    this.type = ReturnIfValid(json.type);
    this.userId = ReturnIfValid(json.userId);
  }
}
