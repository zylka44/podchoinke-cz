import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  users = ['tata', 'mama', 'mariusz', 'zaneta', 'marek', 'damian', 'maciek'];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onButtonClick(name: string): void {
    this.router.navigate([`/user/${name}`]);
  }
}
