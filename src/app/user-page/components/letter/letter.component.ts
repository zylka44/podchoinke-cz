import { Component, HostListener, Input } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/users.service';

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
    document.getElementById('addGift').focus();
  }

  onRemoveButtonClick(giftKey: string): void {
    this.usersService.removeGift(this.letterOwner.key, giftKey);
  }

  onLinkClick(link: string): void {
    window.open(link, '_blank');
  }

  onReserveClick(giftKey: string): void {
    console.log(this.currentUser.name);
    this.usersService.updateGiftReservation(
      this.letterOwner.key,
      giftKey,
      this.currentUser.name
    );
  }
}
