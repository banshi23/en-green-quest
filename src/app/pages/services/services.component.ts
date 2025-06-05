import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  
  mainServices = [
    {
      icon: 'fas fa-leaf',
      title: 'Nature-Based Solutions (NBS) Projects',
      description: 'We specialize in designing, developing, and managing Nature-Based Solutions (NBS) projects that harness the power of ecosystems to sequester carbon, restore biodiversity, and support communities.',
      features: [
        'Afforestation and reforestation',
        'Wetland and mangrove restoration',
        'Sustainable land use practices',
        'Community-led forest conservation'
      ],
      note: 'We align all NBS projects with verified carbon standards, ensuring transparency, accountability, and measurable climate impact.'
    },
    {
      icon: 'fas fa-home',
      title: 'Community-Based Solutions (CBS)',
      description: 'Community-Based Solutions (CBS) focuses on empowering marginalized rural communities through sustainable interventions. Our initiatives encompass clean cooking technologies, safe water access systems, and renewable energy adoption programs that improve livelihoods while generating measurable environmental benefits.',
      features: [
        'Clean cooking stove programs for rural households',
        'Safe water access and purification systems',
        'Community-scale renewable energy installations',
        'Capacity building and training programs'
      ],
      note: 'Our CBS projects prioritize community ownership and long-term sustainability, creating lasting positive impact beyond carbon reduction.'
    },
    {
      icon: 'fas fa-solar-panel',
      title: 'Renewable Energy (RE)',
      description: 'Our Renewable Energy (RE) services empower organizations to switch to clean power sources while generating verifiable carbon credits. We support the development and registration of clean energy projects under verified carbon registries and IREC mechanism (International Renewable Energy Certification).',
      features: [
        'Solar and wind farms with IREC certification',
        'Biomass and biogas systems',
        'Small-scale hydroelectric projects',
        'Off-grid clean energy for rural communities'
      ],
      note: 'Each RE project is structured to deliver robust emission reductions, verified under global standards like Verra and Gold Standard.'
    }
  ];

  whyChooseUs = [
    {
      icon: 'fas fa-microscope',
      title: 'Science-driven project design',
      description: 'Our approach is rooted in rigorous scientific methodology and evidence-based practices.'
    },
    {
      icon: 'fas fa-hands-helping',
      title: 'End-to-end support',
      description: 'Complete support from feasibility studies to credit issuance and ongoing project management.'
    },
    {
      icon: 'fas fa-certificate',
      title: 'Global registry compliance',
      description: 'Full compliance with leading standards including Verra, Gold Standard, and CDM.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Co-benefits delivery',
      description: 'Positive impact for communities, biodiversity, and climate resilience beyond carbon reduction.'
    }
  ];

  certifications = [
    {
      name: 'Verra (VCS)',
      logo: 'assets/images/partners/verra-vector-logo.webp',
      description: 'The world\'s most widely used voluntary GHG program with rigorous certification standards.'
    },
    {
      name: 'Gold Standard',
      logo: 'assets/images/partners/Gold Standard Logo.svg',
      description: 'Highest quality carbon offset projects with verified sustainable development benefits.'
    },
    {
      name: 'Clean Development Mechanism',
      logo: 'assets/images/partners/unfcc.png',
      description: 'UN framework mechanism for emission reduction projects in developing countries.'
    }
  ];

  constructor() {}
  
  ngOnInit() {}
}