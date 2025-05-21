import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective implements OnInit {
  @Input() animationClass = 'animate-fade-in';
  @Input() delay = 0;
  @Input() threshold = 0.1;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  ngOnInit() {
    this.initAnimation();
  }
  
  private initAnimation() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
            this.renderer.addClass(this.el.nativeElement, this.animationClass);
          }, this.delay);
          observer.unobserve(this.el.nativeElement);
        }
      });
    }, { threshold: this.threshold });
    
    observer.observe(this.el.nativeElement);
  }
}