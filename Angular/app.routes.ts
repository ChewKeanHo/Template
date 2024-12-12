/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Routes } from '@angular/router';

import { Page_Root } from "./contents/page";
import { Page_404 } from "./contents/404/page";
import { Page_Lang } from "./contents/lang/page";




export const routes: Routes = [
	// landing page
	{
		path: '',
		component: Page_Root,
		data: {
			lang: '',
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
	},
];
