import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent implements OnInit {
  entry = {
    date: '',
    hours: 0,
    minutes: 0,   
    name: '',
    status: '',
    priority: '' // Added priority field

  };

  names: string[] = ['Chay', 'Nithin', 'Pradeep', 'Souji', 'Sathvika P', 'Shivu'];
  newName: string = '';
  addingNew: boolean = false;

  ngOnInit() {
    this.loadFormData();
  }

  loadFormData() {
    if (typeof window !== 'undefined') {
      const storedNames = localStorage.getItem('names');
      if (storedNames) {
        this.names = JSON.parse(storedNames);
      }

      const storedEntry = localStorage.getItem('entryForm');
      if (storedEntry) {
        this.entry = JSON.parse(storedEntry);
      }
    }
  }

  onNameChange(event: Event) {
    const selectedName = (event.target as HTMLSelectElement).value;
    this.addingNew = selectedName === 'addNew';
  }

  addNewName() {
    if (this.newName && !this.names.includes(this.newName)) {
      this.names.push(this.newName);
      this.entry.name = this.newName;
      this.newName = '';
      this.addingNew = false;
      if (typeof window !== 'undefined') {
        localStorage.setItem('names', JSON.stringify(this.names));
      }
    }
  }

  onSubmit() {
    console.log('Form submitted', this.entry);
    if (typeof window !== 'undefined') {
    }
  }

  saveFormData() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('entryForm', JSON.stringify(this.entry));
    }
  }

  getDay(date: string): string {
    if (date) {
      const day = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      return day;
    }
    return '';
  }
}
