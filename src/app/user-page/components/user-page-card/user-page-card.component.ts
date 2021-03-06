import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-user-page-card',
  templateUrl: './user-page-card.component.html',
  styleUrls: ['./user-page-card.component.scss'],
})
export class UserPageCardComponent implements OnInit {
  users$: Observable<User[]>;
  name: string;
  user$: Observable<User>;
  letterOwner$: Observable<User>;
  userFullName$: Observable<string>;
  otherUsers$: Observable<User[]>;
  currentLetterOwner = 'currentUser';

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.name = this.router.url.split('/')[2];
    this.user$ = this.usersService.getUserOfName(this.name);
    this.users$ = this.usersService.getUsers();
    this.userFullName$ = this.user$.pipe(map((user) => user.fullName));
    this.otherUsers$ = this.users$.pipe(
      map((users) => users.filter((user) => user.name !== this.name))
    );
    this.letterOwner$ = this.user$;
  }

  onLogOut(): void {
    this.router.navigate([`/login`]);
  }

  onOwnerButtonClick(userKey: string): void {
    this.currentLetterOwner = userKey;
    this.letterOwner$ =
      userKey === 'currentUser'
        ? this.usersService.getUserOfName(this.name)
        : this.usersService.getUserOfKey(userKey);
  }
}
