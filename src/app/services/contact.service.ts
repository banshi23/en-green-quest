import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
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
  private apiUrl = environment.apiUrl || 'https://api.engreenquest.com';
  private contactEndpoint = `${this.apiUrl}/api/v1/contact`;
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  
  constructor(private http: HttpClient) {}
  
  submitContactForm(formData: ContactFormData): Observable<ContactResponse> {
    // Add honeypot field to prevent spam
    const payload = {
      ...formData,
      honeypot: '', // Empty honeypot field
      userAgent: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'direct'
    };
    
    return this.http.post<ContactResponse>(
      this.contactEndpoint, 
      payload, 
      this.httpOptions
    ).pipe(
      timeout(30000), // 30 second timeout
      catchError(this.handleError.bind(this))
    );
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
      `${this.apiUrl}/api/v1/validate-email`,
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
      `${this.apiUrl}/api/v1/contact-config`,
      this.httpOptions
    ).pipe(
      timeout(10000),
      catchError(this.handleError.bind(this))
    );
  }
  
  private handleError(error: any): Observable<never> {
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