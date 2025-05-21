import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feature-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-card.component.html',
  styleUrl: './feature-card.component.scss'
})
export class FeatureCardComponent {
  @Input() icon = '';
  @Input() title = '';
  @Input() description = '';
  @Input() variant: 'default' | 'center' | 'bordered' | 'minimal' = 'default';
}