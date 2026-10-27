/**
 * Fallback list of the route titles set by @cpp/application's shared routes
 * (ERROR_PAGES_ROUTES and SYSTEM_ANNOUNCEMENT_ROUTES, published from cpp-ui-pdk2).
 *
 * Those titles already end in their own "| Common platform" suffix, so no suffix is added to them.
 * Core can't import @cpp/application: it depends on core, not the other way round. Apps should
 * pass those routes in through `completeTitleRoutes`, which always reflects the installed version.
 * This list is a safety net for an app that doesn't, so it never shows a doubled suffix.
 * Keep it in step with cpp-ui-pdk2 if those titles change.
 */
export const CPP_APPLICATION_PAGE_TITLES = [
  'Unauthorised access | Common platform',
  'Technical error | Common platform',
  'Page download error | Common platform',
  'Page not found | Common platform',
  'Signed out | Common platform',
  'Timed out | Common platform',
  'Service unavailable | Common platform',
  'System Announcements | Common platform'
];
