declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export interface GtmConfig {
  containerId: string;
}
