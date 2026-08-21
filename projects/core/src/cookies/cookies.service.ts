import { Injectable } from '@angular/core';
import { DynatraceService } from './dynatrace/dynatrace.service';
import { GtmService } from './gtm/gtm.service';

export const COOKIES_PREFERENCES_KEY = 'cookie-preferences';

export interface CookiesPreferences {
  realUserMonitoring: boolean;
}

const defaultCookiePreferences: CookiesPreferences = {
  realUserMonitoring: false
};

@Injectable({ providedIn: 'root' })
export class CookiesService {
  constructor(private dynatraceService: DynatraceService, private gtmService: GtmService) {}

  getCookiePreferencesExist(): boolean {
    return Boolean(this.getPersistedCookiePreferences());
  }

  getCookiePreference(cookieName: keyof CookiesPreferences): boolean {
    return this.getAllCookiePreferences()[cookieName];
  }

  getAllCookiePreferences(): CookiesPreferences {
    return this.getPersistedCookiePreferences() || defaultCookiePreferences;
  }

  resetCookiePreferences(): void {
    localStorage.removeItem(COOKIES_PREFERENCES_KEY);
  }

  setAllCookiesDisabled(): void {
    this.setAllCookiePreferences(
      Object.keys(defaultCookiePreferences).reduce(
        (cookiePreferences, cookieName) => ({
          ...cookiePreferences,
          [cookieName]: false
        }),
        {} as CookiesPreferences
      )
    );
  }

  setAllCookiesEnabled(): void {
    this.setAllCookiePreferences(
      Object.keys(defaultCookiePreferences).reduce(
        (cookiePreferences, cookieName) => ({
          ...cookiePreferences,
          [cookieName]: true
        }),
        {} as CookiesPreferences
      )
    );
  }

  setAllCookiePreferences(preferences: CookiesPreferences): void {
    localStorage.setItem(COOKIES_PREFERENCES_KEY, JSON.stringify(preferences));
  }

  setCookiePreference(cookieName: keyof CookiesPreferences, enabled: boolean): void {
    const existingCookiePreferences = this.getAllCookiePreferences();

    this.setAllCookiePreferences({
      ...existingCookiePreferences,
      [cookieName]: enabled
    });
  }

  start() {
    // run any cookie-driven processes here, driven by current preferences
    if (this.getCookiePreference('realUserMonitoring')) {
      this.dynatraceService.start();
      // GTM/GA rides on the same "additional cookies" preference as Dynatrace
      // until a dedicated analytics category exists in the cookie banner.
      this.gtmService.start();
    }
  }

  stop() {
    this.dynatraceService.stop();
    this.gtmService.stop();
  }

  restart() {
    this.stop();
    this.start();
  }

  enterAction(
    actionName: string,
    actionType?: string,
    startTime?: number,
    sourceUrl?: string
  ): number | null {
    return this.dynatraceService.enterAction(actionName, actionType, startTime, sourceUrl);
  }

  leaveAction(actionId: number, stopTime?: number, startTime?: number): void {
    this.dynatraceService.leaveAction(actionId, stopTime, startTime);
  }
  private getPersistedCookiePreferences(): CookiesPreferences | null {
    const serializedPreferences = localStorage.getItem(COOKIES_PREFERENCES_KEY);

    if (serializedPreferences) {
      try {
        return {
          // spread default preferences prior to persisted preferences to ensure
          // any newly added preferences are present
          ...defaultCookiePreferences,
          ...JSON.parse(serializedPreferences)
        };
      } catch {
        // if persisted cookie preferences cannot be parsed for some reason,
        // treat them as not having been persisted
      }
    }
    return null;
  }
}
