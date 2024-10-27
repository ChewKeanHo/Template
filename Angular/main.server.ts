/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app.config.server';
import { App } from './app';




const bootstrap = () => bootstrapApplication(App, config);




export default bootstrap;
