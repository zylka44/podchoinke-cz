import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  users$: Observable<User[]>;
  selectedUserName: string;
  selectedUserExpectedPassword: string;
  selectedUserEnterdPassword: string;
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Enter' && this.selectedUserEnterdPassword) {
      this.onLogin();
    }
  }

  constructor(private router: Router, private usersService: UsersService) {
    this.usersService.removeGift('MLJaaWgwxRgHtg6xyDr', '1');
  }

  ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
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
