import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-animated-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animated-counter.component.html',
  styleUrl: './animated-counter.component.scss'
})
export class AnimatedCounterComponent implements OnInit {
  @Input() targetValue = 0;
  @Input() duration = 2000;
  @Input() suffix = '';
  @Input() prefix = '';
  @Input() useComma = false;
  
  @ViewChild('counterElement', { static: true }) counterElement!: ElementRef;
  
  constructor() {}
  
  ngOnInit() {
    this.initCounter();
  }
  
  private initCounter() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCount();
          observer.unobserve(this.counterElement.nativeElement);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(this.counterElement.nativeElement);
  }
  
  private animateCount() {
    const startTime = performance.now();
    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1);
      const easedProgress = this.easeOutCubic(progress);
      const currentValue = Math.floor(easedProgress * this.targetValue);
      
      this.counterElement.nativeElement.textContent = this.useComma 
        ? this.formatWithCommas(currentValue) 
        : `${this.prefix}${currentValue}`;
      
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        this.counterElement.nativeElement.textContent = this.useComma 
          ? this.formatWithCommas(this.targetValue) 
          : `${this.prefix}${this.targetValue}`;
      }
    };
    
    requestAnimationFrame(updateCount);
  }
  
  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3);
  }
  
  private formatWithCommas(value: number): string {
    return `${this.prefix}${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }
}