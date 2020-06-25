import { ReturnIfValid } from '../commons/functions/properties';

export default class Company {
  id!: number;
  status!: string;
  name!: string;
  registryCode!: string;
  phone!: string;

  constructor(json?: any) {
    this.id = ReturnIfValid(json.id);
    this.name = ReturnIfValid(json.name);
    this.status = ReturnIfValid(json.status);
    this.registryCode = ReturnIfValid(json.registryCode);
    this.phone = ReturnIfValid(json.phone);
  }
}
