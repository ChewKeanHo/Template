/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { METADATA_SITE } from '../app/metadata';
import { Get_Base_URL, Yield_URL } from './url';
import * as fs from 'fs';




/* exported function for creating the browserconfig.xml file */
export function Create_Browser_Config_XML() {
	const dir_build = 'assets';
	const filepath = dir_build + '/' + 'browserconfig.xml';


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
	let data = Get_Base_URL();
	fs.writeFileSync(filepath,`<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
	<msapplication>
		<tile>
			<square150x150logo src="${Yield_URL("/logos/icon_150x150.png", data)}" />
			<TileImage src="${Yield_URL("/logos/icon_150x150.png", data)}" />
			<wide310x150logo src="${Yield_URL("/logos/icon_310x150.png", data)}" />
			<square310x310logo src="${Yield_URL("/logos/icon_310x310.png", data)}" />
			<square70x70logo src="${Yield_URL("/logos/icon_70x70.png", data)}" />
			<TileColor>${METADATA_SITE.Color_Theme_Background || '#021B79'}</TileColor>
		</tile>
	</msapplication>
</browserconfig>
`);


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
