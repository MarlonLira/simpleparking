import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
import { Utils } from 'app/commons/core/utils';
import RouteSecurity from 'app/models/route-security.model';
import Rule from 'app/models/rule.model';
import { AuthService } from 'app/services/auth.service';
import { RouteSecurityService } from 'app/services/route-security.service';
import { RuleService } from 'app/services/rule.service';
import { ToastrService } from 'ngx-toastr';
import { routes } from '../../app.routing';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent extends BaseComponent {
  public routes: Route[] = [];
  public rules: Rule[];
  public routeSecurity: RouteSecurity[] = [];

  constructor(
    public toastr: ToastrService,
    public router: Router,
    public authService: AuthService,
    public service: RouteSecurityService,
    public ruleService: RuleService
  ) {
    super(toastr, router, authService);
  }

  protected onAfterViewInit(): void { }
  protected onDestroy(): void { }

  protected onInit(): void {
    this.routes = routes;
    this.onLoadList();
  }

  protected async onLoadList() {
    this.rules = await this.ruleService.toList();
    this.routeSecurity = await this.service.toList();;
    let obj: any = [];
    let objAssign: any = [];

    this.routes = this.routes.filter(x => Utils.isValid(x.path)
      && x.path != '**'
      && x.path != 'error'
      && x.path != 'auth/account-recovery'
      && x.path != 'auth/signup'
      && x.path != 'auth/signin');

    this.routes.forEach((item: Route) => {
      if (this.routeSecurity.find(x => x.route === `/${item.path}`) == undefined) {
        obj.push(new RouteSecurity({ 'id': 0, 'ruleId': 4, 'companyId': 0, 'route': `/${item.path}` }));
        if (item.children) {
          item.children.forEach((child: Route) => {
            if (this.routeSecurity.find(x => x.route === `/${item.path}/${child.path}`) == undefined) {
              obj.push(new RouteSecurity({ 'id': 0, 'ruleId': 4, 'companyId': 0, 'route': `/${item.path}/${child.path}` }));
            }
          });
        }
      }
    });

    Object.assign(objAssign, obj, this.routeSecurity);
    
    this.displayedColumns = ['route', 'rule'];
    this.dataSource = new MatTableDataSource(objAssign);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
