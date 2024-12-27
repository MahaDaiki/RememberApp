import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GamePageComponent} from './game-page/game-page.component';
import {ColorButtonsComponent} from './color-buttons/color-buttons.component';
import {ScoreBoardComponent} from './score-board/score-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameService } from './game.service';


@NgModule({
  declarations: [
    GamePageComponent,
    ColorButtonsComponent,
    ScoreBoardComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [GameService],
  exports: [
    GamePageComponent ]
})
export class GameModule { }
