import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Gift, User } from 'src/app/models/users';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent {
  users$: Observable<User[]> = this.usersService.getUsers();
  name = this.router.url.split('/')[2];
  user$: Observable<User> = this.usersService.getUserOfName(this.name);
  userFullName$: Observable<string> = this.user$.pipe(
    map((user) => user.fullName)
  );
  userKey$: Observable<string> = this.user$.pipe(map((user) => user.key));
  otherUsers$: Observable<User[]> = this.users$.pipe(
    map((users) => users.filter((user) => user.name !== this.name))
  );

  constructor(private router: Router, private usersService: UsersService) {}

  onLogOut(): void {
    this.router.navigate([`/login`]);
  }

  onOwnerButtonClick(owner: string): void {
    console.log(owner);
  }
}
