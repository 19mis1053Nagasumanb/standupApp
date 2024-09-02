import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css'] // Ensure this file contains the CSS provided

})
export class EntryListComponent implements OnInit {
  entries: any[] = [];

  constructor(private entryService: EntryService) {}

  ngOnInit() {
    this.fetchEntries();
  }

  fetchEntries() {
    this.entryService.getEntries().subscribe(
      response => {
        this.entries = response;
      },
      error => {
        console.error('Error fetching entries:', error);
        // Handle error
      }
    );
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.entryService.deleteEntry(id).subscribe(
        response => {
          console.log('Entry deleted successfully:', response);
          this.fetchEntries();
        },
        error => {
          console.error('Error deleting entry:', error);
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
