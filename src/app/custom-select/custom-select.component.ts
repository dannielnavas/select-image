import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss'],
})
export class CustomSelectComponent {
  @Input() options: any;
  @Input() title!: string;
  @Output() currentValueChange = new EventEmitter();

  currentValue!: { name: string; value: string; img: string };
  dropdownOpen: boolean = false;
  get dropdownElement(): Element {
    return this.elem.nativeElement.querySelector('.dropdown-list');
  }

  private currentIndex = -1;

  constructor(private elem: ElementRef) {}

  ngOnInit(): void {
    this.currentValue = this.options[0];
  }

  handleKeyboardEvents($event: KeyboardEvent) {
    if (this.dropdownOpen) {
      $event.preventDefault();
    } else {
      return;
    }
    if ($event.code === 'ArrowUp') {
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      } else if (this.currentIndex > 0) {
        this.currentIndex--;
      }
      this.elem.nativeElement
        .querySelectorAll('li')
        .item(this.currentIndex)
        .focus();
    } else if ($event.code === 'ArrowDown') {
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      } else if (this.currentIndex < this.options.length - 1) {
        this.currentIndex++;
      }
      this.elem.nativeElement
        .querySelectorAll('li')
        .item(this.currentIndex)
        .focus();
    } else if (
      ($event.code === 'Enter' || $event.code === 'NumpadEnter') &&
      this.currentIndex >= 0
    ) {
      this.selectByIndex(this.currentIndex);
    } else if ($event.code === 'Escape') {
      this.closeDropdown();
    }
  }
  closeDropdown() {
    this.dropdownElement.setAttribute('aria-expanded', 'false');
    this.currentIndex = -1;
    this.dropdownOpen = false;
  }

  selectByIndex(i: number) {
    let value = this.options[i];
    this.select(value);
  }

  select(value: { name: string; value: string; img: string }) {
    this.currentValue = value;
    this.closeDropdown();
    this.currentValueChange.emit(this.currentValue);
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.dropdownElement.setAttribute(
      'aria-expanded',
      this.dropdownOpen ? 'true' : 'false'
    );
  }
}
