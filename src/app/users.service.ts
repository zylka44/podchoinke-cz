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
    return this.users$
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getUserOfKey(key: string): Observable<User> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.key === key))
    );
  }

  getUserOfName(name: string): Observable<User> {
    return this.getUsers().pipe(
      map((users) => users.find((user) => user.name === name))
    );
  }

  addUser(name: string, fullName: string, password: string): void {
    const newUser = { name, fullName, password, gifts: '' };
    this.users$.push(newUser);
  }

  updateUserPassword(key: string, password: string): void {
    this.users$.update(key, { password });
  }

  removeUser(key: string): void {
    this.users$.remove(key);
  }

  removeAllUsers(): void {
    this.users$.remove();
  }

  addGift(key: string, gift: Gift): void {
    this.db.list(`users/${key}/gifts`).push(gift);
  }

  removeGift(key: string, giftKey: string): void {
    this.db.list(`users/${key}/gifts`).remove(giftKey);
  }

  updateGifts(key: string, gifts: Gift[]): void {
    this.users$.update(key, { gifts: [...gifts] });
  }
}
