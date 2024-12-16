/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import * as fs from 'fs';
import { join } from 'path';

import { Inject, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { App } from 'services/app/Root';
import { Init_Site } from 'services/app/seo/Start';

import { config } from './app.config.server';




function get_path_asset(): string {
	// this is the workspace pathing
	return "assets";
}




function get_path_app_root(): string {
	// this is the workspace pathing
	return "services/app";
}




function get_base_url(): string {
	if(isDevMode()) {
		return '';
	}

	try {
		// Read angular.json file
		const filepath = join(process.cwd(), 'angular.json');
		const file_content = fs.readFileSync(filepath, 'utf-8');

		// Parse JSON safely
		const json = JSON.parse(file_content);

		// Get first project key if project name not specified
		const keys = Object.keys(json.projects || {});
		if (keys.length === 0) {
			console.warn('No projects found in angular.json');
			return '';
		}
		const project = json.projects["app"];

		// Safely navigate the object structure
		const url = project?.architect?.build?.configurations?.production?.baseHref;

		// make sure the base url is the correct type and without tailing slash
		if (typeof url === 'string') {
			return url.replace(/\/$/, "");
		}
	} catch (error) {
		console.warn('Error reading baseHref from angular.json:', error);
	}

	return '';
}




/* main code */
Init_Site(get_path_app_root(),
	get_path_asset(),
	get_base_url(),
	'prerender-routes.txt',
);
const bootstrap = () => bootstrapApplication(App, config);
export default bootstrap;
