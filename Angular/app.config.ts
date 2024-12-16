/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_BASE_HREF, PlatformLocation } from '@angular/common';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';




export function Parse_URL_Base(target: PlatformLocation): string {
	// try parsing from DOM
	var output = target.getBaseHrefFromDOM().replace(/\/$/, "");
	if (output != '') {
		return output;
	}


	// no choice - construct from protocol, hostname, and port
	switch (target.protocol) {
	case 'http:':
	case 'https:':
		output = `${target.protocol}//`;
		break;
	default:
		output = `${target.protocol}`;
		break;
	}

	output += target.hostname;

	if (target.port != "") {
		output += `:${target.port}`;
	}

	return output;
}




export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideClientHydration(),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000'
		}), {
			provide: APP_BASE_HREF,
			useFactory: Parse_URL_Base,
			deps: [PlatformLocation],
		},
	]
};
