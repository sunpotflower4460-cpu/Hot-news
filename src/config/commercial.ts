import rawConfig from './commercial.json';

export type ReleaseStage = 'preview' | 'production';

export interface CommercialConfig {
  releaseStage: ReleaseStage;
  app: {
    name: string;
    displayName: string;
    bundleId: string;
    version: string;
    publicBaseUrl: string;
  };
  operator: {
    legalName: string;
    representative: string;
    postalAddress: string;
    phone: string;
    contactEmail: string;
  };
  urls: {
    support: string;
    privacy: string;
    privacyChoices: string;
    terms: string;
    commercialDisclosure: string;
    editorialPolicy: string;
    accessibility: string;
  };
  legal: {
    country: string;
    privacyEffectiveDate: string;
    termsEffectiveDate: string;
  };
  features: {
    realNewsApi: boolean;
    analytics: boolean;
    diagnostics: boolean;
    accounts: boolean;
    subscriptions: boolean;
    pushNotifications: boolean;
    ads: boolean;
    mockContent: boolean;
  };
  integrations: {
    contentApi: string;
    analyticsProvider: string;
    diagnosticsProvider: string;
    billingProvider: string;
    notificationProvider: string;
  };
}

export const commercialConfig = rawConfig as CommercialConfig;
export const isCommercialPreview = commercialConfig.releaseStage !== 'production';

export function configuredValue(value: string, fallback = '正式公開前に設定します') {
  return value.trim() || fallback;
}
