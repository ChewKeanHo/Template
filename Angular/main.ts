/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from 'services/app/Root';
import { Footer } from 'services/app/Footer';

import { appConfig } from './app.config';




/* main code */
bootstrapApplication(App, appConfig)
	.catch((err) => console.error(err));
bootstrapApplication(Footer, appConfig)
	.catch((err) => console.error(err));
