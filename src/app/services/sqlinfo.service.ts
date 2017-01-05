import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Table } from '../models/table';
import { Column } from '../models/column';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SqlinfoService {
    /** return this._http.get(`http://172.28.88.12:8088/cosmos-ccm/dbstoredprocedure/InfoTableName`) */
    private _mockFile: string = 'app/resources/data/infotablename.json';
    private _spaUrl: string = 'http://172.28.88.12:8088/cosmos-ccm/';
    private _storedProcedure: string = 'dbstoredprocedure/';
    private _dbstandard: string = 'dbstandard/';

    constructor(private _http: Http) { }


    getTables1(): Promise<Table[]> {
        return this._http.get(`${this._spaUrl}${this._storedProcedure}InfoTableName`)
            .map(res => res.json())
            // .subscribe(data => resolve(data.json))
            .toPromise()
            // .then(res => res.json())
            // .then(res => res.json())
            // .then(res => <Table[]>res.json().data)
            // .then(data => { return data; })
            .catch(this.handleError);
    }

    getTableContentAsJson(aTableName: string): Promise<Object[]> {
        return this._http.request(`${this._spaUrl}${this._dbstandard}[${aTableName}]`)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getTables(): Promise<Table[]> {
        return this._http.get(`${this._spaUrl}${this._storedProcedure}InfoTableName`)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getColumns(aTableName: string): Promise<Column[]> {
        let search = new URLSearchParams();
        search.set('param1', aTableName);
        return this._http.get(`${this._spaUrl}${this._storedProcedure}InfoTableColumn?${search.toString()}`)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    getSQL(): Table {
        let table: Table = new Table();
        this._http.get(`${this._spaUrl}${this._storedProcedure}InfoTableName`).subscribe((value: Response) => {
            console.log('value' + value);
            table = <Table>value.json();
        });
        console.log('table ' + table);
        return table;
    }

    getTablesMock() {
        console.log(this._mockFile);
        return this._http.get(this._mockFile)
            .toPromise()
            .then(res => <Table[]>res.json().data)
            .then(data => { return data; });
    }

    private handleError(error: any) {
        console.log();
        return Promise.reject(error.message || error);
    }
}


/**
    Select name AS TableName, object_id AS ObjectID
    From sys.tables

    SELECT TAB.name AS TableName, TAB.object_id AS ObjectID, COL.name AS ColumnName, COL.user_type_id AS DataTypeID
    From sys.columns COL
    INNER JOIN sys.tables TAB
    On COL.object_id = TAB.object_id

    SELECT TAB.name AS TableName, TAB.object_id AS ObjectID, COL.name AS ColumnName, TYP.name AS DataTypeName, TYP.max_length AS MaxLength
    From sys.columns COL
    INNER JOIN sys.tables TAB
    On COL.object_id = TAB.object_id
    INNER JOIN sys.types TYP
    ON TYP.user_type_id = COL.user_type_id
 */

/**
 * SELECT 
SCHEMA_NAME(SCHEMA_ID)					AS [Schema], 
SO.parent_object_id						AS [ID],
SO.name									AS [ObjectName],
SO.Type_Desc							AS [ObjectType],-- (UDF/SP)],
COALESCE(P.parameter_id,0)				AS [ParameterID],
COALESCE(P.name, 'NO PARAMETER')		AS [ParameterName],
COALESCE(TYPE_NAME(P.user_type_id),'')  AS [ParameterDataType],
COALESCE(P.max_length,0)				AS [ParameterMaxBytes],
COALESCE(P.is_output,0)					AS [IsOutPutParameter]
FROM sys.objects AS SO
LEFT OUTER JOIN sys.parameters AS P 
ON SO.OBJECT_ID = P.OBJECT_ID
WHERE SO.OBJECT_ID IN ( SELECT OBJECT_ID 
FROM sys.objects
WHERE TYPE IN ('P','FN'))
-- AND (SO.NAME NOT LIKE 'SP_%' OR SO.NAME NOT LIKE '_%')   --starting with a certain prefix 
ORDER BY [Schema], SO.name, P.parameter_id
GO




SELECT o.name AS [Procedure name], * , p.name as [Parameter name] 
,o.xtype
FROM sys.parameters p INNER JOIN sysobjects o ON p.object_id = o.id
WHERE o.xtype = 'P'
--WHERE o.name LIKE 'prefix%' AND o.xtype = 'P'


SELECT name AS [Procedure name], *
FROM sysobjects  
ORDER BY Name

 * 
 */
