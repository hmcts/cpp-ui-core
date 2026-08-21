import { TestBed } from '@angular/core/testing';
import { GtmService } from '../gtm/gtm.service';

describe('GtmService', () => {
  afterEach(() => {
    delete window.dataLayer;
    document.querySelectorAll('script[src*="googletagmanager.com"]').forEach((el) => el.remove());
  });

  describe('when no GTM container id is configured', () => {
    let gtmService: GtmService;

    beforeEach(() => {
      gtmService = TestBed.inject(GtmService);
    });

    it('should not inject the GTM script', () => {
      gtmService.start();

      expect(document.querySelector('script[src*="googletagmanager.com"]')).toBeNull();
    });

    it('should not push events', () => {
      gtmService.start();
      gtmService.pushEvent({ event: 'test' });

      expect(window.dataLayer).toBeUndefined();
    });

    it('should inject the script once configured at runtime', () => {
      gtmService.configure({ containerId: 'GTM-123TEST' });
      gtmService.start();

      const script = document.querySelector<HTMLScriptElement>(
        'script[src*="googletagmanager.com"]'
      );
      expect(script?.src).toContain('id=GTM-123TEST');
    });
  });

  describe('when a GTM container id is configured', () => {
    let gtmService: GtmService;

    beforeEach(() => {
      gtmService = TestBed.inject(GtmService);
      gtmService.configure({ containerId: 'GTM-123TEST' });
    });

    it('should initialise the dataLayer and inject the GTM script on start', () => {
      gtmService.start();

      expect(window.dataLayer).toBeDefined();
      expect(window.dataLayer?.[0]).toEqual(expect.objectContaining({ event: 'gtm.js' }));

      const script = document.querySelector<HTMLScriptElement>(
        'script[src*="googletagmanager.com"]'
      );
      expect(script).not.toBeNull();
      expect(script?.src).toContain('id=GTM-123TEST');
    });

    it('should not inject the script more than once across restarts', () => {
      gtmService.start();
      gtmService.stop();
      gtmService.start();

      expect(document.querySelectorAll('script[src*="googletagmanager.com"]').length).toEqual(1);
    });

    it('should push events once started', () => {
      gtmService.start();
      gtmService.pushEvent({ event: 'test-event' });

      expect(window.dataLayer).toEqual(
        expect.arrayContaining([expect.objectContaining({ event: 'test-event' })])
      );
    });

    it('should not push events after being stopped', () => {
      gtmService.start();
      gtmService.stop();
      gtmService.pushEvent({ event: 'test-event' });

      expect(window.dataLayer).not.toEqual(
        expect.arrayContaining([expect.objectContaining({ event: 'test-event' })])
      );
    });
  });
});
