/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Metadata_Page } from 'services/app/Definitions';
import { Service_Page, METADATA_SITE } from 'services/app/Metadata';




@Injectable({
	providedIn: 'root',
})
export class Data_Page extends Metadata_Page {
	public constructor(
		private service: Service_Page,
	) {
		super();
	}


	public Init(route: ActivatedRoute) {
		// setting functional metadata
		this.Mode_Browser = isPlatformBrowser(PLATFORM_ID);
		this.URL = route.snapshot.url.toString();
		this.Site = METADATA_SITE;


		// setting language-specific metadata
		switch (route.snapshot.data['lang']) {
		case 'en':
		case 'en-Latn':
		default:
			// English (en)
			this.Lang = 'en';
			this.Title = '404';
			this.Description = 'Page Not Found';
			this.Keywords = 'website, 404';
			break;
		}


		// initiate the page
		this.service.Init(this);
	}
}
