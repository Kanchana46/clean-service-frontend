import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-card-header',
  templateUrl: './emp-card-header.component.html',
  styleUrls: ['./emp-card-header.component.scss']
})
export class EmpCardHeaderComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  

}
