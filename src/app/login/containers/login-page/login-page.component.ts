import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  users$: Observable<User[]> = this.usersService.getUsers();
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

  ngOnInit(): void {
    // this.usersService.setAccess(null);
  }

  onUserButtonClick(name: string, password: string): void {
    this.selectedUserName = name;
    this.selectedUserExpectedPassword = password;
    setTimeout(() => document.getElementById('password').focus(), 0);
  }

  onLogin(): void {
    if (this.selectedUserEnterdPassword === this.selectedUserExpectedPassword) {
      this.usersService.setAccess(this.selectedUserName);
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
