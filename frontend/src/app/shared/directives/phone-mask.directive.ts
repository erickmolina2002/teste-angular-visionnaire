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

    if (value.length > 13) {
      value = value.substring(0, 13);
    }

    let formatted = '';
    
    if (value.length > 2) {
      formatted = `+${value.substring(0, 2)} `;
      if (value.length > 4) {
        formatted += `${value.substring(2, 4)} `;
        if (value.length > 9) {
          formatted += `${value.substring(4, 9)}`;
          if (value.length > 9) {
            formatted += `-${value.substring(9, 13)}`;
          }
        } else {
          formatted += value.substring(4);
        }
      } else {
        formatted += value.substring(2);
      }
    } else {
      formatted += `${value}`;
    }

    if (input.selectionStart && input.selectionStart < formatted.length) {
      formatted = formatted.replace(/-$/, '');
    }

    input.value = formatted;
  }
}
