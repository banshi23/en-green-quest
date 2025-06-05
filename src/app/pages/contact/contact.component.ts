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
      answer: 'We prioritize every inquiry and strive to respond within 24 hours, often much sooner. For urgent matters, please call our office directly at +1 (555) 123-4567.',
      open: true
    },
    {
      question: 'What information should I prepare for an initial consultation?',
      answer: 'For the best consultation, please prepare information about your organization\'s size, current sustainability initiatives, and specific goals. If you\'re interested in carbon projects, details about your target impact and budget range are helpful for our initial planning. However, there are specific information required for individual project needs, hence it is advised to contact and ask for the information required to conduct an initial feasibility assessment.',
      open: false
    },
    {
      question: 'Do you work with small businesses and NGOs?',
      answer: 'Absolutely! We work with organizations of all sizes. Our solutions are designed to be scalable from small businesses to large corporations, NGOs, and government agencies.',
      open: false
    },
    {
      question: 'What types of carbon projects do you offer?',
      answer: 'We focus on three main areas: Nature-Based Solutions (reforestation, sustainable agriculture), Community-Based Solutions (clean cooking, clean water, clean energy adoption by marginalized rural communities), and Renewable Energy projects with IREC certification. All projects meet rigorous international verification standards.',
      open: false
    },
    {
      question: 'How do you ensure quality in your projects?',
      answer: 'Our team brings decades of combined experience from leading sustainability firms. We partner with established verification bodies including Gold Standard and Verra, ensuring all projects meet the highest international standards with complete transparency in our project development and monitoring processes.',
      open: false
    },
    {
      question: 'What are the typical timelines for carbon projects?',
      answer: 'Project timelines vary depending on type and scale. Community-based projects typically take 6-12 months from inception to implementation, while nature-based solutions may require 12-24 months. We provide detailed timelines during consultations and maintain transparent communication throughout the project lifecycle.',
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
    console.log(error);
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