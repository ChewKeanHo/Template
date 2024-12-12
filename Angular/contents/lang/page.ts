/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Component, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { METADATA_SITE } from 'services/app/metadata';




@Component({
	selector: 'page-lang',
	imports: [RouterOutlet],
	templateUrl: './page.html',
	styleUrl: './page.css'
})
export class Page_Lang {
	/* system level settings */
	private is_browser_mode: boolean;

	public Lang: string;
	public Title: string;


	public constructor() {
		/* determine runtime mode */
		this.is_browser_mode = isPlatformBrowser(PLATFORM_ID);


		/* determine page language */
		this.Lang = 'en';
		this.Title = METADATA_SITE.Name[this.Lang];
	}


	public ngOnInit() {
		this.init_common();

		if (!this.is_browser_mode) {
			this.init_server_mode();
			return;
		}

		this.init_browser_mode();
	}


	private init_common() {
		return;
	}


	private init_server_mode() {
		return;
	}


	private init_browser_mode() {
		return;
	}
}
