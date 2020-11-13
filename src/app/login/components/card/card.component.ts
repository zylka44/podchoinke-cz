import { Component, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users.service';
import { User } from 'src/app/models/users';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() users: User[];
  selectedUserName: string;
  selectedUserExpectedPassword: string;
  selectedUserEnterdPassword: string;

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.selectedUserEnterdPassword) {
      this.onLogin();
    }
  }

  constructor(private router: Router, private usersService: UsersService) {}

  onUserButtonClick(name: string, password: string): void {
    this.selectedUserName = name;
    this.selectedUserExpectedPassword = password;
    setTimeout(() => document.getElementById('password').focus(), 0);
  }

  onLogin(): void {
    const finddSelectedUser = this.users.filter(
      (user) => user.name === this.selectedUserName
    );

    if (finddSelectedUser.length === 0) {
      document.getElementById('loginError').innerHTML = 'nieprawidłowy login';
    } else {
      this.selectedUserExpectedPassword = this.users.find(
        (user) => user.name === this.selectedUserName
      ).password;

      if (
        this.selectedUserEnterdPassword === this.selectedUserExpectedPassword
      ) {
        this.usersService.setAccess(this.selectedUserName);
        this.router.navigate([`/user/${this.selectedUserName}`]);
      } else {
        document.getElementById('loginError').innerHTML = 'nieprawidłowe hasło';
      }
    }
  }

  onLoginInputChange(login: string): void {
    this.selectedUserName = login;
  }

  onPasswordInputChange(password: string): void {
    this.selectedUserEnterdPassword = password;
    document.getElementById('loginError').innerHTML = '';
  }
}
