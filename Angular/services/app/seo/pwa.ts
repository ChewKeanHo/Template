/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import * as fs from 'fs';

import {
	Application,
	Media,
	Metadata_Site,
	Protocol_Handler,
	Shortcut,
	Yield_URL,
} from 'services/app/Definitions';




function _process_icons(items: Media[], url_base: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		if (!items[i].Sources || items[i].Sources.length == 0) {
			continue;
		}

		if (items[i].Sources[0].Type == '') {
			continue;
		}

		if (items[i].Width == 0 || items[i].Height == 0) {
			continue;
		}

		if (items[i].Purpose == '') {
			items[i].Purpose = 'any'
		}

		list.push({
			src: Yield_URL(items[i].Sources[0].URL, url_base),
			sizes: `${items[i].Width}x${items[i].Height}`,
			type: items[i].Sources[0].Type,
			purpose: items[i].Purpose,
		});
	}


	// report status
	return list;
}




function _process_protocol_handlers(items: Protocol_Handler[], name_short: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		if (items[i].URL == '') {
			continue;
		}

		if (items[i].Protocol == '') {
			continue;
		} else if (items[i].Protocol == '/') {
			items[i].Protocol = `web+${name_short}`;
		}

		list.push({
			protocol: items[i].Protocol,
			url: items[i].URL,
		});
	}


	// report status
	return list;
}




function _process_related_applications(items: Application[], url_base: string, sku: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		if (items[i].URL == '') {
			continue;
		}

		if (items[i].ID == '') {
			continue;
		} else if (items[i].ID == '/') {
			items[i].ID = sku;
		}

		switch (items[i].Platform) {
		case 'chrome_web_store':
		case 'play':
		case 'chromeos_play':
		case 'webapp':
		case 'windows':
		case 'f-droid':
		case 'amazon':
			break;
		default:
			continue;
		}

		list.push({
			id: items[i].ID,
			platform: items[i].Platform,
			url: Yield_URL(items[i].URL, url_base),
		});
	}


	// report status
	return list;
}




function _process_screenshots(items: Media[], lang: string, url_base: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		if (!items[i].Sources || items[i].Sources.length == 0) {
			continue;
		}

		switch (items[i].Form_Factor) {
		case "NARROW":
		case "Narrow":
		case "narrow":
			list.push({
				label: items[i].Text[lang] || '',
				form_factor: "narrow",
				src: Yield_URL(items[i].Sources[0].URL, url_base),
				sizes: `${items[i].Width}x${items[i].Height}`,
				type: items[i].Sources[0].Type,
			});
			break;
		case "WIDE":
		case "Wide":
		case "wide":
			list.push({
				label: items[i].Text[lang] || '',
				form_factor: "wide",
				src: Yield_URL(items[i].Sources[0].URL, url_base),
				sizes: `${items[i].Width}x${items[i].Height}`,
				type: items[i].Sources[0].Type,
			});
			break;
		default:
			list.push({
				label: items[i].Text[lang] || '',
				src: Yield_URL(items[i].Sources[0].URL, url_base),
				sizes: `${items[i].Width}x${items[i].Height}`,
				type: items[i].Sources[0].Type,
			});
			break;
		}
	}


	// report status
	return list;
}




function _process_shortcuts(items: Shortcut[], lang: string, url_base: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		if (items[i].Name_Long[lang] == '') {
			continue
		}

		if (items[i].Name_Short[lang] == '') {
			continue
		}

		if (items[i].URL == '') {
			continue
		}

		list.push({
			description: items[i].Description[lang],
			icons: _process_icons(items[i].Icons, url_base),
			name: items[i].Name_Long[lang],
			short_name: items[i].Name_Short[lang],
			url: items[i].URL,
		});
	}


	// report status
	return list;
}




/* generate manifest.webmanifest with site data */
function generate_web_manifest(url_base: string, metadata: Metadata_Site): any {
	const lang = metadata.Language_Default;


	/* create settings content */
	return {
		name: metadata.Name[lang],
		short_name: metadata.ID_SKU,
		lang: lang,
		description: metadata.Description[lang],
		categories: metadata.Keywords[lang],
		id: metadata.ID,
		start_url: metadata.Protocol.Start,
		scope: metadata.Protocol.Scope,
		protocol_handlers: _process_protocol_handlers(
			metadata.Protocol.Handlers,
			metadata.ID_APP,
		),
		display: metadata.Display.Primary,
		display_override: metadata.Display.Overrides,
		orientation: metadata.Display.Orientation,
		theme_color: metadata.Color_Theme_Foreground,
		background_color: metadata.Color_Theme_Background,
		prefer_related_applications: metadata.Related_Application.Prioritized,
		related_applications: _process_related_applications(
			metadata.Related_Application.List,
			url_base,
			metadata.ID_SKU,
		),
		screenshots: _process_screenshots(
			metadata.Screenshots,
			lang,
			url_base,
		),
		shortcuts: _process_shortcuts(
			metadata.Shortcuts,
			lang,
			url_base,
		),
		icons: _process_icons(
			metadata.Icons,
			url_base,
		),
	}
}




/* exported function for creating the web manifest file */
export function Create_Web_Manifest(path_build: string, url_base: string, metadata: Metadata_Site) {
	const filepath = path_build + '/' + 'manifest.webmanifest';


	/* bail if file exists */
	try {
		if (fs.existsSync(filepath)) {
			return;
		}
	} catch {
		;
	}


	/* create directory */
	if (!fs.existsSync(path_build)) {
		fs.mkdirSync(path_build, { recursive: true });
	}


	/* create new file */
	const data = generate_web_manifest(url_base, metadata);
	fs.writeFileSync(filepath, JSON.stringify(data, null, 2));


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
