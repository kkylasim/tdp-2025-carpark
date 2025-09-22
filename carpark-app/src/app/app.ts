import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Textbox } from './components/textbox/textbox';
import { Toggle } from './components/toggle/toggle';
import { Results } from './components/results/results';
import { Button } from './components/button/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Textbox, Toggle, Results, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('carpark-app');
  regionOptions = [
    { label: '-', value: '' },
    { label: 'North', value: 'North' },
    { label: 'Central', value: 'Central' },
    { label: 'South', value: 'South' },
    { label: 'East', value: 'East' },
    { label: 'Northeast', value: 'Northeast' }
  ];
  toggleOptions = [
    { label: 'Night', value: 'true' },
    { label: 'Any', value: 'false' },
  ];
  selectedName: string = '';
  selectedRegion: string = '';
  selectedNight: string = 'false';

  onNameChange(name: string) {
    this.selectedName = name;
  }

  onRegionChange(region: string) {
    this.selectedRegion = region;
  }

  onNightChange(night: string) {
    this.selectedNight = night;
  }

  carparkResults: any[] = [];

  onResults(data: any[]) {
    this.carparkResults = [...data];
  }
}
