import { Injectable } from '@angular/core';
import { AnimationBuilder, style, animate } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  constructor(private animationBuilder: AnimationBuilder) {}
  
  scrollToElement(elementId: string, duration: number = 1000) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const start = window.scrollY;
    const target = element.getBoundingClientRect().top + start;
    const change = target - start;
    let startTime: number;
    
    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeInOut = this.easeInOutCubic(percentage);
      
      window.scrollTo(0, start + change * easeInOut);
      
      if (progress < duration) {
        window.requestAnimationFrame(animateScroll);
      }
    };
    
    window.requestAnimationFrame(animateScroll);
  }
  
  private easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  
  fadeInAnimation(element: HTMLElement, duration: number = 500) {
    const animation = this.animationBuilder.build([
      style({ opacity: 0 }),
      animate(`${duration}ms ease-in`, style({ opacity: 1 }))
    ]);
    
    const player = animation.create(element);
    player.play();
  }
}
