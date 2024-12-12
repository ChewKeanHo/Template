/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Icon, Application, Protocol_Handler, Screenshot, Shortcut } from '../app/metadata-definitions';
import { METADATA_SITE } from '../app/metadata';
import { Get_Base_URL, Yield_URL } from './url';
import * as fs from 'fs';




function _process_icons(items: Icon[], url_base: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		if (items[i].Source == '') {
			continue;
		}

		if (items[i].Type == '') {
			continue;
		}

		if (items[i].Width == 0 || items[i].Height == 0) {
			continue;
		}

		if (items[i].Purpose == '') {
			items[i].Purpose = 'any'
		}

		list.push({
			src: Yield_URL(items[i].Source, url_base),
			sizes: `${items[i].Width}x${items[i].Height}`,
			type: items[i].Type,
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




function _process_related_applications(items: Application[], url_base: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		if (items[i].URL == '') {
			continue;
		}

		if (items[i].ID == '') {
			continue;
		} else if (items[i].ID == '/') {
			items[i].ID = METADATA_SITE.ID_SKU;
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




function _process_screenshots(items: Screenshot[], lang: string, url_base: string): any[] {
	var list = [];


	// process list data
	for (var i = 0; i < items.length; i++) {
		switch (items[i].Form_Factor) {
		case "NARROW":
		case "Narrow":
		case "narrow":
			list.push({
				label: items[i].Label[lang],
				form_factor: "narrow",
				src: Yield_URL(items[i].Source, url_base),
				sizes: `${items[i].Width}x${items[i].Height}`,
				type: items[i].Type,
			});
			break;
		case "WIDE":
		case "Wide":
		case "wide":
			list.push({
				label: items[i].Label[lang],
				form_factor: "wide",
				src: Yield_URL(items[i].Source, url_base),
				sizes: `${items[i].Width}x${items[i].Height}`,
				type: items[i].Type,
			});
			break;
		default:
			list.push({
				label: items[i].Label[lang],
				src: Yield_URL(items[i].Source, url_base),
				sizes: `${items[i].Width}x${items[i].Height}`,
				type: items[i].Type,
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
function generate_web_manifest(): any {
	const url_base = Get_Base_URL();
	const lang = METADATA_SITE.Language_Default;


	/* create settings content */
	return {
		name: METADATA_SITE.Name[lang],
		short_name: METADATA_SITE.ID_SKU,
		lang: lang,
		description: METADATA_SITE.Description[lang],
		categories: METADATA_SITE.Keywords[lang],
		id: METADATA_SITE.ID,
		start_url: METADATA_SITE.Protocol.Start,
		scope: METADATA_SITE.Protocol.Scope,
		protocol_handlers: _process_protocol_handlers(
			METADATA_SITE.Protocol.Handlers,
			METADATA_SITE.ID_APP,
		),
		display: METADATA_SITE.Display.Primary,
		display_override: METADATA_SITE.Display.Overrides,
		orientation: METADATA_SITE.Display.Orientation,
		theme_color: METADATA_SITE.Color_Theme_Foreground,
		background_color: METADATA_SITE.Color_Theme_Background,
		prefer_related_applications: METADATA_SITE.Related_Application.Prioritized,
		related_applications: _process_related_applications(
			METADATA_SITE.Related_Application.List,
			url_base,
		),
		screenshots: _process_screenshots(
			METADATA_SITE.Screenshots,
			lang,
			url_base,
		),
		shortcuts: _process_shortcuts(
			METADATA_SITE.Shortcuts,
			lang,
			url_base,
		),
		icons: _process_icons(
			METADATA_SITE.Icons,
			url_base,
		),
	}
}




/* exported function for creating the web manifest file */
export function Create_Web_Manifest() {
	const dir_build = 'assets';
	const filepath = dir_build + '/' + 'manifest.webmanifest';


	/* bail if file exists */
	try {
		if (fs.existsSync(filepath)) {
			return;
		}
	} catch {
		;
	}


	/* create directory */
	if (!fs.existsSync(dir_build)) {
		fs.mkdirSync(dir_build, { recursive: true });
	}


	/* create new file */
	const data = generate_web_manifest();
	fs.writeFileSync(filepath, JSON.stringify(data, null, 2));


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
