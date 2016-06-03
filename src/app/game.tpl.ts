export const template = `<div id="gameContainer">
      <h3>Score: {{score}}</h3>
      <div>
          <div class="row" ng-repeat="column in board">
              <div class="column"
                  ng-style="{'background-color': setStyling($parent.$index, $index)}"
                  ng-repeat="row in column track by $index"
              ></div>
          </div>
      </div>
      <div id="startGame" ng-click="startGame()">Start Game</div>
    </div>`;
