/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import * as fs from 'fs';
import { join } from 'path';




export const METADATA_SITE = {
	Name: {
		"en": "Your Site-Level Website Name Here",
	},
	SKU: "brand-name-here",
	ID: "", // example: com.example.www.project
	Description: {
		"en": "Your site-level description here",
	},
	Keywords: {
		"en": [
			"keyword 1",
			"keyword 2",
		],
	},
	Color_Theme_Foreground: "#0000FF",
	Color_Theme_Background: "#021B79",
	Owner: [{
		"en": {
			Call_Sign: "any call sign or nickname",
			Title: "any given recongized title",
			Family_Name: "first name",
			Given_Name: "last name",
			Brand: "any associated trademark or brand",
			Description: "internal description here",
			Slogan: "the owner's tagline",
			Contacts: {
				Email: "name@domain.tld",
				Facebook: "https://www.facebook.com/USERNAME",
				BlueSky: "https://bsky.app/profile/USERNAME",
				Instagram: "https://www.instagram.com/USERNAME",
				Mastodon: "https://[SERVER]/@USERNAME",
				Call: "tel:123456789",
				WhatsApp: "https://wa.me/123456789",
				Telegram: "https://t.me/[LINK_OR_PHONE_NUMBER]"
			},
			Roles: [
				"Creator",
				"Contact",
				"Artwork",
				"Knowledge",
				"Editor",
				"Developer",
				"Maintainer",
				"Owner",
				"Producer",
				"Provider",
				"Publisher",
				"Reviewer",
				"Funder",
				"Sponsor"
			],
		}
	}],
};




export function Get_Base_URL(): string {
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
		const project_key = keys[0];
		const project = json.projects[project_key];

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
