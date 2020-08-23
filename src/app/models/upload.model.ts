import { Utils } from '../commons/core/utils';

export default class Upload {
  id: number;
  name: string;
  path: string;
  entityId: number;

  constructor(json?: any) {
    if (json) {
      this.id = Utils.returnIfValid(json.id);
      this.name = Utils.returnIfValid(json.name);
      this.path = Utils.returnIfValid(json.path);
      this.entityId = Utils.returnIfValid(json.entityId);
    }
  }
}
