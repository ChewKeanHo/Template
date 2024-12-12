/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './services/app/root';
import { Footer } from './services/app/footer';




/* main code */
bootstrapApplication(App, appConfig)
	.catch((err) => console.error(err));
bootstrapApplication(Footer, appConfig)
	.catch((err) => console.error(err));
