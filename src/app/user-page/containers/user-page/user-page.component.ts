import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
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
  user$: Observable<User>;
  otherUsers$: Observable<User[]>;
  name: string;

  constructor(private router: Router, private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
    this.name = this.router.url.split('/')[2];
    this.user$ = this.usersService.getUserOfName(this.name);
    this.user$.subscribe(console.log);
    this.otherUsers$ = this.users$.pipe(
      map((users) => users.filter((user) => user.name !== this.name))
    );
  }

  onLogOut(): void {
    this.router.navigate([`/login`]);
  }

  onOwnerButtonClick(owner: string): void {
    console.log(owner);
  }
}
