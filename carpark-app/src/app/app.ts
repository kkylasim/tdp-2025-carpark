import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Textbox } from './components/textbox/textbox';
import { Toggle } from './components/toggle/toggle';
import { Results } from './components/results/results';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Textbox, Toggle, Results],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('carpark-app');
  toggleOptions = [
    { label: 'Night', value: 'night' },
    { label: 'Any', value: 'any' }
  ];
  selectedTime = 'day';
}
