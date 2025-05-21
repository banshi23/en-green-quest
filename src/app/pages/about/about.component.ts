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
      icon: 'fas fa-check-circle',
      title: 'Integrity',
      description: 'We uphold the highest standards of honesty, transparency, and scientific rigor in all our work.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovation',
      description: 'We continuously seek new and better ways to address climate challenges for our clients and the planet.'
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'Collaboration',
      description: 'We believe in the power of partnerships to create meaningful environmental and business outcomes.'
    },
    {
      icon: 'fas fa-globe',
      title: 'Impact',
      description: 'We measure our success by the real-world difference our work makes for communities and ecosystems.'
    },
    {
      icon: 'fas fa-bolt',
      title: 'Agility',
      description: 'We adapt quickly to evolving science, market conditions, and client needs.'
    },
    {
      icon: 'fas fa-users',
      title: 'Inclusivity',
      description: 'We ensure that climate solutions benefit diverse communities and stakeholders around the world.'
    }
  ];
  
  team = [
    {
      name: 'Sarah Chen',
      title: 'CEO & Founder',
      bio: 'Former sustainability director with 15+ years experience in environmental policy and carbon markets.',
      image: 'assets/images/team-1.jpg'
    },
    {
      name: 'Michael Rodriguez',
      title: 'Chief Science Officer',
      bio: 'Climate scientist with a PhD in Environmental Engineering and background in carbon cycle research.',
      image: 'assets/images/team-2.jpg'
    },
    {
      name: 'Aisha Patel',
      title: 'Head of Partnerships',
      bio: 'Expert in building strategic alliances between businesses, NGOs, and government agencies.',
      image: 'assets/images/team-3.jpg'
    },
    {
      name: 'James Wilson',
      title: 'Technology Director',
      bio: 'Software engineer specializing in environmental data systems and carbon accounting platforms.',
      image: 'assets/images/team-4.jpg'
    }
  ];
  
  timeline = [
    {
      year: '2018',
      title: 'Company Founded',
      description: 'EnGreenQuest was established with a mission to make carbon credits accessible to businesses of all sizes.'
    },
    {
      year: '2019',
      title: 'First Major Partnerships',
      description: 'Launched collaborations with leading reforestation and renewable energy projects across three continents.'
    },
    {
      year: '2020',
      title: 'Technology Platform Launch',
      description: 'Introduced our proprietary carbon management software, enabling real-time tracking and reporting.'
    },
    {
      year: '2021',
      title: 'International Expansion',
      description: 'Opened offices in Europe and Asia to better serve our growing global client base.'
    },
    {
      year: '2022',
      title: 'Industry Recognition',
      description: 'Received multiple awards for innovation in climate tech and corporate sustainability solutions.'
    },
    {
      year: '2024',
      title: 'Carbon Impact Milestone',
      description: 'Surpassed 2 million tons of CO₂ offset through our client projects and partnerships.'
    }
  ];
  
  partners = [
    { name: 'Green Energy Alliance', logo: 'assets/images/partner-1.png' },
    { name: 'Global Climate Initiative', logo: 'assets/images/partner-2.png' },
    { name: 'Sustainable Business Council', logo: 'assets/images/partner-3.png' },
    { name: 'Tech for Earth', logo: 'assets/images/partner-4.png' },
    { name: 'Reforestation International', logo: 'assets/images/partner-5.png' }
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
