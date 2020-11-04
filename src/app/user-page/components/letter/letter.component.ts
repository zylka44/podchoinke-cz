import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.component.html',
  styleUrls: ['./letter.component.scss'],
})
export class LetterComponent implements OnInit {
  @Input() user: any;
  emptyUser = {
    name: '',
    fullName: '',
    password: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
