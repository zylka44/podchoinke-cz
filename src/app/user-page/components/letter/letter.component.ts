import { Component, HostListener, Input } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent {
  @Input() user: User;
  newGiftDescription: string;
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.newGiftDescription.length > 0) {
      this.onAddButtonClick();
    }
  }

  constructor(private usersService: UsersService) {}

  onKey(event): void {
    this.newGiftDescription = event.target.value;
  }

  onAddButtonClick(): void {
    this.usersService.addGift(this.user.key, {
      description: this.newGiftDescription,
      link: 'http',
      reservation: '',
    });
    document.getElementById('addGift')[`value`] = '';
    document.getElementById('addGift').focus();
  }

  onRemoveButtonClick(giftKey: string): void {
    this.usersService.removeGift(this.user.key, giftKey);
  }
}
