import { Component, Output, EventEmitter } from '@angular/core';
import { TOOLBAR_TPL } from './tool-bar.tpl.ts';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_ICON_DIRECTIVES } from '@angular2-material/icon';

@Component({
    selector: 'tool-bar',
    template: TOOLBAR_TPL,
    styles: [
        '.fill-space {flex: 1 1 auto;}',
        '[md-fab] {position: absolute; right: 3%; top: 34px; z-index: 1;}'
    ],
    directives: [
        MD_BUTTON_DIRECTIVES,
        MD_TOOLBAR_DIRECTIVES,
        MD_ICON_DIRECTIVES
    ]
})
export class ToolBarComponent {
    @Output() toggle: EventEmitter<any> = new EventEmitter();

    fireToggle() {
        this.toggle.emit(null);
    }
}
