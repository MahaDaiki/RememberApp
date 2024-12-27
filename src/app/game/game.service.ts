import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private level: number = 1;
  private sequence: string[] = [];
  private timeTaken: number = 0;

  constructor() {
    this.startNewGame();
  }

  private getRandomRGBColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  startNewGame(): void {
    this.level = 1;
    this.sequence = [];
    this.timeTaken = 0;
    this.addColorToSequence();
  }

  private addColorToSequence(): void {
    const randomColor = this.getRandomRGBColor();
    this.sequence.push(randomColor);
  }

  getSequence(): string[] {
    return [...this.sequence];
  }

  shuffleColors(): string[] {
    const shuffled = [...this.sequence];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  verifySequence(userInput: string[]): boolean {
    return userInput.join() === this.sequence.join();
  }

  nextLevel(): void {
    this.level++;
    this.addColorToSequence();
  }

  recordTimeTaken(time: number): void {
    this.timeTaken = time;
  }

  getTimeTaken(): number {
    return this.timeTaken;
  }
}
