import { Injectable, InjectionToken, inject } from '@angular/core';
import { GtmConfig } from './gtm.interfaces';

export const GTM_CONFIG = new InjectionToken<GtmConfig>('GTM_CONFIG');

@Injectable({ providedIn: 'root' })
export class GtmService {
  private config = inject(GTM_CONFIG, { optional: true });
  private scriptInjected = false;
  private enabled = false;

  start(): void {
    if (!this.config?.containerId) {
      return;
    }

    this.enabled = true;

    if (!this.scriptInjected) {
      this.injectScript(this.config.containerId);
      this.scriptInjected = true;
    }
  }

  stop(): void {
    // GTM's loader script cannot be unloaded once injected onto the page;
    // stop() only suppresses further dataLayer pushes from this app.
    this.enabled = false;
  }

  pushEvent(event: Record<string, unknown>): void {
    if (this.enabled) {
      window.dataLayer?.push(event);
    }
  }

  private injectScript(containerId: string): void {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
    document.head.appendChild(script);
  }
}
