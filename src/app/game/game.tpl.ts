export const tpl = `
<div class="gameContainer">
	<tool-bar (toggle)="toggle($event)"></tool-bar>
	<md-content>
		<h4>Score: {{score}}</h4>
		<div layout-fill layout="column" layout-align="center center">
			<game-board [board]="board" [snake]="snake" [fruit]="fruit" [isGameOver]="isGameOver"></game-board>
		</div>
	</md-content>
</div>`;
