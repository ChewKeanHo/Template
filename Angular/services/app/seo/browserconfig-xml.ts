/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import * as fs from 'fs';

import { Yield_URL } from 'services/app/Definitions';




/* exported function for creating the browserconfig.xml file */
export function Create_Browser_Config_XML(
	path_build: string,
	url_base: string,
	color_background: string,
) {
	const filepath = path_build + '/' + 'browserconfig.xml';


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
	fs.writeFileSync(filepath,`<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
	<msapplication>
		<tile>
			<square150x150logo src="${Yield_URL("/logos/icon_150x150.png", url_base)}" />
			<TileImage src="${Yield_URL("/logos/icon_150x150.png", url_base)}" />
			<wide310x150logo src="${Yield_URL("/logos/icon_310x150.png", url_base)}" />
			<square310x310logo src="${Yield_URL("/logos/icon_310x310.png", url_base)}" />
			<square70x70logo src="${Yield_URL("/logos/icon_70x70.png", url_base)}" />
			<TileColor>${color_background || '#021B79'}</TileColor>
		</tile>
	</msapplication>
</browserconfig>
`);


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
