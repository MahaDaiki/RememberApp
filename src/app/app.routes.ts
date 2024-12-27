import { Routes } from '@angular/router';
import { GamePageComponent } from './game/game-page/game-page.component';
import { BannerComponent } from './banner/banner.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'game', component: GamePageComponent },
  { path: 'home', component: BannerComponent},
];
