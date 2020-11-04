import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Gift, User } from './models/users';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users$: AngularFireList<any>;
  constructor(private db: AngularFireDatabase) {
    this.users$ = this.db.list('users');
  }

  getUsers(): Observable<any> {
    return this.users$.valueChanges();
  }

  getUserOfName(name: string): Observable<User> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.name === name))
    );
  }

  addUser(user: User): void {
    this.users$.push(user);
  }

  updateUser(key: string, user: User): void {
    this.users$.update(key, user);
  }

  deleteUser(key: string): void {
    this.users$.remove(key);
  }

  deleteAllUsers(): void {
    this.users$.remove();
  }

  addGift(key: string, gift: Gift): void {
    this.users$.update(key, { gifts: [gift] });
  }

  updateGifts(key: string, gifts: string): void {
    this.users$.update(key, { name: 'sth' });
  }
}
