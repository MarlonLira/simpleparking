import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BaseComponent } from 'app/base.component';
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
  public routes = [];
  public rules: Rule[];

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
    const routeSecurity = await this.service.toList();

    this.displayedColumns = ['route', 'rule', 'actions'];
    this.dataSource = new MatTableDataSource(routeSecurity);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
