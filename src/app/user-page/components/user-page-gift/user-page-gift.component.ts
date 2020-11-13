import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gift } from 'src/app/models/users';

@Component({
  selector: 'app-user-page-gift',
  templateUrl: './user-page-gift.component.html',
  styleUrls: ['./user-page-gift.component.scss'],
})
export class UserPageGiftComponent {
  @Input() gift: Gift;
  @Input() isLetterOwners: boolean;
  @Output() onGiftRemoved = new EventEmitter();
  @Output() onGiftReserved = new EventEmitter();
  @Output() onLinkActivated = new EventEmitter();
  @Output() onReservationNameActivated = new EventEmitter<string>();

  onReserveButtonClick(): void {
    this.onGiftReserved.emit();
  }

  onRemoveButtonCLick(): void {
    this.onGiftRemoved.emit();
  }

  onLinkClick(): void {
    this.onLinkActivated.emit();
  }

  onReservationNameClick(reservation: string): void {
    this.onReservationNameActivated.emit(reservation);
  }

  splitReservation(reservation: string): string[] {
    return reservation.split(',');
  }
}
