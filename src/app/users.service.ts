import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from './models/users';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  usersRef: AngularFireList<User>;
  users$: Observable<User[]>;

  constructor(private db: AngularFireDatabase) {}

  getUsers(): Observable<any> {
    return this.db.list('users').valueChanges();
  }

  getUserOfName(name: string) {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.name === name))
    );
  }
}
