import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); 
    
    if (value.length > 2) {
      value = `+${value.substring(0, 2)} ${value.substring(2, 4)} ${value.substring(4, 9)}-${value.substring(9, 13)}`;
    } else if (value.length > 0) {
      value = `+${value}`;
    }

    input.value = value;
  }

  @HostListener('keydown.backspace', ['$event']) onBackspace(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    if (event.key === 'Backspace' && input.value.length === 4) {
      event.preventDefault();
    }
  }
}