import { Utils } from '../commons/core/utils';
import Company from './company.model';
import Rule from './rule.model';

export default class RouteSecurity {
  id: number;
  route: string;
  ruleId!: number;
  companyId: number;

  rule: Rule;
  company: Company;

  constructor(json?: any) {
    this.id = Utils.returnIfValid(json.id);
    this.route = Utils.returnIfValid(json.route);
    this.ruleId = Utils.returnIfValid(json.ruleId);
    this.companyId = Utils.returnIfValid(json.companyId);
    this.rule = Utils.returnIfValid(json.rule);
    this.company = Utils.returnIfValid(json.company);
  }
}
