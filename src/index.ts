/// <reference path="../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.scss';

import { App } from './app/app.component';

import { enableProdMode } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import '@angular2-material/core';
declare var process: any;
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(App, [
  HTTP_PROVIDERS
]);
