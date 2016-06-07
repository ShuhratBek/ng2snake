import { Component, Output, EventEmitter } from '@angular/core';
import { tpl } from './tool-bar.tpl.ts';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';

@Component({
    selector: 'tool-bar',
    template: tpl,
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MD_ICON_DIRECTIVES
    ],
    providers: [ MdIconRegistry ]
})
export class ToolBar {
    @Output() toggle: EventEmitter<any> = new EventEmitter();
    isStarted: boolean = false;

    constructor(mdIconRegistry: MdIconRegistry) {
        mdIconRegistry.addSvgIcon('play', './icons/play.svg');
        mdIconRegistry.addSvgIcon('stop', './icons/stop.svg');
    }

    fireToggle() {
        this.toggle.emit(this.isStarted);
        this.isStarted = !this.isStarted;
    }
}
