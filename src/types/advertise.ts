export type BannerVariant = "strip" | "image" | "card" | "native";
export type AdType = "banner" | "promoted_post" | "sponsorship";

export interface Product {
  id: string;
  type: AdType;
  variant?: BannerVariant;
  name: string;
  tagline: string;
  description: string;
  details: string[];
  fields: string[];
  exampleCopy?: string;
  pricing?: { period: string; price: string }[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ValueProp {
  title: string;
  description: string;
  icon: string;
}

export interface FormData {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  adPurpose: string;
  productType: string;
  duration: string;
  startDate: string;
  endDate: string;
  landingUrl: string;
  materialLink?: string;
  materialLater: boolean;
  budgetRange?: string;
  additionalNotes?: string;
  // honeypot
  website?: string;
}

export interface FormState {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}
