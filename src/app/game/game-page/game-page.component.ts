import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { GameService } from '../game.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import {ColorButtonsComponent} from '../color-buttons/color-buttons.component';


@Component({
  selector: 'app-game-page',
  // imports: [RouterModule],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  standalone:false,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class GamePageComponent implements OnInit, OnDestroy {
  sequence: string[] = [];
  shuffledColors: string[] = [];
  userSequence: string[] = [];
  level: number = 1;
  timeLeft: number = 15;
  timer: any;
  elapsedTime: number = 0;
  isIlluminating: boolean = false;
  gameOver: boolean = false;
  showButtons: boolean = false;
  showCorrectPopup: boolean = false;
  lastScore: number = 0;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startNewGame(): void {
    this.clearTimer();
    this.gameService.startNewGame();
    this.sequence = this.gameService.getSequence();
    this.level = 1;
    this.userSequence = [];
    this.gameOver = false;
    this.showButtons = false;
    this.elapsedTime = 0;
    this.showCorrectPopup = false;
    this.displaySequence();
  }

  private clearTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  @ViewChild(ColorButtonsComponent) colorButtons!: ColorButtonsComponent;

  displaySequence(): void {
    this.isIlluminating = true;
    this.showButtons = true;
    let sequenceDelay = 1000;

    this.timeLeft = 15;

    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.isIlluminating = false;
        this.shuffleColors();
        this.startResponseTimer();
      }
    }, 1000);


    const illuminateColor = (color: string) => {
      if (this.colorButtons) {
        this.colorButtons.setIlluminated(color, true);
        setTimeout(() => this.colorButtons.setIlluminated(color, false), 500);
      }
    };

    const loopSequence = () => {
      this.sequence.forEach((color, index) => {
        setTimeout(() => illuminateColor(color), index * sequenceDelay);
      });


      const sequenceDuration = this.sequence.length * sequenceDelay;


      setTimeout(() => {
        if (this.timeLeft > 0) {
          loopSequence();
        }
      }, sequenceDuration);
    };

    loopSequence();
  }


  startResponseTimer(): void {
    this.elapsedTime = 0;
    this.timer = setInterval(() => {
      this.elapsedTime++;
    }, 1000);
  }

  highlightButton(color: string): void {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add('illuminated');
      setTimeout(() => button.classList.remove('illuminated'), 500);
    }
  }

  shuffleColors(): void {
    this.shuffledColors = this.gameService.shuffleColors();
  }

  handleColorClick = (color: string): void => {
    if (this.isIlluminating || this.gameOver) return;
    this.userSequence.push(color);
    this.highlightButton(color);
  }

  onSubmit(): void {
    this.clearTimer();
    this.gameService.recordTimeTaken(this.elapsedTime);
    this.lastScore = this.elapsedTime;

    if (this.gameService.verifySequence(this.userSequence)) {
      this.showCorrectPopup = true;
      setTimeout(() => {
        this.showCorrectPopup = false;
        this.level++;
        this.gameService.nextLevel();
        this.sequence = this.gameService.getSequence();
        this.userSequence = [];
        this.displaySequence();
      }, 2000);
    } else {
      this.gameOver = true;
    }
  }

  onReset(): void {
    this.userSequence = [];
  }
}

