/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Routes } from '@angular/router';

import { METADATA_SITE } from "services/app/Metadata";

import { Page_Root } from "contents/Page";
import { Page_404 } from "contents/404/Page";
import { Page_Lang } from "contents/lang/Page";




export const routes: Routes = [
	// landing page
	{
		path: '',
		component: Page_Root,
		data: {
			lang: 'en',
		},
	},


	// main page
	{
		path: 'en',
		component: Page_Lang,
		data: {
			lang: 'en',
		},
	},


	// catch all
	{
		path: '**',
		component: Page_404,
		data: {
			lang: 'en',
		},
	},
];
