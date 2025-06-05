import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {

  projects = [
    {
      id: 1,
      title: 'Kenya Clean Cooking Initiative',
      description: 'Replacing traditional cookstoves with efficient clean cookstoves in rural Kenya, reducing emissions while improving health outcomes for communities.',
      image: 'assets/images/projects/kenya-clean-cooking.jpg'
    },
    {
      id: 2,
      title: 'Brazilian Rainforest Restoration',
      description: 'Large-scale reforestation project in the Atlantic Forest biome, restoring degraded lands while sequestering carbon and protecting biodiversity.',
      image: 'assets/images/projects/brazil-reforestation.jpg'
    },
    {
      id: 3,
      title: 'India Solar Microgrid Network',
      description: 'Deploying solar microgrids in rural villages across Rajasthan, providing clean electricity while generating renewable energy certificates.',
      image: 'assets/images/projects/india-solar-microgrid.jpg'
    },
    {
      id: 4,
      title: 'Tanzania Mangrove Conservation',
      description: 'Protecting and restoring mangrove ecosystems along the Tanzanian coast, combining carbon sequestration with marine biodiversity conservation.',
      image: 'assets/images/projects/tanzania-mangroves.jpg'
    },
    {
      id: 5,
      title: 'Indonesian Biochar Production',
      description: 'Converting agricultural waste into carbon-rich biochar, improving soil health while permanently removing CO₂ from the atmosphere.',
      image: 'assets/images/projects/indonesia-biochar.jpg'
    },
    {
      id: 6,
      title: 'Mexico Wind Energy Cooperative',
      description: 'Community-owned wind energy project in Oaxaca, generating clean electricity while providing economic benefits to indigenous communities.',
      image: 'assets/images/projects/mexico-wind-energy.jpg'
    }
  ];

  portfolioStats = [
    {
      icon: 'fas fa-leaf',
      value: '134,500',
      label: 'Tons CO₂ Sequestered',
      description: 'Annual carbon impact across all active projects'
    },
    {
      icon: 'fas fa-users',
      value: '65,300',
      label: 'People Benefited',
      description: 'Individuals positively impacted by our initiatives'
    },
    {
      icon: 'fas fa-home',
      value: '18,200',
      label: 'Households Served',
      description: 'Families with improved energy access or livelihoods'
    },
    {
      icon: 'fas fa-globe',
      value: '8',
      label: 'Countries Active',
      description: 'Nations where we operate carbon credit projects'
    },
    {
      icon: 'fas fa-seedling',
      value: '2,800',
      label: 'Hectares Restored',
      description: 'Land area under conservation or restoration'
    },
    {
      icon: 'fas fa-briefcase',
      value: '850',
      label: 'Jobs Created',
      description: 'Direct and indirect employment opportunities'
    }
  ];

  upcomingProjects = [
    {
      icon: 'fas fa-seedling',
      title: 'Ghana Agroforestry Initiative',
      description: 'Integrating trees into agricultural systems to improve soil health, increase yields, and sequester carbon.',
      location: 'Northern Ghana',
      beneficiaries: '2,500 farmers',
      timeline: 'Q3 2025',
      progress: 35
    },
    {
      icon: 'fas fa-home',
      title: 'Bangladesh Clean Water & Cooking',
      description: 'Combined clean water access and improved cookstove program for rural communities.',
      location: 'Sylhet Division, Bangladesh',
      beneficiaries: '15,000 people',
      timeline: 'Q4 2025',
      progress: 20
    },
    {
      icon: 'fas fa-solar-panel',
      title: 'Philippines Solar + Storage',
      description: 'Island microgrid with solar panels and battery storage for 24/7 clean electricity.',
      location: 'Mindanao Islands, Philippines',
      beneficiaries: '3,200 residents',
      timeline: 'Q1 2026',
      progress: 15
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  viewProject(projectId: number): void {
    // Navigate to detailed project view
    console.log('Viewing project:', projectId);
    // You can implement routing to detailed project pages
  }

  downloadReport(projectId: number): void {
    // Download project impact report
    console.log('Downloading report for project:', projectId);
    // You can implement file download functionality
  }
}