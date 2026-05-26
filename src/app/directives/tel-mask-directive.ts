import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTelMaskDirective]',
})
export class TelMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('ionInput', ['$event'])
  onInput(event: any) {
    let value = event.target.value;

    if (!value) return;

    value = value.replace(/\D/g, '');

    value = value.substring(0, 11);

    if (value.length > 10) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
    }

    this.el.nativeElement.value = value;
  }
}
