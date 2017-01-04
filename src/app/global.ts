import { AppComponent } from './app.component';
'use strict';
export const dbLocal = false;
export const debug = true;


export const baseUrl = dbLocal === true ? "http://localhost:8088/cosmos-ccm/" : "http://172.28.88.12:8088/cosmos-ccm/";
export const datarootUrl = dbLocal === true ? "\\\\localhost\\ccm\\Data\\Input\\" : "\\\\172.28.88.12\\ccm\\Data\\Input\\";







