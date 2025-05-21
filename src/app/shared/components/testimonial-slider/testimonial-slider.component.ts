import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  image: string;
}

@Component({
  selector: 'app-testimonial-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-slider.component.html',
  styleUrl: './testimonial-slider.component.scss'
})
export class TestimonialSliderComponent implements AfterViewInit {
  @Input() testimonials: Testimonial[] = [];
  @Input() autoPlay = true;
  @Input() interval = 5000;
  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  
  currentSlide = 0;
  dots: number[] = [];
  private autoPlayInterval: any;
  
  ngAfterViewInit() {
    this.dots = Array(this.testimonials.length).fill(0).map((_, i) => i);
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }
  
  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
    this.resetAutoPlay();
  }
  
  nextSlide() {
    if (this.currentSlide < this.testimonials.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.resetAutoPlay();
  }
  
  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoPlay();
  }
  
  private startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, this.interval);
  }
  
  private resetAutoPlay() {
    if (this.autoPlay) {
      clearInterval(this.autoPlayInterval);
      this.startAutoPlay();
    }
  }
  
  ngOnDestroy() {
    clearInterval(this.autoPlayInterval);
  }
}