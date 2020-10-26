import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  name: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.name = this.router.url.split('/')[2].toUpperCase();
  }

  onLogOut(): void {
    this.router.navigate([`/login`]);
  }
}
