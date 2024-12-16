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
		private route: ActivatedRoute,
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
			this.Title = this.Site.Name[this.Lang];
			this.Description = 'Hello World';
			this.Keywords = 'website, landing, root';
			break;
		}


		// initiate the page
		this.service.Init(this);
	}
}
