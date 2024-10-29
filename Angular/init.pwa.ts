/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Get_Base_URL, METADATA_SITE, Yield_URL } from './init.metadata';
import * as fs from 'fs';




/* generate manifest.webmanifest with site data */
function generate_web_manifest(): any {
	const base = Get_Base_URL();


	/* create default settings */
	var manifest = {
		name: "TITLE",
		short_name: "BRAND",
		lang: "en",
		description: "DESCRIPTION",
		categories: [
			"website",
			"webapp",
			"app",
		],
		id: "/",
		start_url: "/",
		scope: "/",
		display: "standalone",
		display_override: [
			"standalone",
			"minimal-ui",
			"browser"
		],
		orientation: "any",
		theme_color: "#0000FF",
		background_color: "#021B79",
		protocol_handlers: [
			{ protocol: "web+brand", url: "/?query=%s" },
		],
		prefer_related_applications: false,
		related_applications: [{
			id: "/",
			platform: "webapp",
			url: "/"
		}],
		screenshots: [{
			label: "Welcome",
			form_factor: "wide",
			sizes: "1200x630",
			src: Yield_URL("/screenshots/screenshot-welcome_1200x630.png", base),
			type: "image/png"
		}, {
			label: "Welcome",
			form_factor: "narrow",
			sizes: "630x1200",
			src: Yield_URL("/screenshots/screenshot-welcome_630x1200.png", base),
			type: "image/png"
		}, {
			label: "Welcome",
			sizes: "1200x1200",
			src: Yield_URL("/screenshots/screenshot-welcome_1200x1200.png", base),
			type: "image/png"
		}],
		shortcuts: [{
			description: "Dashboard",
			icons: [{
				purpose: "any",
				sizes: "1200x1200",
				src: Yield_URL("/logos/icon_1200x1200.png", base),
				type: "image/png"
			}],
			name: "Dashboard",
			short_name: "Dashboard",
			url: "/"
		}],
		icons: [{
			src: Yield_URL("/logos/icon_57x57.png", base),
			sizes: "57x57",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_60x60.png", base),
			sizes: "60x60",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_70x70.png", base),
			sizes: "70x70",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_72x72.png", base),
			sizes: "72x72",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_76x76.png", base),
			sizes: "76x76",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_96x96.png", base),
			sizes: "96x96",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_114x114.png", base),
			sizes: "114x114",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_120x120.png", base),
			sizes: "120x120",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_128x128.png", base),
			sizes: "128x128",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_144x144.png", base),
			sizes: "144x144",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_150x150.png", base),
			sizes: "150x150",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_152x152.png", base),
			sizes: "152x152",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_180x180.png", base),
			sizes: "180x180",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_192x192.png", base),
			sizes: "192x192",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_310x310.png", base),
			sizes: "310x310",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_384x384.png", base),
			sizes: "384x384",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_480x480.png", base),
			sizes: "480x480",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_512x512.png", base),
			sizes: "512x512",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_1024x1024.png", base),
			sizes: "1024x1024",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_1200x1200.svg", base),
			sizes: "1200x1200",
			type: "image/svg+xml",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon_1200x1200.png", base),
			sizes: "1200x1200",
			type: "image/png",
			purpose: "any"
		}, {
			src: Yield_URL("/logos/icon-monochrome_1200x1200.svg", base),
			sizes: "1200x1200",
			type: "image/svg+xml",
			purpose: "maskable"
		}]
	}


	/* check and overrides */
	if (!METADATA_SITE) {
		return manifest;
	}

	if (METADATA_SITE.Name) {
		if (METADATA_SITE.Name.en) {
			manifest.name = METADATA_SITE.Name.en;
		}
	}

	if (METADATA_SITE.SKU) {
		manifest.short_name = METADATA_SITE.SKU;
	}

	if (METADATA_SITE.Description) {
		if (METADATA_SITE.Description.en) {
			manifest.description = METADATA_SITE.Description.en;
		}
	}

	if (METADATA_SITE.Keywords) {
		if (METADATA_SITE.Keywords.en) {
			manifest.categories = METADATA_SITE.Keywords.en;
		}
	}

	if (METADATA_SITE.Color_Theme_Foreground) {
		manifest.theme_color = METADATA_SITE.Color_Theme_Foreground;
	}

	if (METADATA_SITE.Color_Theme_Background) {
		manifest.background_color = METADATA_SITE.Color_Theme_Background;
	}

	if (METADATA_SITE.ID) {
		manifest.id = METADATA_SITE.ID;
	}


	/* return output */
	return manifest;
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
