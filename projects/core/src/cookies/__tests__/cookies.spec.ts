import { TestBed } from '@angular/core/testing';
import { CookiesPreferences } from '../cookies.service';
import { provideCppCookieServices } from '../providers';
import { CookiesService, COOKIES_PREFERENCES_KEY } from '../cookies.service';
import { DynatraceService } from '../dynatrace/dynatrace.service';
import { GtmService } from '../gtm/gtm.service';

describe('CookiesModule', () => {
  let cookiesService: CookiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideCppCookieServices()]
    });

    cookiesService = TestBed.inject(CookiesService);
  });

  const installCookiePreferences = (preferences: CookiesPreferences) => {
    localStorage.setItem(COOKIES_PREFERENCES_KEY, JSON.stringify(preferences));
  };

  describe('CookiesService', () => {
    describe('when no preferences have previously been set', () => {
      it('should recognise that cookie preferences have not been persisted', () => {
        const hasExistingPreferences = cookiesService.getCookiePreferencesExist();

        expect(hasExistingPreferences).toEqual(false);
      });

      it('should get the default cookies preferences', () => {
        const preferences = cookiesService.getAllCookiePreferences();
        expect(preferences).toMatchSnapshot();
      });
    });

    describe('when cookie preferences have previously been set', () => {
      beforeEach(() => {
        installCookiePreferences({ realUserMonitoring: true });
      });

      it('should recognise that cookie preferences have been persisted', () => {
        const hasExistingPreferences = cookiesService.getCookiePreferencesExist();

        expect(hasExistingPreferences).toEqual(true);
      });

      it('should get a single cookie preference', () => {
        const preference = cookiesService.getCookiePreference('realUserMonitoring');

        expect(preference).toEqual(true);
      });

      it('should get all the persisted cookie preferences', () => {
        const preferences = cookiesService.getAllCookiePreferences();

        expect(preferences).toEqual({
          realUserMonitoring: true
        });
      });

      it('should set all cookies disabled', () => {
        cookiesService.setAllCookiesDisabled();

        const preferences = JSON.parse(localStorage.getItem(COOKIES_PREFERENCES_KEY) || '');

        expect(preferences).toEqual({
          realUserMonitoring: false
        });
      });

      it('should reset the cookie preferences', () => {
        cookiesService.resetCookiePreferences();

        expect(localStorage.getItem(COOKIES_PREFERENCES_KEY)).toBeFalsy();
      });
    });

    it('should set all cookies enabled', () => {
      cookiesService.setAllCookiesEnabled();

      const preferences = JSON.parse(localStorage.getItem(COOKIES_PREFERENCES_KEY) || '');

      expect(preferences).toEqual({
        realUserMonitoring: true
      });
    });

    it('should set a single cookie preference', () => {
      cookiesService.setCookiePreference('realUserMonitoring', true);

      const { realUserMonitoring } = JSON.parse(
        localStorage.getItem(COOKIES_PREFERENCES_KEY) || ''
      );

      expect(realUserMonitoring).toEqual(true);
    });

    it('should set all cookie preferences', () => {
      cookiesService.setAllCookiePreferences({ realUserMonitoring: true });

      const preferences = JSON.parse(localStorage.getItem(COOKIES_PREFERENCES_KEY) || '');

      expect(preferences).toMatchSnapshot();
    });

    it('should manage the real user monitoring', () => {
      const dtrum: DynatraceService = TestBed.inject(DynatraceService);
      dtrum.start = jest.fn();
      dtrum.stop = jest.fn();

      installCookiePreferences({ realUserMonitoring: true });
      cookiesService.start();
      expect(dtrum.start).toHaveBeenCalled();
      expect(dtrum.stop).not.toHaveBeenCalled();

      dtrum.start = jest.fn();
      dtrum.stop = jest.fn();

      installCookiePreferences({ realUserMonitoring: false });
      cookiesService.restart();
      expect(dtrum.start).not.toHaveBeenCalled();
      expect(dtrum.stop).toHaveBeenCalled();
    });

    it('should manage GTM alongside the real user monitoring preference', () => {
      const gtm: GtmService = TestBed.inject(GtmService);
      gtm.start = jest.fn();
      gtm.stop = jest.fn();

      installCookiePreferences({ realUserMonitoring: true });
      cookiesService.start();
      expect(gtm.start).toHaveBeenCalled();
      expect(gtm.stop).not.toHaveBeenCalled();

      gtm.start = jest.fn();
      gtm.stop = jest.fn();

      installCookiePreferences({ realUserMonitoring: false });
      cookiesService.restart();
      expect(gtm.start).not.toHaveBeenCalled();
      expect(gtm.stop).toHaveBeenCalled();
    });
  });
});
