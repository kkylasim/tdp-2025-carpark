import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [MatButtonToggleModule, CommonModule],
  templateUrl: './toggle.html',
  styleUrl: './toggle.scss'
})
export class Toggle {
  @Input() options: { label: string; value: string }[] = []; 
  @Input() selected: string = 'false';
  @Output() selectedChange = new EventEmitter<string>();

  onSelectionChange(value: string) {
    this.selectedChange.emit(value);
  }
}
