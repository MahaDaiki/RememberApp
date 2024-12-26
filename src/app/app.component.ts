import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { GameModule } from './game/game.module';
import { GamePageComponent } from './game/game-page/game-page.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {
  title = 'RememberApp';
}
