import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    { value: 'carbon-assessment', label: 'Carbon Footprint Assessment' },
    { value: 'reduction-strategy', label: 'Emission Reduction Strategy' },
    { value: 'carbon-credits', label: 'Carbon Credits & Offsets' },
    { value: 'esg-reporting', label: 'ESG Reporting & Compliance' },
    { value: 'sustainability-consulting', label: 'Sustainability Consulting' },
    { value: 'other', label: 'Other' }
  ];
  
  faqs = [
    {
      question: 'How quickly will someone contact me after I submit this form?',
      answer: 'We strive to respond to all inquiries within 24 business hours. For urgent matters, we recommend including "Urgent" in your subject line or calling our office directly.',
      open: true
    },
    {
      question: 'What information should I prepare for an initial consultation?',
      answer: 'It\'s helpful to have a general understanding of your company\'s operations, size, and current sustainability initiatives. Any existing data on energy usage or emissions is useful but not required for our first conversation.',
      open: false
    },
    {
      question: 'Do you work with small businesses?',
      answer: 'Absolutely! We offer scalable solutions for organizations of all sizes, from small businesses to large enterprises. Our team will tailor our approach to match your specific needs and budget.',
      open: false
    },
    {
      question: 'Can you help with specific industry requirements?',
      answer: 'Yes, we have experience across multiple sectors including manufacturing, technology, retail, finance, and more. We understand the unique challenges and regulatory requirements of different industries and can customize our services accordingly.',
      open: false
    },
    {
      question: 'What are your pricing options?',
      answer: 'Our pricing varies based on company size, project scope, and specific services needed. After our initial consultation, we\'ll provide a detailed proposal with transparent pricing options. We offer flexible packages to accommodate different budgets and needs.',
      open: false
    }
  ];
  
  constructor(private formBuilder: FormBuilder) {}
  
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(20)]],
      consent: [false, Validators.requiredTrue]
    });
  }
  
  get f() { return this.contactForm.controls; }
  
  onInterestChange(event: any) {
    const value = event.target.value;
    const checked = event.target.checked;
    
    if (checked) {
      this.selectedInterests.push(value);
    } else {
      this.selectedInterests = this.selectedInterests.filter(item => item !== value);
    }
  }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.invalid) {
      return;
    }
    
    this.submitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.submitting = false;
      this.submitResult = true;
      this.submitSuccess = true;
      this.submitMessage = 'Thank you for your message! Our team will contact you shortly.';
      
      // Reset form
      this.contactForm.reset();
      this.contactForm.get('consent')?.setValue(false);
      this.selectedInterests = [];
      this.submitted = false;
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        this.submitResult = false;
      }, 5000);
    }, 1500);
  }
  
  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}