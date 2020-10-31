import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  usersRef: AngularFireList<any>;
  users$: Observable<any[]>;
  selectedUserName: string;
  selectedUserExpectedPassword: string;
  selectedUserEnterdPassword: string;
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.selectedUserEnterdPassword) {
      this.onLogin();
    }
  }

  constructor(private router: Router, private db: AngularFireDatabase) {
    this.usersRef = db.list('users');
    this.users$ = this.usersRef.valueChanges();
  }

  onButtonClick(name: string, password: string): void {
    this.selectedUserName = name;
    this.selectedUserExpectedPassword = password;
    setTimeout(() => document.getElementById('password').focus(), 0);
  }

  onLogin(): void {
    if (this.selectedUserEnterdPassword === this.selectedUserExpectedPassword) {
      document.removeEventListener('keypress', () => {});
      this.router.navigate([`/user/${this.selectedUserName}`]);
    } else {
      document.getElementById('loginError').innerHTML = 'nieprawidłowe hasło';
    }
  }

  onInputChange(password: string): void {
    this.selectedUserEnterdPassword = password;
    document.getElementById('loginError').innerHTML = '';
  }
}
