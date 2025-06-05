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
      description: 'Community projects like clean cooking, clean water, clean electricity that generate carbon credits alongside health & lifestyle benefits to the community.'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Renewable Energy',
      description: 'Renewable energy projects for carbon benefits under verified carbon registries and IREC mechanism (International Renewable Energy Certification).'
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
    { value: '30', label: 'Projects Finalized' },
    { value: '5', label: 'Countries Ongoing Projects' },
    { value: '1M', label: 'Tons CO₂ Sequestration Potential' },
    { value: '100K', label: 'People Positive Impact' }
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