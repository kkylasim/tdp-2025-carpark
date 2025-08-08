import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environment';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './button.html',
  styleUrls: ['./button.scss'] 
})
export class Button {
  constructor(private http: HttpClient) {}

  @Input() name: string = '';
  @Input() region: string = '';
  @Input() nightParking: string = 'false';

  @Output() results = new EventEmitter<any[]>();

  onSearch() {
    console.log('[Button] onSearch clicked:', this.name, this.region, this.nightParking);
    this.fetchFilteredCarparks({
      name: this.name,
      region: this.region,
      nightParking: this.nightParking
    });
  }

  fetchFilteredCarparks(filters: { name?: string; region?: string; nightParking?: string }) {
    let params = new HttpParams();

    if (filters.name) {
      params = params.set('name', filters.name);
    }
    if (filters.region) {
      params = params.set('region', filters.region);
    }
    if (filters.nightParking !== undefined) {
      params = params.set('nightParking', String(filters.nightParking));
    }

    this.http.get<any[]>(`${environment.supabaseUrl}/api/carparks`, { params }).subscribe({
      next: data => {
        console.log('Filtered carparks:', data);
        this.results.emit(data);
      },
      error: err => {
        console.error('Failed to fetch carparks:', err);
      }
    });
  }
}