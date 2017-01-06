import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { SelectItem, DataTable } from 'primeng/primeng';

import { SqlinfoService } from '../services/sqlinfo.service';
import { StoredProcedure } from '../models/storedprocedure';
import { Parameter } from '../models/parameter';

@Component({
  selector: 'dev-database-stored-procedure',
  templateUrl: './database-stored-procedure.component.html',
  styleUrls: ['./database-stored-procedure.component.css']
})
export class DatabaseStoredProcedureComponent implements OnInit {

  private _storedProcedures: StoredProcedure[];
  private _storedProcedure: StoredProcedure;

  private _parameters: Parameter[];
  private _parameter: Parameter;

  constructor(private _http: Http,
    private _sqlinfoService: SqlinfoService) {

  }

  ngOnInit() {
    this.getStoredProcedures();
  }

  handleRowSelect(event) {
    console.log(`handleRowSelect(${JSON.stringify(event)})`);
  }

  handleRowExpand(event) {
    console.log(`handleRowExpand(${JSON.stringify(event)})`);
    this._parameters = [];
  }

  getStoredProcedures(): void {
    this._storedProcedures = [];
    this._sqlinfoService.getStoredProcedures()
      .then(storedProcedures => {
        this._storedProcedures = storedProcedures;
      });
  }

  onRowClick() {
    console.log(`onRowClick`);
  }

  getStoredProcedureParameters(aStoredProcedure: StoredProcedure) {
    console.log(`getStoredProcedureParameters`);
    this._parameter = new Parameter();

    this._sqlinfoService.getParameters(aStoredProcedure)
      .then(res => {
        this._parameters = JSON.parse(JSON.stringify(res));
      });

    this._storedProcedure = aStoredProcedure;
  }


  private handleError(error: any) {
    return Promise.reject(error.message || error);
  }
}
