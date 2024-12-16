/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Inject, Injectable } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { Yield_URL } from 'services/app/Definitions';




@Injectable({
	providedIn: 'root',
})
export class Service_URL {
	public constructor(
		@Inject(APP_BASE_HREF) private url_base: string,
	) {}


	public Get_Base_URL(): string {
		return this.url_base;
	}


	public To_Absolute(url_given: string): string {
		return Yield_URL(url_given, this.url_base);
	}
}
