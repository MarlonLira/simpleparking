import { Utils } from '../commons/core/utils';

export default class Email {
  subject: string;
  text: string;
  from: string;
  to: string;

  constructor(json?: any) {
    if (json) {
      this.subject = Utils.returnIfValid(json.subject);
      this.text = Utils.returnIfValid(json.text);
      this.from = Utils.returnIfValid(json.from);
      this.to = Utils.returnIfValid(json.to);
    }
  }
}
