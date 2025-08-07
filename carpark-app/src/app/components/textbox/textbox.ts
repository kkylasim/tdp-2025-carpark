import {Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';

const url = environment.supabaseUrl;
const key = environment.supabaseKey;

@Component({
  selector: 'app-textbox',
  standalone: true,
  imports: [ FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule],
  templateUrl: './textbox.html',
  styleUrls: ['./textbox.scss']
})
export class Textbox implements OnInit {
  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  options: string[] = [];

  @Output() nameChange = new EventEmitter<string>();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch carpark names
    this.http.get<any[]>(`${url}/api/carparks`).subscribe({
      next: data => {
        this.options = data.map(item => item.name);

        // Only after data is fetched, set up filtering
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || ''))
        );
      },
      error: err => {
        console.error('Failed to load carpark options:', err);
      }
    });

    this.myControl.valueChanges.subscribe(value => {
      this.nameChange.emit(value || '');
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}