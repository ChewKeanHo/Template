/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app.config.server';
import { App } from './services/app/root';
import { Create_Web_Manifest } from './services/init/pwa';
import { Create_CNAME } from './services/init/cname';
import { Create_SEO } from './services/init/seo';
import { Create_Browser_Config_XML } from './services/init/browserconfig-xml';
import { Create_No_Jekyll } from './services/init/no-jekyll';




/* initializing project's dynamic configurations */
Create_CNAME();
Create_Web_Manifest();
Create_SEO();
Create_Browser_Config_XML();
Create_No_Jekyll();




/* main code */
const bootstrap = () => bootstrapApplication(App, config);
export default bootstrap;
