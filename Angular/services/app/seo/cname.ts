/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import * as fs from 'fs';




/* exported function for creating the CNAME configuration file */
export function Create_CNAME(path_build: string, cname: string) {
	const filepath = path_build + '/' + 'CNAME';


	/* check for requirement */
	if (!cname) {
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
	if (!fs.existsSync(path_build)) {
		fs.mkdirSync(path_build, { recursive: true });
	}


	/* create new file */
	fs.writeFileSync(filepath, cname);


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
