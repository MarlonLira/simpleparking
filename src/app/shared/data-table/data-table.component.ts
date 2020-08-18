import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit, Input } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Consts from '../../consts';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';

export interface DataTableColumn {
  title: string;
  data: string;
}

export class DataTable {
  columns: DataTables.ColumnSettings[];
  dataSourceUri: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  @Input()
  public source: DataTable;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    public toastr: ToastrService,
    public authService: AuthService,
    public router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.http.get(`${Consts.API_URL}/${this.source.dataSourceUri}`)
          .subscribe((resp: any) => callback({ data: resp.result }),
            (error) => this.toastr.error(error, 'Error'));
      },
      columns: this.source.columns
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  refreshTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
    // $('#example').DataTable().destroy();
    // this.dtTrigger.next();
  }

}
