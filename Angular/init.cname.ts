/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Get_Base_URL, METADATA_SITE } from './init.metadata';
import * as fs from 'fs';




const data = ''; // override the content here




/* exported function for creating the CNAME configuration file */
export function Create_CNAME() {
	const dir_build = 'assets';
	const filepath = dir_build + '/' + 'CNAME';


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
	if (data) {
		fs.writeFileSync(filepath, data);
	}


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
