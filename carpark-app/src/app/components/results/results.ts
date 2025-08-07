import {ChangeDetectionStrategy, Component, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results',
  templateUrl: './results.html',
  standalone: true,
  styleUrls: ['./results.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Results {
  accordion = viewChild.required(MatAccordion);
  readonly panelOpenState = signal(false);
  items = [
    { title: 'Result 1', description: 'Description for result 1', content: 'Details of result 1' },
    { title: 'Result 2', description: 'Description for result 2', content: 'Details of result 2' },
    { title: 'Result 3', description: 'Description for result 3', content: 'Details of result 3' },
  ];
}
