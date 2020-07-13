import { Utils } from '../commons/core/utils';

export default class Dashboard {
  credit!: number;
  debit!: number;
  goal!: number;

  constructor(json: any) {
    this.credit = Utils.returnIfValid(json.credit, 0);
    this.debit = Utils.returnIfValid(json.debit, 0);
    this.goal = Utils.returnIfValid(json.goal, 0);
  }
}
