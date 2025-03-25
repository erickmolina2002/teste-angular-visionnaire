import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() lastPage = 1;
  @Output() pageChanged = new EventEmitter<number>();

  pagesToShow = computed(() => {
    const pages = [];
    let start = Math.max(1, this.currentPage - 2);
    let end = Math.min(this.lastPage, this.currentPage + 2);

    if (this.lastPage > 5) {
      if (this.currentPage <= 3) {
        start = 1;
        end = 5;
      } else if (this.currentPage >= this.lastPage - 2) {
        start = this.lastPage - 4;
        end = this.lastPage;
      }
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < this.lastPage) {
      if (end < this.lastPage - 1) pages.push('...');
      pages.push(this.lastPage);
    }

    return pages;
  });

  changePage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.lastPage) {
      this.pageChanged.emit(page);
    }
  }
}