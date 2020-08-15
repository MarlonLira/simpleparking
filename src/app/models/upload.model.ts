import { Utils } from '../commons/core/utils';

export default class Upload {
  files: File[];

  constructor(json?: any) {
    if (json) {
      this.files = Utils.returnIfValid(json.files);
    }
  }
}
