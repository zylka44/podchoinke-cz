import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  usersRef: AngularFireList<User>;
  users$: Observable<User[]>;
  user$: Observable<User>;
  otherUsers$: Observable<User[]>;
  name: string;

  constructor(private router: Router, private db: AngularFireDatabase) {
    this.usersRef = db.list('users');
    this.users$ = this.usersRef.valueChanges();
  }

  ngOnInit(): void {
    this.name = this.router.url.split('/')[2];
    this.user$ = this.users$.pipe(
      map((users) => users.find((user) => user.name === this.name))
    );
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
