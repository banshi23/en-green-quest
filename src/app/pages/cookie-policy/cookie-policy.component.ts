import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cookie-policy.component.html',
  styleUrl: './cookie-policy.component.scss'
})
export class CookiePolicyComponent implements OnInit {
  lastUpdated = 'January 15, 2025';
  
  constructor() {}
  
  ngOnInit() {}
}