/*
Project Name: GA Aware
URL: https://github.com/keobrien/GA-Aware
Author: Kevin O'Brien
Company: Clockwork Active Media Systems
Company Site: clockwork.net
License: MIT
Copyright (C) 2013 Clockwork Active Media Systems
Version: 2.0

 * UA                    string/array                   UA code(s) active on page.  All api calls will send to all active codes
 * alt_UA                string/array                   UA code(s) active when GA Aware is disabled. Usually used to verify in test environments
 * api_url               string                         URL of Google Analytic's js code.  Changed when using demegraphics or double click advertizing tracking
 * current_domain        string                         Used to check cross domain and external links against.  Can be used to test how GA Aware will react in a different environment
 * domains               array                          Defines cross domain configuration
 * enabled               bool                           Turn GA Aware on/off
 * include_only          array                          List of domains that GA Aware is allowed on.  Will use alt UA code on all other domains
 * exclude_subdomains    array                          If any subdomain parts match one of these GA Aware will use the alt ua code
 * no_track_class        string                         If an element has this CSS class and initiates a GA Aware action, it will be ignored

- Debugm, debug_mode changed
- settings.d -> current_domain
- settings.track -> enabled
- settings.demographics_tracking -> api_url
**************************************/
//https://developers.google.com/analytics/devguides/collection/upgrade/reference/gajs-analyticsjs
(function ($) { "use strict";
	var data_key        =  'gaaware-options',  // Namespace plugin data
		event_suffix    =  '.gaaware',         // Namspace events
		current_domain  =  window.document.domain;
	
	var methods  =  {
		init  :  function (settings) {
			var $el  =  $(this),
				options = $.extend({
					// UA Code Settings
					UA:                     'UA-NNNNNN-N',
					alt_UA:                 [],
					api_url:                'http://www.google-analytics.com/analytics.js',
					api_name:               'ga',
					current_domain:         window.document.domain, // Changed from "d"
					// Cross Domain
					domains:                [],
					// Activation/Disabling
					enabled:                true,
					include_only:           null,
					exclude_subdomains:     ['preview', 'dev', 'test', 'stage', 'review', 'demo', 'train'],
					no_track_class:         'ga_notrack',
					// Customizations
					asset_extentions:       ['pdf', 'txt', 'csv', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'jpg', 'jpeg', 'png', 'gif', 'psd', 'ai', 'eps', 'zip', 'xml', 'json', 'avi', 'mp4', 'mp3', 'mov', 'mpeg', 'wmv', 'rtf', 'swf', 'flv', 'js', 'css', 'eot', 'svg', 'ttf', 'woff', 'otf'],
					track_alt_protocols:    ['mailto', 'spotify', 'ftp', 'file', 'tel'],
					track_external_links:   true,
					track_as_events:        true,
					auto_track_page_view:   true,
					custom_vars:            [],
					auto_social:            false,
					enable_facebook:        true,
					enable_twitter:         true,
					prefer_title:           true,
					track_right_clicks:     true,
					bouce_defeat:           30000,
					session_keeper:         1500000,
					dow_custom_var:         4,
					hod_custom_var:         5,
					enhanced_link_attribution: false,
					social_page_url:        null,
					// Taxonomy Configuration
					vpv_prefix:             '/vpv',
					external_prefix:        'External',
					asset_prefix:           'Asset',
					hash_prefix:            'Hash',
					external_form_prefix:   'Form',
					cross_domain_prefix:    'CrossDomain'
				}, settings);

			options.UA = typeof options.UA === 'string' ? [options.UA] : options.UA;
			options.alt_UA = typeof options.alt_UA === 'string' ? [options.alt_UA] : options.alt_UA;

			// Default GA Tracking Loading
			(function(i,s,o,g,r,a,m){
				i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script',options.api_url,options.api_name);

			// Setup Trackers
			$(options.UA).each(function(i, val){
				window[options.api_name]('create', val);
			})

			$el
				.data(data_key, options)
				.gaaware('setup_listeners')
				.gaaware('pageview')

		},

		setup_listeners  :  function ( path ) {

			var $el      =  $(this),
				options  =  $el.data(data_key);

			$el.on('click', 'a:not(.'+options.no_track_class+')', {$el: $el}, methods._check_link_click_for_gaaware_action);
			$el.on('mousedown', 'a:not(.'+options.no_track_class+')', function(evt){
				if(options.track_right_clicks) {
					if((evt.which === 2) || (evt.which === 3)) {
						methods._check_link_click_for_gaaware_action.apply(this, [evt], true);
					}
				}
			});
			$el.on('submit', 'form:not(.'+options.no_track_class+')', methods._check_form_submit_for_gaaware_action);
			if(options.track_right_clicks) {
				
			}

			return this;
		},

		_check_link_click_for_gaaware_action  :  function( evt, is_secondary_click ) {

			var $el      =  $(evt.data.$el),
				options  =  $el.data(data_key),
				url      =  $(evt.currentTarget).attr('href'),
				proticol =  url.split('//');

			if((proticol === '' || 'http:' || 'https') && !$el.gaaware('url_matches_current_domain', url)) {
				// External
			}else {
				// Internal
			}

			return this;
		},

		_check_form_submit_for_gaaware_action  :  function( evt, is_secondary_click ) {

			var $el      =  $(this),
				options  =  $el.data(data_key),
				url      =  $(evt.currentTarget).attr('action');

			return this;
		},

		pageview  :  function( path ) {

			var $el      =  $(this),
				options  =  $el.data(data_key);

			path ? window[options.api_name]('send', 'pageview') : window[options.api_name]('send', 'pageview', path);

			return this;
		},

		url_matches_current_domain  :  function ( url ) {

			var $el        =  $(this),
				options    =  $el.data(data_key),
				url_split  =  url.split('//');
			
			if(!url_split[1]) { return true; }
			if(url_split[1] === options.current_domain) { return true; }
			return false;
			
		}
	}

	$.fn.gaaware  =  function (method) {
		var args = arguments;
		if (methods[method] && method.charAt(0) !== '_') {
			return $(this).map(function(i, val) { return methods[method].apply(this, Array.prototype.slice.call(args, 1)); });
		} else if (typeof method === 'object' || !method) {
			return $(this).map(function(i, val) { return methods.init.apply(this, args); });
		}
	};
})(jQuery);