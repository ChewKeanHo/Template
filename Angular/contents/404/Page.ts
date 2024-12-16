/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';

import { Data_Page } from './data-i18n';




@Component({
	selector: 'page-404',
	imports: [RouterOutlet],
	templateUrl: './page.html',
	styleUrl: './page.css'
})
export class Page_404 {
	public constructor(
		private route: ActivatedRoute,
		public Metadata: Data_Page,
	) {
		this.Metadata.Init(route);
	}


	public ngOnInit() {
		if (!this.Metadata.Mode_Browser) {
			// server mode (SSR|SSG|pre-render)
			return;
		}

		// browser mode
	}
}
