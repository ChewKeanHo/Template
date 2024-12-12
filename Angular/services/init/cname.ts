/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { METADATA_SITE } from '../app/metadata';
import { Get_Base_URL } from './url';
import * as fs from 'fs';




/* exported function for creating the CNAME configuration file */
export function Create_CNAME() {
	const dir_build = 'assets';
	const filepath = dir_build + '/' + 'CNAME';


	/* check for requirement */
	if (!METADATA_SITE.ID_CNAME) {
		return;
	}


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
	fs.writeFileSync(filepath, METADATA_SITE.ID_CNAME);


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
