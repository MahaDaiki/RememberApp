import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css',
  animations: [
    trigger('bounce', [
      state('normal', style({transform: 'scale(1)'})),
      state('bounced', style({transform: 'scale(1.1)'})),
      transition('normal <=> bounced', [animate('300ms ease-in-out')]),
    ]),
  ],
  standalone: true
})
export class BannerComponent {
  bounceState = 'normal';

  toggleBounce() {
    this.bounceState = this.bounceState === 'normal' ? 'bounced' : 'normal';
  }

}
