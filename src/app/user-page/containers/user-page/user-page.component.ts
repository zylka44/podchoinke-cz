import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  users$: Observable<User[]>;
  name: string;
  user$: Observable<User>;
  letterOwner$: Observable<User>;
  userFullName$: Observable<string>;
  otherUsers$: Observable<User[]>;

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
    this.letterOwner$ =
      userKey === 'currentUser'
        ? this.usersService.getUserOfName(this.name)
        : this.usersService.getUserOfKey(userKey);
  }
}
