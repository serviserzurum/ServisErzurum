/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  averageTime: string;
  estimatedPriceRange: string;
  features: string[];
}

export interface BookingState {
  brand: 'Peugeot' | 'Citroën' | 'Diğer';
  model: string;
  year: string;
  serviceCategory: string;
  customerName: string;
  customerPhone: string;
  preferredDate: string;
  notes: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  vehicle: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
