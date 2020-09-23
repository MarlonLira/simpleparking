import { Injectable } from '@angular/core';
import Rule from 'app/models/rule.model';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class RuleService extends BaseService<Rule> {

  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  toList(): Promise<Rule[]> {
    return new Promise((resolve, reject) => {
      this.onGet('/rules')
        .subscribe(
          (requested) => resolve(requested['result']),
          (e) => reject(e.error)
        );
    });
  }
}
