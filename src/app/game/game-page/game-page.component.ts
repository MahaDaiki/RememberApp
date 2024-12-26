import { Component, OnInit  } from '@angular/core';
import {RouterModule} from '@angular/router';
import { GameService } from '../game.service';


@Component({
  selector: 'app-game-page',
  // imports: [RouterModule],
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
  standalone:false,
})
export class GamePageComponent implements OnInit {
  sequence: string[] = [];
  userSequence: string[] = [];
  level: number = 1;
  timeLeft: number = 15;
  timer: any;
  gameOver: boolean = false;
  isIlluminating: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameService.startNewGame();
    this.sequence = this.gameService.getSequence();
    this.userSequence = [];
    this.level = 1;
    this.gameOver = false;
    this.illuminateSequence();
  }

  illuminateSequence(): void {
    this.isIlluminating = true;
    let delay = 0;

    this.sequence.forEach((color) => {
      setTimeout(() => this.highlightButton(color), delay);
      delay += 1000; // 1-second delay per color
    });

    setTimeout(() => {
      this.isIlluminating = false;
      this.startTimer();
    }, this.sequence.length * 1000); // End illumination after sequence
  }

  highlightButton(color: string): void {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add('illuminated');
      setTimeout(() => button.classList.remove('illuminated'), 500);
    }
  }

  startTimer(): void {
    this.timeLeft = 15;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft === 0) {
        clearInterval(this.timer);
        this.checkSequence();
      }
    }, 1000);
  }

  checkSequence(): void {
    clearInterval(this.timer);

    if (this.gameService.verifySequence(this.userSequence)) {
      alert('Correct! Proceeding to the next level.');
      this.level++;
      const nextSequence = this.gameService.nextLevel();
      if (Array.isArray(nextSequence)) {
        this.sequence = nextSequence;
      } else {
        console.error('nextLevel did not return a valid sequence.');
      }

      this.userSequence = [];
      this.illuminateSequence();
    } else {
      alert('Incorrect! Game Over.');
      this.gameOver = true;
    }
  }


  addToUserSequence(color: string): void {
    if (!this.isIlluminating && !this.gameOver) {
      this.userSequence.push(color);
    }
  }

  restartGame(): void {
    this.startNewGame();
  }

  enableSubmit(): boolean {
    return this.userSequence.length === this.sequence.length;
  }
}

