import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { PhoneService } from '../../../shared/services/phone.service';
import { Phone } from '../../../shared/models/phone';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { PhoneMaskPipe } from "../../../shared/pipes/phone-mask.pipe";
@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [CommonModule, RouterLink, PaginationComponent, PhoneMaskPipe],
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss']
})
export class PhoneListComponent implements OnInit {
  private phoneService = inject(PhoneService);
  private destroyRef = inject(DestroyRef);
  
  phones: Phone[] = [];
  currentPage = 1;
  lastPage = 1;
appPhoneMask: any;

  ngOnInit(): void {
    this.loadPhones();
  }

  loadPhones(): void {
    this.phoneService.getPhones(this.currentPage)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.phones = response.data;
          this.currentPage = response.meta.current_page;
          this.lastPage = response.meta.last_page;
        },
        error: (err) => console.error(err)
      });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadPhones();
  }

  deletePhone(id: number): void {
    if (confirm('Tem certeza que deseja excluir?')) {
      this.phoneService.deletePhone(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.loadPhones());
    }
  }
  
}