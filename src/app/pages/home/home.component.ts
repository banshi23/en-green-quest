import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  features = [
    {
      icon: 'fas fa-leaf',
      title: 'Verified Carbon Credits',
      description: 'All our carbon credits meet the highest industry standards and are independently verified for maximum impact.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Transparent Reporting',
      description: 'Track your carbon offset journey with detailed reports and real-time progress monitoring.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Customized Solutions',
      description: 'We create personalized sustainability strategies tailored to your organization\'s specific needs and goals.'
    },
    {
      icon: 'fas fa-globe-americas',
      title: 'Global Impact Projects',
      description: 'Support diverse environmental initiatives around the world, from reforestation to renewable energy.'
    },
    {
      icon: 'fas fa-certificate',
      title: 'ESG Compliance',
      description: 'Meet regulatory requirements and enhance your ESG profile with comprehensive reporting solutions.'
    },
    {
      icon: 'fas fa-users',
      title: 'Expert Consultation',
      description: 'Work with our team of sustainability experts to develop and implement effective carbon strategies.'
    }
  ];
  
  stats = [
    { value: '2M+', label: 'Tons of CO₂ Offset' },
    { value: '350+', label: 'Client Companies' },
    { value: '45+', label: 'Countries Served' },
    { value: '96%', label: 'Client Satisfaction' }
  ];
  
  process = [
    {
      title: 'Measure Your Carbon Footprint',
      description: 'We analyze your organization\'s operations to calculate your total carbon emissions across all activities.'
    },
    {
      title: 'Set Reduction Goals',
      description: 'Together, we\'ll establish realistic carbon reduction targets aligned with your business objectives and global standards.'
    },
    {
      title: 'Implement Reduction Strategies',
      description: 'Our experts will help you implement practical changes to reduce emissions at the source.'
    },
    {
      title: 'Offset Remaining Emissions',
      description: 'Balance your unavoidable emissions by investing in verified carbon credit projects that make a real difference.'
    }
  ];
  
  constructor(private animationService: AnimationService) {}
  
  ngOnInit() {}
  
  ngAfterViewInit() {
    this.initAnimations();
  }
  
  scrollToSection(sectionId: string) {
    this.animationService.scrollToElement(sectionId);
  }
  
  private initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-in').forEach(el => {
      observer.observe(el);
    });
  }
}
