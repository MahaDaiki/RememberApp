import { Component, Input} from '@angular/core';
import { GameService } from '../game.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-color-buttons',
  templateUrl: './color-buttons.component.html',
  styleUrl: './color-buttons.component.css',
  standalone: false,
  animations: [
    trigger('illumination', [
      state('off', style({
        transform: 'scale(1)',
        filter: 'brightness(1)'
      })),
      state('on', style({
        transform: 'scale(1.1)',
        filter: 'brightness(1.5)'
      })),
      transition('off => on', [
        animate('0.2s ease-in')
      ]),
      transition('on => off', [
        animate('0.2s ease-out')
      ])
    ])
  ]
})
export class ColorButtonsComponent {
  @Input() colors: string[] = [];
  @Input() isIlluminating: boolean = false;
  @Input() onColorClick!: (color: string) => void;

  // Track illumination state for each button
  illuminatedStates: { [key: string]: string } = {};

  ngOnInit() {
    this.colors.forEach(color => {
      this.illuminatedStates[color] = 'off';
    });
  }

  setIlluminated(color: string, state: boolean) {
    this.illuminatedStates[color] = state ? 'on' : 'off';
  }

  onClick(color: string): void {
    if (!this.isIlluminating) {
      this.onColorClick(color);
      // Quick flash when clicked
      this.setIlluminated(color, true);
      setTimeout(() => this.setIlluminated(color, false), 200);
    }
  }
}
