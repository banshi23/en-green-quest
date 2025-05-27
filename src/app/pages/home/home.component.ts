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
      icon: 'fas fa-seedling',
      title: 'Nature-Based Solutions',
      description: 'Science-backed projects that sequester carbon while restoring ecosystems - from reforestation to sustainable agriculture.'
    },
    {
      icon: 'fas fa-home',
      title: 'Community Impact',
      description: 'Clean cookstove programs that improve health outcomes while reducing emissions and preserving forests.'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Renewable Energy',
      description: 'Clean energy projects with IREC certification, enabling verified renewable energy claims for your organization.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Transparent Tracking',
      description: 'Real-time monitoring and reporting of project outcomes with detailed impact metrics and verification.'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Verified Credits',
      description: 'High-quality carbon credits meeting international standards with independent third-party verification.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Full-Service Support',
      description: 'End-to-end project management from initial design through credit issuance and ongoing monitoring.'
    }
  ];
  
  stats = [
    { value: '50+', label: 'Active Projects' },
    { value: '25+', label: 'Countries Served' },
    { value: '1.5M+', label: 'Tons CO₂ Sequestered' },
    { value: '100K+', label: 'Communities Impacted' }
  ];
  
  process = [
    {
      title: 'Project Design & Development',
      description: 'We design science-backed carbon projects tailored to local ecosystems and community needs, ensuring maximum environmental and social impact.'
    },
    {
      title: 'Implementation & Management',
      description: 'Our expert team manages all aspects of project implementation, from community engagement to technical execution and monitoring.'
    },
    {
      title: 'Verification & Certification',
      description: 'We ensure all projects meet rigorous international standards and undergo independent verification for carbon credit issuance.'
    },
    {
      title: 'Impact Delivery & Reporting',
      description: 'We provide transparent reporting on project outcomes, including carbon sequestration, biodiversity restoration, and community benefits.'
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