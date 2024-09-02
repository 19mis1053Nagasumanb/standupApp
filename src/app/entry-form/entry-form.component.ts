import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css'] // Ensure this file contains the CSS provided

})
export class EntryFormComponent {
  entry = {
    date: '',
    time: '',
    name: '',
    status: ''
  };

  constructor(private entryService: EntryService) {}

  onSubmit() {
    if (this.entry.date && this.entry.time && this.entry.name && this.entry.status) {
      this.entryService.addEntry(this.entry).subscribe(
        response => {
          console.log('Entry added successfully:', response);
          // Handle success
        },
        error => {
          console.error('Error adding entry:', error);
          // Handle error
        }
      );
    }
  }

  getDay(date: string): string {
    const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
    return day;
  }
}
