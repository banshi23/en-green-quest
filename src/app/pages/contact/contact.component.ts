import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  submitted = false;
  submitting = false;
  submitResult = false;
  submitSuccess = false;
  submitMessage = '';
  selectedInterests: string[] = [];
  
  interests = [
    { 
      value: 'reforestation', 
      label: 'Reforestation & Afforestation Projects' 
    },
    { 
      value: 'sustainable-agriculture', 
      label: 'Sustainable Agriculture & Biochar' 
    },
    { 
      value: 'clean-cookstoves', 
      label: 'Clean Cookstove Programs' 
    },
    { 
      value: 'renewable-energy', 
      label: 'Solar & Wind Energy Projects' 
    },
    { 
      value: 'irec-certification', 
      label: 'IREC Certification Management' 
    },
    { 
      value: 'carbon-credits', 
      label: 'Carbon Credit Trading & Management' 
    },
    { 
      value: 'project-development', 
      label: 'Custom Project Development' 
    },
    { 
      value: 'verification-services', 
      label: 'Project Verification & Monitoring' 
    }
  ];
  
  faqs = [
    {
      question: 'How quickly will someone contact me after I submit this form?',
      answer: 'As a new company launching in 2025, we prioritize every inquiry. We strive to respond within 24 hours and often much sooner. For urgent matters, please call our office directly at +1 (555) 123-4567.',
      open: true
    },
    {
      question: 'What information should I prepare for an initial consultation?',
      answer: 'For the best consultation, please prepare information about your organization\'s size, current sustainability initiatives, and specific goals. If you\'re interested in carbon projects, details about your target impact and budget range are helpful for our initial planning.',
      open: false
    },
    {
      question: 'Do you work with small businesses and NGOs?',
      answer: 'Absolutely! As we launch Engreen Quest, we\'re excited to work with organizations of all sizes. Our solutions are designed to be scalable from small businesses to large corporations, NGOs, and government agencies.',
      open: false
    },
    {
      question: 'What types of carbon projects are you launching with?',
      answer: 'We\'re starting with three main focus areas: Nature-Based Solutions (reforestation, sustainable agriculture), Community-Centric Projects (clean cookstoves, rural energy), and Renewable Energy projects with IREC certification. All projects will meet international verification standards from day one.',
      open: false
    },
    {
      question: 'How do you ensure quality as a new company?',
      answer: 'While Engreen Quest is new, our team brings decades of combined experience from leading sustainability firms. We\'re partnering with established verification bodies including Gold Standard and Verra, ensuring all projects meet the highest international standards from launch.',
      open: false
    },
    {
      question: 'What are the typical timelines for your initial projects?',
      answer: 'As we launch in 2025, our first community cookstove programs are planned for Q3, with reforestation projects beginning in Q4. We provide detailed timelines during consultations and will be transparent about our launch schedule and capacity.',
      open: false
    }
  ];
  
  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService
  ) {}
  
  ngOnInit() {
    this.initializeForm();
  }
  
  private initializeForm() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      phone: ['', [Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      organizationType: ['', Validators.required],
      projectType: ['', Validators.required],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
      consent: [false, Validators.requiredTrue]
    });
  }
  
  get f() { 
    return this.contactForm.controls; 
  }
  
  onInterestChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;
    
    if (checked && !this.selectedInterests.includes(value)) {
      this.selectedInterests.push(value);
    } else if (!checked) {
      this.selectedInterests = this.selectedInterests.filter(item => item !== value);
    }
  }
  
  onSubmit() {
    this.submitted = true;
    
    // Reset previous results
    this.submitResult = false;
    
    if (this.contactForm.invalid) {
      this.scrollToFirstError();
      return;
    }
    
    this.submitting = true;
    
    // Prepare form data
    const formData = {
      ...this.contactForm.value,
      interests: this.selectedInterests,
      timestamp: new Date().toISOString(),
      source: 'website_contact_form'
    };
    
    // Call the contact service
    this.contactService.submitContactForm(formData).subscribe({
      next: (response) => {
        this.handleSuccess(response);
      },
      error: (error) => {
        this.handleError(error);
      }
    });
  }
  
  private handleSuccess(response: any) {
    this.submitting = false;
    this.submitResult = true;
    this.submitSuccess = true;
    this.submitMessage = 'Thank you for your message! Our carbon solutions team will contact you within 24 hours to discuss your sustainability goals.';
    
    // Reset form
    this.resetForm();
    
    // Hide success message after 8 seconds
    setTimeout(() => {
      this.submitResult = false;
    }, 8000);
    
    // Scroll to success message
    this.scrollToElement('.form-result');
  }
  
  private handleError(error: any) {
    this.submitting = false;
    this.submitResult = true;
    this.submitSuccess = false;
    
    // Set appropriate error message
    if (error.status === 0) {
      this.submitMessage = 'Unable to connect to our servers. Please check your internet connection and try again.';
    } else if (error.status === 429) {
      this.submitMessage = 'Too many requests. Please wait a few minutes before trying again.';
    } else if (error.status >= 500) {
      this.submitMessage = 'Our servers are experiencing issues. Please try again later or contact us directly at info@engreenquest.com.';
    } else {
      this.submitMessage = error.error?.message || 'An error occurred while sending your message. Please try again or contact us directly.';
    }
    
    // Hide error message after 10 seconds
    setTimeout(() => {
      this.submitResult = false;
    }, 10000);
    
    // Scroll to error message
    this.scrollToElement('.form-result');
  }
  
  private resetForm() {
    this.contactForm.reset();
    this.contactForm.patchValue({
      consent: false,
      organizationType: '',
      projectType: ''
    });
    this.selectedInterests = [];
    this.submitted = false;
    
    // Uncheck all interest checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#consent)');
    checkboxes.forEach((checkbox: any) => {
      checkbox.checked = false;
    });
  }
  
  private scrollToFirstError() {
    const firstErrorElement = document.querySelector('.error');
    if (firstErrorElement) {
      firstErrorElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }
  
  private scrollToElement(selector: string) {
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  }
  
  toggleFaq(index: number) {
    // Close other FAQs (accordion behavior)
    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.open = false;
      }
    });
    
    // Toggle selected FAQ
    this.faqs[index].open = !this.faqs[index].open;
  }
}