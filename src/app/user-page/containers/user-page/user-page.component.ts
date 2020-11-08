import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: [ './user-page.component.scss' ],
})
export class UserPageComponent implements OnInit {
  users$: Observable<User[]>;
  name: string;
  user$: Observable<User>;
  userFullName$: Observable<string>;
  userKey$: Observable<string>;
  otherUsers$: Observable<User[]>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {
  }

  onLogOut(): void {
    this.router.navigate([ `/login` ]);
  }

  onOwnerButtonClick(ownerKey: string): void {
    console.log(ownerKey);
  }

  ngOnInit(): void {
    this.name = this.router.url.split('/')[2];
    this.user$ = this.usersService.getUserOfName(this.name);
    this.users$ = this.usersService.getUsers();
    this.userFullName$ = this.user$.pipe(map((user) => user.fullName));
    this.userKey$ = this.user$.pipe(map((user) => user.key));
    this.otherUsers$ = this.users$.pipe(
      map((users) => users.filter((user) => user.name !== this.name))
    );
  }

}
