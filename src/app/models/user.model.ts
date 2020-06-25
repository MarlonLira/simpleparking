import { ReturnIfValid } from '../commons/functions/properties';

export default class User {
  id!: number;
  status!: string;
  name!: string;
  registryCode!: string;
  phone!: string;
  email!: string;
  password!: string;

  constructor(json?: any) {
    this.id = ReturnIfValid(json.id);
    this.name = ReturnIfValid(json.name);
    this.status = ReturnIfValid(json.status);
    this.registryCode = ReturnIfValid(json.registryCode);
    this.phone = ReturnIfValid(json.phone);
    this.email = ReturnIfValid(json.email);
    this.password = ReturnIfValid(json.password);
  }
}
