import { Utils } from '../commons/core/utils';

export default class Rule {
  id!: number
  status!: string
  name!: string
  level!: number

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.status = Utils.returnIfValid(json.status);
    this.name = Utils.returnIfValid(json.name);
    this.level = Utils.returnIfValid(json.level);
  }
}
