/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF, DOCUMENT } from '@angular/common';

import { Yield_URL } from 'services/app/Definitions';




@Injectable({
	providedIn: 'root',
})
export class Service_URL {
	public constructor(
		@Inject(APP_BASE_HREF) private url_base: string,
		@Inject(DOCUMENT) private document: Document,
	) {}


	public Get_Base_URL(): string {
		var target = this.document.getElementsByTagName('base')[0].href;
		if (target != '/') {
			return target;
		}

		return this.url_base;
	}


	public Get_Current_URL(): string {
		return window.location.href;
	}


	public Must_Redirect_Base_URL(): boolean {
		return !this.Get_Current_URL().startsWith(this.Get_Base_URL());
	}


	public Redirect_To(url_given: string) {
		window.location.href = this.To_Absolute(url_given);
	}


	public To_Absolute(url_given: string): string {
		return Yield_URL(url_given, this.Get_Base_URL());
	}


	public Validate_Current_URL(url_given: string): boolean {
		// execute
		if (this.Must_Redirect_Base_URL()) {
			this.Redirect_To(url_given);
			return false;
		}

		return true;
	}
}
