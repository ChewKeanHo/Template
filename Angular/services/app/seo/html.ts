/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import * as fs from 'fs';

import {
	Metadata_Site,
	Yield_Thumbnails,
	Yield_URL,
} from 'services/app/Definitions';




function _process_favicons(
	url_base: string,
	metadata: Metadata_Site,
	color_foreground: string,
): string {
	var html = '';
	var mask_icon = '';
	var sizes = '';
	var url = '';
	var icon_type = '';


	// execute
	for (var i = 0; i < metadata.Icons.length; i++) {
		if (metadata.Icons[i].Sources.length == 0) {
			continue;
		}

		url = Yield_URL(metadata.Icons[i].Sources[0].URL, url_base);
		if (url == '') {
			continue;
		}

		if (metadata.Icons[i].Width == 0 || metadata.Icons[i].Height == 0) {
			continue;
		}
		sizes = `${metadata.Icons[i].Width}x${metadata.Icons[i].Height}`;

		if (!metadata.Icons[i].Sources[0].Type.startsWith('image/')) {
			continue;
		}
		icon_type = `${metadata.Icons[i].Sources[0].Type}`;


		// render icon meta tag
		if (metadata.Icons[i].Purpose == 'maskable') {
			html += `

	<!-- Favicon ${sizes} -->
	<link rel='mask-icon'
		type='${icon_type}'
		sizes='${sizes}'
		href='${url}'
		color='${color_foreground}' />
`
		} else {
			html += `

	<!-- Favicon ${sizes} -->
	<link rel='icon'
		type='${icon_type}'
		sizes='${sizes}'
		href='${url}' />
`;
		}

		switch (sizes) {
		case "57x57":
		case "60x60":
		case "72x72":
		case "76x76":
		case "114x114":
		case "120x120":
		case "144x144":
		case "152x152":
		case "180x180":
			html += `	<link rel='apple-touch-icon'
		type='${icon_type}'
		sizes='${sizes}'
		href='${url}' />
`;

			if (sizes == '144x144') {
				html += `	<meta name='msapplication-TileImage'
		content='${url}' />
`;
			}
			break;
		default:
			break;
		}
	}


	// report status
	return html;
}




function _process_thumbnails(url_base: string, metadata: Metadata_Site): string {
	var html = '';
	var text = metadata.Name[metadata.Language_Default] || '$TITLE';

	var thumbnails = Yield_Thumbnails(
		metadata.Thumbnails,
		url_base,
		metadata.Language_Default,
		text,
	);


	var set_image_alt = false;
	var set_video_alt = false;
	for (var i = 0; i < thumbnails.length; i++) {
		if (thumbnails[i].Sources[0].Type.startsWith('image/')) {
			html += `

	<meta property="og:image" content="${thumbnails[i].Sources[0].URL}">
	<meta property="og:image:type" content="${thumbnails[i].Sources[0].Type}">
	<meta property="og:image:width" content="${thumbnails[i].Width}">
	<meta property="og:image:height" content="${thumbnails[i].Height}">`
			if (!set_image_alt) {
				html += `
	<meta property="og:image:alt" content="${text}">`;
				set_image_alt = true;
			}
		} else if (thumbnails[i].Sources[0].Type.startsWith('video/')) {
			html += `

	<meta property="og:video" content="${thumbnails[i].Sources[0].URL}">
	<meta property="og:video:type" content="${thumbnails[i].Sources[0].Type}">
	<meta property="og:video:width" content="${thumbnails[i].Width}">
	<meta property="og:video:height" content="${thumbnails[i].Height}">`
			if (!set_video_alt) {
				html += `
	<meta property="og:video:alt" content="${text}">`;
				set_image_alt = true;
			}
		} else if (thumbnails[i].Sources[0].Type.startsWith('audio/')) {
			html += `

	<meta property="og:audio" content="${thumbnails[i].Sources[0].URL}">
	<meta property="og:audio:type" content="${thumbnails[i].Sources[0].Type}">`
		}
	}


	// report status
	return html;
}




/* exported function for creating the web manifest file */
export function Create_HTML_Index(path_build: string, url_base: string, metadata: Metadata_Site) {
	const filepath = path_build + '/' + '.root.html';
	const filepath_noscript = path_build + "/" + "noscript.html";


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


	/* parse notscript.html content */
	var noscript = '';
	if (fs.existsSync(filepath_noscript)) {
		noscript = fs.readFileSync(filepath_noscript, { encoding: 'utf8', flag: 'r' });
	}

	if (noscript == '') {
		noscript = '<h1>Javascript???</h1>';
	}


	/* process required data */
	var lang: string = metadata.Language_Default || 'en';
	var title: string = metadata.Name[lang] || '$TITLE';
	var description: string = metadata.Description[lang] || '$DESCRIPTION';
	var color_foreground: string = metadata.Color_Theme_Foreground || '#FFFF00';
	var color_background: string = metadata.Color_Theme_Background || '#000428';

	var keywords_list: string[] = metadata.Keywords[lang] || [];
	if (keywords_list.length == 0) {
		keywords_list = [ 'KEYWORDS' ];
	}
	var keywords: string = keywords_list.join(', ');
	var og_thumbnails: string = _process_thumbnails(url_base, metadata);
	var favicons: string = _process_favicons(url_base, metadata, color_foreground);


	/* create new file */
	fs.writeFileSync(filepath, `<!doctype html>
<html lang="${lang}">
<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<base href="${url_base || '/'}">
	<title>${title}</title>
	<meta name="description" content="${description}" />
	<meta name="keywords" content="${keywords}" />
	<meta name="color-scheme" content="light dark" />


	<!-- PWA -->
	<link rel="icon" type="image/x-icon" href="${Yield_URL("/logos/icon.ico", url_base)}" />
	<link rel="manifest" href="${Yield_URL("/manifest.webmanifest", url_base)}" />
	<meta name="theme-color" content="${color_foreground}" />
	<meta name="msapplication-TileColor" content="${color_background}" />
	<meta name="msapplication-config" content="${Yield_URL("/browserconfig.xml", url_base)}" />
${favicons}


	<!-- Open Graph -->
	<meta property="og:title" content="${title}" />
	<meta property="og:site_name" content="${title}" />
	<meta property="og:locale" content="${lang}" />
	<meta property="og:description" content="${description}" />
	<meta property="og:url" content="${url_base}" />
${og_thumbnails}


	<!-- LD+JSON -->
	<script type="application/ld+json"></script>


	<!-- ENGINE TAKE OVER -->
</head>
<body>
	<main>
		<app-root></app-root>
		<div><noscript style='
			position: absolute;
			top: -100%;
			left: 0%;
			height: 100vh;
			width: 100%;
			background-size: 300% 300%;
			background-image: linear-gradient(-45deg,
				${color_background} 0%,
				${color_background} 100%
			);
			color: ${color_foreground};
		'>
			${noscript}
		</noscript></div>
	</main>
	<footer><app-footer></app-footer></footer>
</body>
</html>
`);


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
