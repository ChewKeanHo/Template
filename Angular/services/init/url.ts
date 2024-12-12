/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { isDevMode } from '@angular/core';
import * as fs from 'fs';
import { join } from 'path';




export function Get_Base_URL(): string {
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




export function Yield_URL(path: string, base_url: string): string {
	return base_url.replace(/\/$/, "") + '/' + path.replace(/^\//, "");
}
