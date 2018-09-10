import { Directive, Input, OnInit, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTimeDots]'
})
export class TimeDotsDirective implements OnInit {
  private el: HTMLInputElement;
  private inputValue: any = '';
  private maxLength = 5;
  @Input() appTimeDots: string;

  constructor(
    private elementRef: ElementRef,
  ) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    console.log('====================================');
    console.log('Directive was inited!');
    console.log('====================================');
  }

  @HostListener('keyup', ['$event.target.value'])
  onChange(value: string) {
    let sValuse = value;
    if (this.baseValidator(sValuse)) {
      sValuse = this.addSign(sValuse);
      const hasSplitter = new RegExp('^([0-9]{2}\:)').test(sValuse);

      this.inputValue = sValuse;
    }
    this.el.value = this.inputValue;
  }

  baseValidator(sValuse): boolean {
    // validation
    const isMaxLength = sValuse.length <= this.maxLength;
    const isEmpty = sValuse === '';

    // result
    return isMaxLength && (isEmpty || this.isDigits(sValuse));
  }

  isTimeValid(value: string): boolean {
    const maxTime = 23;
    return Number(value) <= maxTime;
  }

  isMinutvalaid(value: string): boolean {
    const maxMinutes = 60;
    return value <= <any> maxMinutes;
  }

  addSign(value: string): string {
    const tValue = value;
    const hasDots = value.indexOf(':');
    const hasTime = 2;

    return tValue.length === hasTime && hasDots === -1 ? tValue + ':' : tValue;
  }

  isDotsExist(value: string): boolean {
    const hasDots = value.split(':');
    const maxSize = 2;
    return hasDots.length <= maxSize;
  }

  isPattern(value): boolean {
    const rule = '^(?=([0-2]))(?=([0-9]{2}))([0-9]{2})(\:)?(?=([0-5]))(?=([0-9]{2}))([0-9]{2})$';
    return new RegExp(rule).test(value);
  }

  isDigits(value: string): boolean {
    const timeList = value.split(':');
    const maxHr = 24;
    const maxMin = 60;
    const hrValidation = '^(?=([0-2]))';
    const minValidation = '^(?=([0-5]))';

    if (timeList.length > 1) {
      return this.timeValidation(timeList[0], maxHr, hrValidation) && this.timeValidation(timeList[1], maxMin, minValidation);
    } else {
      return this.timeValidation(timeList[0], maxHr, hrValidation);
    }
  }

  timeValidation(value, maxValue, validationRule): boolean {
    if (value === '') {
      return true;
    }
    const validationResult = new RegExp(validationRule).test(value);
    const maxValid = value < maxValue;
    return validationResult ? maxValid : false;
  }


}
