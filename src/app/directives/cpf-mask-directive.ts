import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCpfMask]',
})
export class CpfMaskDirective {
  constructor(private el: ElementRef) {}

  @HostListener('ionInput', ['$event'])
  onInput(event: any) {
    let value = event.target.value;

    if (!value) return;

    value = value.replace(/\D/g, '');

    value = value.substring(0, 11);

    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    this.el.nativeElement.value = value;
  }
}
