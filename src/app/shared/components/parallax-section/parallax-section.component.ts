import { Component, Input, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parallax-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parallax-section.component.html',
  styleUrl: './parallax-section.component.scss'
})
export class ParallaxSectionComponent implements OnInit, OnDestroy {
  @Input() backgroundImage = '';
  @Input() height = 400;
  @Input() speed = 0.5;
  
  private scrollListener: (() => void) | undefined;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit() {
    this.initParallax();
  }
  
  ngOnDestroy() {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }
  
  private initParallax() {
    const updateParallax = () => {
      const rect = this.el.nativeElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      if (rect.bottom > 0 && rect.top < viewportHeight) {
        const scrollPosition = window.scrollY;
        const elementPosition = this.el.nativeElement.offsetTop;
        const distance = scrollPosition - elementPosition;
        const translateY = distance * this.speed;
        
        const parallaxBg = this.el.nativeElement.querySelector('.parallax-background');
        this.renderer.setStyle(parallaxBg, 'transform', `translateY(${translateY}px)`);
      }
    };
    
    this.scrollListener = updateParallax;
    window.addEventListener('scroll', this.scrollListener);
    updateParallax();
  }
}
