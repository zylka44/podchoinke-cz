import { Component, HostListener, Input } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent {
  @Input() letterOwner: User;
  @Input() currentUser: User;
  newGiftDescription = '';
  newGiftLink = '';
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.newGiftDescription.length > 0) {
      this.onAddButtonClick();
    }
  }

  constructor(private usersService: UsersService) {}

  onAddGiftKey(event): void {
    this.newGiftDescription = event.target.value;
  }

  onAddLinkKey(event): void {
    this.newGiftLink = event.target.value;
  }

  onAddButtonClick(): void {
    if (this.newGiftDescription.length <= 0) {
      return;
    }

    this.usersService.addGift(this.letterOwner.key, {
      description: this.newGiftDescription,
      link: this.newGiftLink,
      reservation: '',
    });
    document.getElementById('addGift')[`value`] = '';
    document.getElementById('addLink')[`value`] = '';
  }

  onRemoveButtonClick(giftKey: string): void {
    this.usersService.removeGift(this.letterOwner.key, giftKey);
  }

  onLinkClick(link: string): void {
    window.open(link, '_blank');
  }

  onReserveClick(giftKey: string, currentReservation: string): void {
    if (currentReservation.split(',').includes(this.currentUser.name)) {
      return;
    } else {
      const updateReservation =
        currentReservation + ',' + this.currentUser.name;
      this.usersService.updateGiftReservation(
        this.letterOwner.key,
        giftKey,
        updateReservation
      );
    }
  }

  onReservationNameClick(
    reservation: string,
    giftKey: string,
    currentReservation: string
  ): void {
    if (this.currentUser.name !== reservation) {
      return;
    } else {
      const splitUpdateReservation = this.splitReservation(currentReservation);
      splitUpdateReservation.splice(
        splitUpdateReservation.findIndex((r) => r === reservation),
        1
      );
      const updateReservation = splitUpdateReservation.join(',');
      this.usersService.updateGiftReservation(
        this.letterOwner.key,
        giftKey,
        updateReservation
      );
    }
  }

  splitReservation(reservation: string): string[] {
    return reservation.split(',');
  }

  ifCurentUserIsOwner(): boolean {
    return this.letterOwner?.key === this.currentUser?.key;
  }
}
