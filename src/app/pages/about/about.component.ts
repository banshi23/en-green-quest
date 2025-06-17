import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {
  values = [
    {
      icon: 'fas fa-microscope',
      title: 'Science-Backed Solutions',
      description: 'Our projects are grounded in rigorous scientific research and evidence-based methodologies to ensure maximum environmental impact.'
    },
    {
      icon: 'fas fa-eye',
      title: 'Transparency',
      description: 'We provide complete transparency in our project development, monitoring, and reporting processes for full accountability.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community-Centric',
      description: 'We prioritize local communities in our project design, ensuring they benefit from and participate in our initiatives.'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Environmental Integrity',
      description: 'Every project delivers real, measurable, and permanent environmental benefits beyond carbon sequestration.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Trusted Partnerships',
      description: 'We build lasting relationships with investors, NGOs, governments, and communities to maximize collective impact.'
    },
    {
      icon: 'fas fa-globe',
      title: 'Global Impact',
      description: 'Our projects span multiple continents, addressing climate change while supporting local sustainable development.'
    }
  ];
  
  team = [
    {
      name: 'Shailesh Kumar Bokadia',
      title: 'Co-founder & MD',
      bio: 'Mr. Shailesh Kumar Bokadia is a seasoned entrepreneur with diversified expertise spanning sustainable real estate development, agricultural commodities, and equity markets. As a passionate environmental advocate, he actively champions nature conservation initiatives. Through Engreen Quest, he has channeled his commitment toward carbon project development, advancing the global transition to net-zero emissions.',
      image: 'assets/images/teams/shailesh_bokadia.jpg'
    },
    {
      name: 'Dr. Priya Sharma',
      title: 'Co-founder & CEO',
      bio: 'Environmental scientist with 20+ years experience in carbon markets and sustainable development. Previously led carbon initiatives at major consulting firms.',
      image: 'assets/images/teams/priya_sharma.png'
    },
    {
      name: 'Marcus Thompson',
      title: 'CTO',
      bio: 'Technology leader with extensive experience in digital platforms for environmental monitoring and carbon project management systems.',
      image: 'assets/images/teams/marcus_thompson.png'
    },
    {
      name: 'Sateesh Kumar',
      title: 'Co-founder & Head of Community Projects',
      bio: 'International development specialist with deep expertise in community-based carbon initiatives and clean cooking programs across Africa and Asia.',
      image: 'assets/images/teams/sateesh.png'
    },
    {
      name: 'Dr. Amara Okafor',
      title: 'Director of NBS',
      bio: 'Forest ecologist and carbon sequestration researcher, bringing scientific rigor to our nature-based solutions and biochar project development.',
      image: 'assets/images/teams/amara_okafor.jpg'
    },
    {
      name: 'Rakesh Mishra',
      title: 'Director of Renewable Energy Carbon Projects',
      bio: 'Renewable energy expert with extensive experience in IREC certification and clean energy project development across emerging markets.',
      image: 'assets/images/teams/rakesh_mishra.jpg'
    }
  ];
  
  timeline = [
    {
      year: '2025 Q1',
      title: 'Company Founded',
      description: 'Engreen Quest established with a mission to regenerate the planet through innovative carbon credit solutions, backed by experienced sustainability professionals.'
    },
    {
      year: '2025 Q2',
      title: 'First Project Partnerships',
      description: 'Secured partnerships with verified carbon project developers and established relationships with certification bodies including Gold Standard and Verra.'
    },
    {
      year: '2025 Q3',
      title: 'Initial Project Portfolio',
      description: 'Launched our first community cookstove program in Kenya and initiated reforestation project development in Brazil and Indonesia.'
    },
    {
      year: '2025 Q4',
      title: 'Technology Platform Launch',
      description: 'Deployed our carbon project tracking and verification platform, enabling real-time monitoring and transparent reporting for all stakeholders.'
    },
    {
      year: '2026',
      title: 'Market Expansion',
      description: 'Expand operations across Southeast Asia and Africa, focusing on community-centric projects and renewable energy initiatives.'
    },
    {
      year: '2027',
      title: 'Impact Milestone Target',
      description: 'Goal to facilitate 500,000 tons of CO₂ sequestration and positively impact 50,000 community members through our diverse project portfolio.'
    }
  ];
  
  partners = [
    { name: 'Gold Standard', logo: 'assets/images/partners/Gold Standard Logo.svg' },
    { name: 'Verra', logo: 'assets/images/partners/verra-vector-logo.webp' },
    { name: 'International REC Standard', logo: 'assets/images/partners/iREC.png' },
    { name: 'UN Global Compact', logo: 'assets/images/partners/UN_Global_Compact_logo.png' },
    { name: 'Climate Action Reserve', logo: 'assets/images/partners/reserve-logo.png' }
  ];
  
  constructor() {}
  
  ngOnInit() {}
  
  ngAfterViewInit() {
    this.initAnimations();
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