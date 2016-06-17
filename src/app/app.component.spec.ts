/// <reference path="../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './tool-bar/index';
import { FooterComponent } from './footer/index';
import { GameBoardComponent } from './game-board/index';
import { describe, it, expect, inject, async, setBaseTestProviders } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { TEST_BROWSER_STATIC_PLATFORM_PROVIDERS, ADDITIONAL_TEST_BROWSER_PROVIDERS } from '@angular/platform-browser/testing';
import { BROWSER_APP_DYNAMIC_PROVIDERS } from '@angular/platform-browser-dynamic';
import { MdIconRegistry } from '@angular2-material/icon';
import { GameService } from './shared/index';
import { HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'tool-bar',
    template: ''
})
class MockToolBar {}
@Component({
    selector: 'game-board',
    template: ''
})
class MockGameBoard {}
@Component({
    selector: 'footer',
    template: ''
})
class MockFooter {}

setBaseTestProviders(
    TEST_BROWSER_STATIC_PLATFORM_PROVIDERS,
    [
        BROWSER_APP_DYNAMIC_PROVIDERS,
        ADDITIONAL_TEST_BROWSER_PROVIDERS,
        HTTP_PROVIDERS,
        MdIconRegistry,
        GameService
    ]
);
describe('app component', () => {
    it('should render the tool-bar, game-board and footer', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb
            .overrideDirective(AppComponent, ToolBarComponent, MockToolBar)
            .overrideDirective(AppComponent, GameBoardComponent, MockGameBoard)
            .overrideDirective(AppComponent, FooterComponent, MockFooter)
            .createAsync(AppComponent)
            .then(fixture => {
                fixture.detectChanges();
                const main = fixture.nativeElement;
                expect(main.querySelector('ToolBarComponent')).toBeDefined();
                expect(main.querySelector('GameBoardComponent')).toBeDefined();
                expect(main.querySelector('FooterComponent')).toBeDefined();
            });
    })));
});
