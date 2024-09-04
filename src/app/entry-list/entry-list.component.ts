import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  entries = [
    { name: 'Entry 1', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Entry 2', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Entry 3', date: '2024-09-03', time: '12:00', status: 'Pending' },
    { name: 'Entry 4', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Entry 5', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Entry 6', date: '2024-09-03', time: '12:00', status: 'Pending' },
    { name: 'Entry 7', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Entry 8', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Entry 9', date: '2024-09-03', time: '12:00', status: 'Pending' },
    { name: 'Entry 10', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Entry 11', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Entry 12', date: '2024-09-03', time: '12:00', status: 'Pending' },
    // Add more entries as needed
  ];
  filteredEntries = [...this.entries]; // Copy of entries to filter
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  // Search input fields
  searchName = '';
  searchDate = '';
  searchStatus = '';
  paginatedEntries: { name: string; date: string; time: string; status: string; }[] | undefined;

  ngOnInit() {
    this.calculateTotalPages();
    this.updatePaginatedEntries();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.filteredEntries.length / this.itemsPerPage);
  }

  updatePaginatedEntries() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEntries = this.filteredEntries.slice(startIndex, endIndex);
  }

  filterEntries() {
    this.filteredEntries = this.entries.filter(entry =>
      (this.searchName ? entry.name.toLowerCase().includes(this.searchName.toLowerCase()) : true) &&
      (this.searchDate ? entry.date.includes(this.searchDate) : true) &&
      (this.searchStatus ? entry.status.toLowerCase().includes(this.searchStatus.toLowerCase()) : true)
    );
    this.calculateTotalPages();
    this.currentPage = 1; // Reset to the first page after filtering
    this.updatePaginatedEntries();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedEntries();
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEntries();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEntries();
    }
  }
}
