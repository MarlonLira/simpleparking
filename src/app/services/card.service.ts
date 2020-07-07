import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Card from '../models/card.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CardService extends BaseService<Card> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  Save(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPost('/card', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Delete(id: number): Promise<any> {
    return new Promise((resolve) => {
      this.onDelete(`/card/${id}`)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  Update(values): Promise<any> {
    return new Promise((resolve) => {
      this.onPut('/card', values)
        .subscribe(requested => {
          resolve(requested['message']);
        });
    });
  }

  GetByUserId(userId: number): Promise<Card[]> {
    return new Promise((resolve) => {
      this.onGet(`/cards/userId/${userId}`)
        .subscribe((requested: Card[]) => {
          resolve(requested);
        });
    });
  }

  GetById(id: number): Promise<Card> {
    return new Promise((resolve) => {
      this.onGet(`/card/id/${id}`)
        .subscribe((requested: Card) => {
          resolve(requested);
        });
    });
  }
}
