import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/users';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  users$: Observable<User[]> = this.usersService.getUsers();

  constructor(private usersService: UsersService) {}
}
