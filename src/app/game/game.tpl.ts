export const GAME_TPL = `
<tool-bar (toggle)="toggle($event)" [isStarted]="isStarted"></tool-bar>
<md-content class="container">
    <h4 class="score">Score: {{score}}</h4>
    <div layout-fill layout="column" layout-align="center center">
        <game-board [board]="board" [snake]="snake" [fruit]="fruit" [isGameOver]="isGameOver"></game-board>
    </div>
</md-content>`;
