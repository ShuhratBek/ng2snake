/// <reference path="../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import { bootstrap } from '@angular/platform-browser-dynamic';

import './index.scss';

import { AppComponent } from './app/index';

import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import '@angular2-material/core';
declare var process: any;
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [
  HTTP_PROVIDERS
]);
