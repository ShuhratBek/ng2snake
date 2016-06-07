export const tpl = `
<md-toolbar color="primary">
    <span>ng2Snake</span>
    <span class="fill-space"></span>
    <button *ngIf="!isStarted" md-fab (click)="fireToggle()">
        <md-icon svgIcon="play"></md-icon>
    </button>
    <button *ngIf="isStarted" md-fab (click)="fireToggle()" color="accent">
        <md-icon svgIcon="stop"></md-icon>
    </button>
</md-toolbar>`;
