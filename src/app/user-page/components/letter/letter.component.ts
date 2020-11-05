import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent {
  @Input() user: any;
  emptyUser: User = {
    name: '',
    fullName: '',
    password: '',
    gifts: [
      {
        description: '',
        link: '',
        reservation: '',
      },
    ],
  };
  newGiftDescription: string;

  constructor(private usersService: UsersService) {}

  onKey(event): void {
    this.newGiftDescription = event.target.value;
  }

  onAddButtonClick(): void {
    // this.usersService.addGift(user.key, {
    //   description: this.newGiftDescription,
    //   link: 'http',
    //   reservation: ''
    // })
  }
}
