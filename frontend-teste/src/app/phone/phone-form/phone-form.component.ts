import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhoneService } from '../../shared/services/phone.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Phone } from '../../models/phone';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-phone-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './phone-form.component.html'
})
export class PhoneFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private phoneService = inject(PhoneService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  
  phoneForm = this.fb.group({
    value: ['', [
      Validators.required,
      Validators.pattern(/^\+\d{2} \d{2} \d{4,5}-\d{4}$/)
    ]],
    monthlyPrice: ['', [Validators.required, Validators.min(0)]],
    setupPrice: ['', [Validators.required, Validators.min(0)]],
    currency: ['BRL', Validators.required]
  });

  mode: 'view' | 'edit' | 'create' = 'create';
  phoneId?: number;
  loading = true;
  formError = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.initializeMode(params);
      this.loadPhoneDataIfNeeded();
      this.handleFormState();
    });
  }

  goBack(): void {
    this.router.navigate(['/'], {
      queryParams: { 
        page: this.route.snapshot.queryParams['page'] || 1 
      }
    });}

  private initializeMode(params: any): void {
    if (params['id']) {
      this.mode = this.router.url.includes('/view') ? 'view' : 'edit';
      this.phoneId = +params['id'];
    } else {
      this.mode = 'create';
    }
  }
 
  private loadPhoneDataIfNeeded(): void {
    if (this.phoneId) {
      this.loading = true;
      this.phoneService.getPhone(this.phoneId)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((err: HttpErrorResponse) => {
            this.handleError(err);
            return throwError(() => err);
          })
        )
        .subscribe(phone => {
          this.phoneForm.patchValue(phone);
          this.loading = false;
        });
    } else {
      this.loading = false;
    }
  }

  private handleFormState(): void {
    if (this.mode === 'view') {
      this.phoneForm.disable();
    } else {
      this.phoneForm.enable();
    }
  }

  private handleError(err: HttpErrorResponse): void {
    this.loading = false;
    if (err.status === 404) {
      this.formError = 'Número não encontrado';
      setTimeout(() => this.router.navigate(['/']), 2000);
    } else {
      this.formError = 'Erro ao carregar dados';
    }
  }

  onSubmit(): void {
    if (this.phoneForm.invalid || this.mode === 'view') return;

    const phoneData = this.phoneForm.value as Phone;
    const operation = this.mode === 'edit' 
      ? this.phoneService.updatePhone(this.phoneId!, phoneData)
      : this.phoneService.createPhone(phoneData);

    operation
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err: HttpErrorResponse) => {
          this.handleSubmitError(err);
          return throwError(() => err);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  private handleSubmitError(err: HttpErrorResponse): void {
    if (err.status === 422 && err.error.errors) {
      const serverErrors = err.error.errors;
      Object.keys(serverErrors).forEach(field => {
        const control = this.phoneForm.get(field);
        if (control) {
          control.setErrors({ serverError: serverErrors[field][0] });
        }
      });
    } else {
      this.formError = 'Erro ao salvar dados';
    }
  }
}