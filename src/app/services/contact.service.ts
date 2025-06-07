import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  organizationType: string;
  projectType: string;
  subject: string;
  message: string;
  interests: string[];
  consent: boolean;
  timestamp: string;
  source: string;
}

// API Request Interface (matches your backend schema)
export interface ContactAPIRequest {
  full_name: string;
  email: string;
  company?: string;
  phone?: string;
  organization_type: string;
  primary_interest: string;
  subject: string;
  message: string;
  areas_of_interest: string[];
  communications_optin: boolean;
}

// API Response Interface (matches your backend response)
export interface ContactAPIResponse {
  message: string;
  id: number;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  id?: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://82.112.236.173/api/engreenquest/v1';
  private contactEndpoint = `${this.apiUrl}/contact`;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  
  constructor(private http: HttpClient) {}
  
  submitContactForm(formData: ContactFormData): Observable<ContactResponse> {
    // Transform frontend form data to match API schema
    const apiPayload: ContactAPIRequest = {
      full_name: formData.name,
      email: formData.email,
      company: formData.company || undefined,
      phone: formData.phone || undefined,
      organization_type: this.mapOrganizationType(formData.organizationType),
      primary_interest: this.mapPrimaryInterest(formData.projectType),
      subject: formData.subject,
      message: formData.message,
      areas_of_interest: formData.interests.length > 0 ? formData.interests : ['general'],
      communications_optin: formData.consent
    };
    return this.http.post<ContactAPIResponse>(
      this.contactEndpoint, 
      apiPayload, 
      this.httpOptions
    ).pipe(
      timeout(30000), // 30 second timeout
      catchError(this.handleError.bind(this)),
      // Transform API response to match frontend expectations
      map((apiResponse: ContactAPIResponse) => ({
        success: true,
        message: apiResponse.message,
        id: apiResponse.id.toString(),
        timestamp: new Date().toISOString()
      }))
    );
  }
  
  // Map frontend organization types to API values
  private mapOrganizationType(frontendType: string): string {
    const mapping: { [key: string]: string } = {
      'corporation': 'corporation',
      'small-business': 'small-business',
      'ngo': 'ngo',
      'government': 'government',
      'investor': 'investor',
      'other': 'other'
    };
    
    return mapping[frontendType] || 'other';
  }
  
  // Map frontend project types to API primary interest values
  private mapPrimaryInterest(frontendType: string): string {
    const mapping: { [key: string]: string } = {
      'nature-based': 'nature-based',
      'community-projects': 'community-projects',
      'renewable-energy': 'renewable-energy',
      'carbon-management': 'carbon-management',
      'consultation': 'consultation'
    };
    
    return mapping[frontendType] || 'consultation';
  }
  
  // Fallback method using a different endpoint or service
  submitContactFormFallback(formData: ContactFormData): Observable<ContactResponse> {
    // This could use a different service like Formspree, Netlify Forms, etc.
    const fallbackUrl = environment.fallbackContactUrl || 'https://formspree.io/f/your-form-id';
    
    return this.http.post<ContactResponse>(
      fallbackUrl, 
      formData, 
      this.httpOptions
    ).pipe(
      timeout(30000),
      catchError(this.handleError.bind(this))
    );
  }
  
  // Method to validate email format on the server side
  validateEmail(email: string): Observable<{ valid: boolean; reason?: string }> {
    return this.http.post<{ valid: boolean; reason?: string }>(
      `${this.apiUrl}/validate-email`,
      { email },
      this.httpOptions
    ).pipe(
      timeout(10000),
      catchError(this.handleError.bind(this))
    );
  }
  
  // Method to get contact form configuration (for dynamic form fields)
  getContactFormConfig(): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/contact-config`,
      this.httpOptions
    ).pipe(
      timeout(10000),
      catchError(this.handleError.bind(this))
    );
  }
  
  private handleError(error: any): Observable<never> {
    console.log(error);
    let errorMessage = 'An unexpected error occurred';
    let errorCode = 'UNKNOWN_ERROR';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
      errorCode = 'CLIENT_ERROR';
    } else {
      // Server-side error
      switch (error.status) {
        case 0:
          errorMessage = 'Unable to connect to the server. Please check your internet connection.';
          errorCode = 'CONNECTION_ERROR';
          break;
        case 400:
          errorMessage = error.error?.message || 'Invalid form data. Please check your inputs.';
          errorCode = 'VALIDATION_ERROR';
          break;
        case 403:
          errorMessage = 'Access denied. Please try again later.';
          errorCode = 'ACCESS_DENIED';
          break;
        case 429:
          errorMessage = 'Too many requests. Please wait a few minutes before trying again.';
          errorCode = 'RATE_LIMITED';
          break;
        case 500:
          errorMessage = 'Server error. Our team has been notified. Please try again later.';
          errorCode = 'SERVER_ERROR';
          break;
        case 503:
          errorMessage = 'Service temporarily unavailable. Please try again in a few minutes.';
          errorCode = 'SERVICE_UNAVAILABLE';
          break;
        default:
          errorMessage = error.error?.message || `Error ${error.status}: ${error.statusText}`;
          errorCode = `HTTP_${error.status}`;
      }
    }
    
    // Log error for debugging (in development)
    if (!environment.production) {
      console.error('Contact Service Error:', {
        code: errorCode,
        message: errorMessage,
        originalError: error
      });
    }
    
    return throwError(() => ({
      code: errorCode,
      message: errorMessage,
      status: error.status || 0,
      error: error
    }));
  }
}