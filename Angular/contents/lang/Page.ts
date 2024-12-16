/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

import { Data_Page } from './data-i18n';




@Component({
	selector: 'page-lang',
	imports: [RouterOutlet],
	templateUrl: './page.html',
	styleUrl: './page.css'
})
export class Page_Lang {
	public constructor(
		private route: ActivatedRoute,
		public Metadata: Data_Page,
	) {
		this.Metadata.Init(route);
	}


	public ngOnInit(): void {
		if (!this.Metadata.Mode_Browser) {
			// server mode (SSR|SSG|pre-render)
			return;
		}

		// browser mode
	}
}
