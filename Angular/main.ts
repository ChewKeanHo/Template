/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { App } from './app';




/* main code */
bootstrapApplication(App, appConfig)
	.catch((err) => console.error(err));
