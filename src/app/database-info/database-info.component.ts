import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

/** PrimeNG */
import { SelectItem, DataTable } from 'primeng/primeng';
import { Message } from 'primeng/primeng';

import { SqlinfoService } from '../services/sqlinfo.service';
import { Table } from '../models/table';
import { Column } from '../models/column';

@Component({
  selector: 'app-database-info',
  templateUrl: './database-info.component.html',
  styleUrls: ['./database-info.component.css']
})
export class DatabaseInfoComponent implements OnInit {
  @ViewChild('dataTable') private _dataTable: DataTable;

  private _loading: boolean;
  private _data: Object;
  private _tables: Table[];
  private _table: Table;

  private _columns: Column[];
  private _column: Column;

  _tableItems: SelectItem[];
  selectedTable: string;
  msgs: Message[] = [];
  sticky: boolean = false;

  constructor(private _http: Http,
    private _sqlinfoService: SqlinfoService) {
  }


  ngOnInit() {
    // this.getTableNames();
    this.fillDropDownTables();
  }


  handleRowSelect(event) {
    console.log(`handleRowSelect(${JSON.stringify(event)})`);
  }

  handleRowExpand(event) {
    console.log(`handleRowExpand(${JSON.stringify(event)})`);
    this._columns = [];
  }

  onRowClick() {
    console.log(`onRowClick`);
  }

  btnGetTables() {
    this._data = new Object();
    this._tableItems = [];
    this._tables = [];

    this._data = this._sqlinfoService.getTables()
      .then(res => {
        this._tables = JSON.parse(JSON.stringify(res));
        this._tableItems.push({ label: 'Select Table  ', value: null });
        this._tables.forEach(table => {
          this._tableItems.push({ label: table.TABLE_NAME, value: table.TABLE_NAME });
        });
      })
      .catch(this.handleError);
  }

  fillDropDownTables(): void {
    this._data = new Object();
    this._tableItems = [];
    this._tableItems.push({ label: 'Select Table  ', value: null });

    this._data = this._sqlinfoService.getTables()
      .then(res => {
        this._tables = JSON.parse(JSON.stringify(res));
        if (this._tables) {
          this._tables.forEach(table => {
            this._tableItems.push({ label: table.TABLE_NAME, value: table.TABLE_NAME });
          });
        } else {
          this._tableItems = [];
          this._tableItems.push({ label: 'No Connection  ', value: null });
        }

      })
      .catch(this.handleError);
  }

  getTableNames(): void {
    this._tableItems = [];
    this._tables = [];
    this._tableItems.push({ label: 'Select Table  ', value: null });

    this._sqlinfoService.getTables()
      .then(tables => {
        // this._tables = tables.sort((a:Table, b:Table) => a.TABLE_NAME < b.TABLE_NAME));
        this._tables = tables;
        this._tables.forEach(table => {
          this._tableItems.push({ label: table.TABLE_NAME, value: table.TABLE_NAME });
        });
      });
  }

  makeRequest(): void {
    if (this._table.TABLE_NAME !== undefined) {
      this._data = this._sqlinfoService.getTableContentAsJson(this._table.TABLE_NAME)
        .then(objects => {
          this._data = [];
          this._data = objects;
        });
    }
  }


  btnRequest(event): void {
    console.log(event);
    // event.preventDefault();
    // console.log(this._sqlinfoService.getSQL());
    // if (this.selectedTable !== undefined) {
    //   this.makeRequest();
    // }
  }

  update(dt: DataTable) {
    console.log(`update ${dt}`);
    dt.reset();
  }

  rowSelect(event) {
    this.makeRequest();
  }

  rowExpand(row: Table) {
    this._columns = [];
    this._data = new Object();
    this._dataTable.expandedRows.forEach(expandedRow => {
      if (row !== expandedRow) {
        this._dataTable.toggleRow(expandedRow);
      }
    });
  }

  getTableInfo(aTable: Table) {
    this._column = new Column();
    this._columns = [];

    this._data = this._sqlinfoService.getColumns(aTable.TABLE_NAME)
      .then(res => {
        this._columns = JSON.parse(JSON.stringify(res));
      })
      .catch(this.handleError);

    this._table = aTable;
    this.makeRequest();
  }

  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }

  showInfo() {
    this.sticky = !this.sticky;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Info Message', detail: 'Info Demo' });
  }

  showWarn() {
    this.sticky = !this.sticky;
    this.msgs = [];
    this.msgs.push({ severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
  }

  showError() {
    this.sticky = !this.sticky;
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: 'Validation failed' });
  }

  showSuccess() {
    this.sticky = !this.sticky;
    this.msgs = [];
    this.msgs.push({ severity: 'succes', summary: 'Succes Message', detail: 'Succesful' });
  }

  showMultiple() {
    this.sticky = !this.sticky;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Message 1', detail: 'Info Demo 1' });
    this.msgs.push({ severity: 'info', summary: 'Message 2', detail: 'Info Demo 2' });
    this.msgs.push({ severity: 'info', summary: 'Message 3', detail: 'Info Demo 3' });
  }

  clear() {
    this.sticky = !this.sticky;
    this.msgs = [];
  }

}


// class ScenarioMaster {
//   ID: number;
//   Name: string;
//   Description: string;
//   TenantID: number;
//   TenantName: string;
// }