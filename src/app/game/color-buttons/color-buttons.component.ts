import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-color-buttons',
  templateUrl: './color-buttons.component.html',
  styleUrl: './color-buttons.component.css',
  standalone: false,
})
export class ColorButtonsComponent implements OnInit {
  sequence: string[] = [];
  shuffledColors: string[] = [];
  userSequence: string[] = [];
  isIlluminating: boolean = false;
  chronoStart: number | null = null; // Start time for the chrono
  chronoTime: number = 0; // Time taken in seconds

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.sequence = this.gameService.getSequence();
    this.illuminateSequence();
  }

  illuminateSequence(): void {
    this.isIlluminating = true;
    let delay = 0;

    this.sequence.forEach((color) => {
      setTimeout(() => this.illuminateButton(color), delay);
      delay += 1000; // 1-second delay per color
    });

    setTimeout(() => {
      this.isIlluminating = false;
      this.shuffleColors();
    }, 15000); // 15 seconds illumination
  }

  illuminateButton(color: string): void {
    const button = document.getElementById(color);
    if (button) {
      button.classList.add('illuminated');
      setTimeout(() => button.classList.remove('illuminated'), 500);
    }
  }

  shuffleColors(): void {
    this.shuffledColors = this.gameService.shuffleSequence();
  }

  onColorClick(color: string): void {
    if (this.isIlluminating) return;

    this.userSequence.push(color);
    if (this.chronoStart === null) {
      this.chronoStart = Date.now(); // Start the chrono on first click
    }
  }

  onSubmit(): void {
    if (this.chronoStart !== null) {
      this.chronoTime = Math.floor((Date.now() - this.chronoStart) / 1000);
      this.gameService.recordTimeTaken(this.chronoTime);
    }

    const isCorrect = this.gameService.verifySequence(this.userSequence);
    if (isCorrect) {
      alert(`Correct! Time taken: ${this.chronoTime} seconds`);
      this.gameService.nextLevel();
      this.sequence = this.gameService.getSequence();
      this.resetGame();
    } else {
      alert('Incorrect! Game Over.');
      this.resetGame();
    }
  }

  resetGame(): void {
    this.userSequence = [];
    this.chronoStart = null;
    this.chronoTime = 0;
    this.illuminateSequence();
  }
}
