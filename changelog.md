Change Log
==========

V1.0

- one account (this.s.UA = '')
- multiple accounts (this.s.UA = [])
- cross domain (this.s.domains.length > 1)
- cross domain links that open in a new window
- cross domain across non combined root level domains (no objects in this.s.domains)
- cross domain across non combined sub domains (no objects in this.s.domains)
- cross domain across combined sub domains (objects in this.s.domains using {entity:'',subs:['']})

  - this resets to domain property to the entity level and doesn't need to pass longer url on links and forms
  
- setting to set subdomains to track as their parent
- cross domain on multiple accounts
- All cross domain and multiple accounts work in same or new window
- virtual page views for:

  - external links (this.s.track_external_links)
  - assets (this.s.asset_extentions)
  - assets track in AMM preview
  
- All virtual page views in same window or new or frame name
- All virtual page views work for multiple accounts
- ecommerce (also for multiple accounts)
- forms across multiple domains in same window
- forms across multiple domains in new window / iframe
- forms across multiple domains with multiple accounts same / new window / frame
- In all domain matching ://www. = :// (this.s.domains, links, forms)
- Track event to all active ua accounts through method

V1.1

- Only track specific domains
- Exclude sub domains from tracking

V1.2

- Track virtual page views for # links
- Disable cross domain tracking if this.o.domains is defined but does not contain the current domain
- Bug fix: links with nested html tags caused an error because of event bubbling

V1.3

- Special characters no longer through an error
- Don't track links with href starting with "javascript:"

V1.4

- Adding prefix settings for vpv, asset, hash links, external forms not in cross domain
- Adding asset extensions xlsx, js, css, eot, svg, ttf, woff, otf
- Debug Mode setting for alerting on same page views
- Malto link tracking, extendable for future protocols
- External form submissions not in cross domain definition as vpv

V1.5

- Fixed Bug in get form cross domain tracking
- Fixed bug recognizing asset links in the amm in preview
- Matching cross domains with ?'s and #'s

V1.6

- Added this.s.no_track_class
- Imporved matching for disabled cross domain matching for absolute urls to the same domain
- Hash links don't need to offset default action, interferes with js events

V1.7

- Adding Custom Variable Tracking
- Adding Social tracking method and auto configuration

V1.8

- Fixing social tracking, updated events listened to
- 1.8.1 fixed same domain matching with cross domain turned on
- 1.8.2 asset absolute links to same domain track as asset not external
- 1.8.3 added _setAllowAnchor for GET method forms in cross domain

  - http://code.google.com/apis/analytics/docs/gaJS/gaJSApiCampaignTracking.html
  - https://groups.google.com/a/googleproductforums.com/forum/#!category-topic/analytics/asynchronous-tracking-code-snippet/w_8VlVFjKMM
  
- 1.8.4 Prefer events to virtual page views
- 1.8.5 link_virtual was double tracking events when multiple codes were active
- 1.8.6 update to work of jQuery.deligate for ajax inserted links

  - Optimized performance to evaluate link on clink instead of all at page load
  - Don't need to wait for $(document).ready
  - links and forms starting with "//" for the href or action
  - Prefer link title tags to href as a setting
  - Adjusted automated event categories

V1.9

- Better compatibility with other javascript listeners
- IE8 and lower maintain referral headers
- Tracking right clicks
- Bounce defeat
- Session Keeper
- Day of Week Tracker
- Hour of Day Tracker
- External form pause
- Minor refactors

V1.9.1
- Fixing cross domain disabling for external links when only one domain is listed