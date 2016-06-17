import { Component } from '@angular/core';

@Component({
    selector: 'footer',
    template: '<div>{{copyright}}</div>',
    styles: [`
        :host{
            color: #607D8B;
            text-align: center;
        }
    `]
})
export class FooterComponent {
    copyright: string;

    constructor() {
        this.copyright = 'Build with ♥ by the ShuhratBek ©2016';
    }
}
