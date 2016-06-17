/// <reference path="../../../typings/index.d.ts"/>

import 'zone.js/dist/zone';
import 'zone.js/dist/async-test';
import { FooterComponent } from './footer.component';
import { describe, it, expect, inject, async } from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';

describe('tool-bar component', () => {
    it('should render title \'ng2Snake\'', async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
        tcb.createAsync(FooterComponent)
            .then(fixture => {
                const footer = fixture.nativeElement;
                footer.copyright = 'Build with ♥ by the ShuhratBek ©2016';
                fixture.detectChanges();
                const div = fixture.nativeElement.querySelector('div');
                expect(div).not.toBeNull();
                expect(div.textContent).toBe(footer.copyright);
            });
    })));
});
