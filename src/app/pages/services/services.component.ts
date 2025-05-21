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
  services = [
    {
      icon: 'fas fa-chart-line',
      title: 'Carbon Footprint Assessment',
      description: 'Comprehensive analysis of your organization\'s greenhouse gas emissions across all operations and supply chains.',
      features: [
        'Scope 1, 2, and 3 emissions analysis',
        'Detailed emissions inventory',
        'Industry benchmarking',
        'Customized reporting dashboard'
      ]
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Reduction Strategy',
      description: 'Develop practical, cost-effective approaches to reduce emissions at the source and improve efficiency.',
      features: [
        'Energy efficiency audits',
        'Renewable energy transition planning',
        'Supply chain optimization',
        'Employee engagement programs'
      ]
    },
    {
      icon: 'fas fa-sync-alt',
      title: 'Carbon Offset Solutions',
      description: 'High-quality, verified carbon credits from diverse projects to offset your unavoidable emissions.',
      features: [
        'Customized offset portfolio',
        'Project selection assistance',
        'Transparent verification',
        'Impact reporting and storytelling'
      ]
    },
    {
      icon: 'fas fa-file-alt',
      title: 'ESG Reporting & Compliance',
      description: 'Meet regulatory requirements and stakeholder expectations with comprehensive sustainability reporting.',
      features: [
        'GHG Protocol compliance',
        'CDP reporting support',
        'TCFD alignment',
        'Sustainability report development'
      ]
    },
    {
      icon: 'fas fa-users-cog',
      title: 'Sustainability Consulting',
      description: 'Strategic guidance to integrate climate action into your core business strategy and operations.',
      features: [
        'Sustainability goal setting',
        'Integration with business strategy',
        'Executive workshops',
        'Sustainable innovation development'
      ]
    },
    {
      icon: 'fas fa-bullhorn',
      title: 'Climate Communication',
      description: 'Effectively communicate your climate commitments and achievements to stakeholders and customers.',
      features: [
        'Sustainability messaging strategy',
        'Environmental claims guidance',
        'Stakeholder engagement',
        'Impact storytelling'
      ]
    }
  ];
  
  projects = [
    {
      title: 'Amazon Rainforest Conservation',
      location: 'Brazil',
      description: 'Protecting critical rainforest ecosystems while supporting indigenous communities through sustainable forest management practices.',
      image: 'assets/images/project-1.jpg',
      carbonOffset: '500,000 tons',
      area: '50,000 hectares'
    },
    {
      title: 'Wind Farm Development',
      location: 'India',
      description: 'Construction and operation of utility-scale wind farms to replace fossil fuel energy generation and improve local air quality.',
      image: 'assets/images/project-2.jpg',
      carbonOffset: '350,000 tons',
      area: '2,000 hectares'
    },
    {
      title: 'Mangrove Restoration',
      location: 'Indonesia',
      description: 'Rehabilitating coastal mangrove ecosystems to sequester carbon, protect coastlines, and enhance marine biodiversity.',
      image: 'assets/images/project-3.jpg',
      carbonOffset: '250,000 tons',
      area: '5,000 hectares'
    },
    {
      title: 'Community Solar Initiative',
      location: 'Kenya',
      description: 'Installing solar systems in rural communities to replace diesel generators and kerosene lamps while improving energy access.',
      image: 'assets/images/project-4.jpg',
      carbonOffset: '150,000 tons',
      area: '500 communities'
    }
  ];
  
  process = [
    {
      title: 'Initial Consultation',
      description: 'We start with understanding your organization\'s operations, sustainability goals, and carbon reduction objectives.'
    },
    {
      title: 'Carbon Assessment',
      description: 'Our team conducts a comprehensive analysis of your emissions across all scopes to establish your carbon baseline.'
    },
    {
      title: 'Strategy Development',
      description: 'Based on the assessment, we create a customized roadmap with specific reduction targets and offset strategies.'
    },
    {
      title: 'Implementation Support',
      description: 'We provide ongoing guidance and tools to implement carbon reduction initiatives across your organization.'
    },
    {
      title: 'Carbon Credit Selection',
      description: 'Together, we identify and invest in verified carbon offset projects aligned with your values and objectives.'
    },
    {
      title: 'Monitoring & Reporting',
      description: 'We track progress, measure impact, and create transparent reports for stakeholders and compliance purposes.'
    }
  ];
  
  certifications = [
    {
      name: 'Gold Standard',
      logo: 'assets/images/cert-1.png',
      description: 'Highest quality carbon offset projects with verified sustainable development benefits.'
    },
    {
      name: 'Verified Carbon Standard',
      logo: 'assets/images/cert-2.png',
      description: 'The world\'s most widely used voluntary GHG program with rigorous certification.'
    },
    {
      name: 'Climate Action Reserve',
      logo: 'assets/images/cert-3.png',
      description: 'North American offset registry ensuring transparency and environmental integrity.'
    },
    {
      name: 'Carbon Trust Standard',
      logo: 'assets/images/cert-4.png',
      description: 'Independent certification of organizational carbon reduction achievements.'
    }
  ];
  
  testimonials = [
    {
      quote: 'EnGreenQuest transformed our sustainability strategy with their thorough approach and expert guidance. They helped us achieve carbon neutrality while improving our operational efficiency.',
      name: 'Rebecca Johnson',
      title: 'Sustainability Director',
      company: 'Global Retail Inc.',
      image: 'assets/images/testimonial-1.jpg'
    },
    {
      quote: 'The team\'s deep knowledge of carbon markets and regulatory requirements was invaluable. They simplified a complex process and delivered measurable results for our business.',
      name: 'David Chen',
      title: 'CEO',
      company: 'EcoTech Solutions',
      image: 'assets/images/testimonial-2.jpg'
    },
    {
      quote: 'Working with EnGreenQuest has been a game-changer for our ESG reporting. Their analytics platform provides unprecedented visibility into our carbon footprint across all operations.',
      name: 'Sofia Rodriguez',
      title: 'CFO',
      company: 'Meridian Manufacturing',
      image: 'assets/images/testimonial-3.jpg'
    }
  ];
  
  faqs = [
    {
      question: 'What are carbon credits and how do they work?',
      answer: 'Carbon credits represent one metric ton of carbon dioxide (or equivalent greenhouse gas) that has been reduced, removed, or avoided. Organizations purchase these credits to offset their unavoidable emissions, effectively investing in projects that reduce carbon elsewhere in the world.',
      open: true
    },
    {
      question: 'How do you ensure the quality of carbon offset projects?',
      answer: 'All our carbon offset projects are independently verified by leading certification standards such as Gold Standard and Verified Carbon Standard. We conduct rigorous due diligence on each project, ensuring real, measurable, and permanent carbon reductions with strong environmental and social co-benefits.',
      open: false
    },
    {
      question: 'What\'s the difference between carbon neutral and net-zero?',
      answer: 'Carbon neutrality involves balancing emissions by offsetting an equivalent amount of carbon. Net-zero is more ambitious, requiring deep emissions reductions across all scopes (typically 90-95%) with only a small amount of hard-to-abate emissions being offset through carbon removal projects specifically.',
      open: false
    },
    {
      question: 'How long does the carbon assessment process take?',
      answer: 'The timeline varies based on your organization\'s size and complexity, but typically ranges from 4-8 weeks. This includes data collection, analysis, and the development of your customized carbon management strategy.',
      open: false
    },
    {
      question: 'Can small businesses benefit from carbon management services?',
      answer: 'Absolutely! We offer scalable solutions designed for organizations of all sizes. Our packages for small businesses provide cost-effective approaches to measure, reduce, and offset emissions while meeting growing stakeholder expectations for climate action.',
      open: false
    }
  ];
  
  constructor() {}
  
  ngOnInit() {}
  
  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}