import { Utils } from '../commons/core/utils';

export default class GenericAddress {
  cep!: string;
  logradouro!: string;
  complemento!: string;
  bairro!: string;
  localidade!: string;
  uf!: string;
  ibge: number;
  gia!: string;
  ddd: string;
  siafi: string;

  constructor(json?: any) {
    this.cep = Utils.returnIfValid(json.cep);
    this.logradouro = Utils.returnIfValid(json.logradouro);
    this.complemento = Utils.returnIfValid(json.complemento);
    this.bairro = Utils.returnIfValid(json.bairro);
    this.localidade = Utils.returnIfValid(json.localidade);
    this.uf = Utils.returnIfValid(json.uf);
    this.ibge = Utils.returnIfValid(json.ibge);
    this.gia = Utils.returnIfValid(json.gia);
    this.ddd = Utils.returnIfValid(json.ddd);
    this.siafi = Utils.returnIfValid(json.siafi);
  }
}