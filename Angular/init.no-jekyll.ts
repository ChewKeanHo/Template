/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import * as fs from 'fs';




/* exported function for creating the .nojekyll file */
export function Create_No_Jekyll() {
	const dir_build = 'assets';
	const filepath = dir_build + '/' + '.nojekyll';


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
	fs.writeFileSync(filepath, 'No Jekyll');


	/* report status */
	console.log(`✓ ${filepath} generated successfully.`);
}
