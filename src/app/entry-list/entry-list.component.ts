import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent implements OnInit {
  entries = [
    { name: 'Task 1', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Task 2', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Task 3', date: '2024-09-03', time: '12:00', status: 'Pending' },
    { name: 'Task 4', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Task 5', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Task 6', date: '2024-09-03', time: '12:00', status: 'Pending' },
    { name: 'Task 7', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Task 8', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Task 9', date: '2024-09-03', time: '12:00', status: 'Pending' },
    { name: 'Task 10', date: '2024-09-01', time: '10:00', status: 'Pending' },
    { name: 'Task 11', date: '2024-09-02', time: '11:00', status: 'Completed' },
    { name: 'Task 12', date: '2024-09-03', time: '12:00', status: 'Pending' },
  ];
  filteredEntries = [...this.entries]; // Copy of entries to filter
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 0;

  // Search input 
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
  confirmDelete(entry: { name: string; date: string; time: string; status: string; }, index: number) {
    const confirmation = window.confirm(`Are you sure you want to delete the entry "${entry.name}"?`);
    if (confirmation) {
      this.deleteEntry(index);
    }
  }
  
  deleteEntry(index: number) {
    const actualIndex = (this.currentPage - 1) * this.itemsPerPage + index; // Calculate the actual index in entries array
    this.entries.splice(actualIndex, 1); // Remove entry from the original array
    this.filterEntries(); // Re-filter and update the paginated entries
  }
  
}
