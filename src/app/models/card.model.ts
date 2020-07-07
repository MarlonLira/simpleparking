import { Utils } from '../commons/core/utils';

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
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.holder = Utils.returnIfValid(json.holder);
    this.flag = Utils.returnIfValid(json.flag);
    this.number = Utils.returnIfValid(json.number);
    this.expirationDate = Utils.returnIfValid(json.expirationDate);
    this.secureCode = Utils.returnIfValid(json.secureCode);
    this.type = Utils.returnIfValid(json.type);
    this.userId = Utils.returnIfValid(json.userId);
  }
}
