export const TOOLBAR_TPL = `
<md-toolbar color="primary">
    <span>ng2Snake</span>
    <span class="fill-space"></span>
    <button *ngIf="!isStarted()" md-fab (click)="toggle()">
        <md-icon svgIcon="play"></md-icon>
    </button>
    <button *ngIf="isStarted()" md-fab (click)="toggle()" color="warn">
        <md-icon svgIcon="stop"></md-icon>
    </button>
</md-toolbar>`;
