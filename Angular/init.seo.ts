/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { Get_Base_URL, Yield_URL } from './init.metadata';
import * as fs from 'fs';
import * as path from 'path';




// add your url here
const url_add: string[] = [
];

// remove your url here
const url_remove: string[] = [
	'/404',
];

// robots.txt policy here
// NOTICE: DO NOT add 'Sitemap:'. It will be added automatically when available.
const robots_policy = `
User-agent: *
Allow: /
`



function time_pad(n: number) {
	return n < 10 ? '0' + n : n;
}




function time_timezone_offset(offset: number) {
	if (offset === 0) {
		return 'Z';
}

	const sign = offset > 0 ? '-' : '+';
	offset = Math.abs(offset);

	return sign + time_pad(Math.floor(offset / 60)) + ':' + time_pad(offset % 60);
}




function time_get_current_RFC3339(date: Date): string {
	return (
		date.getFullYear() +
		'-' +
		time_pad(date.getMonth() + 1) +
		'-' +
		time_pad(date.getDate()) +
		'T' +
		time_pad(date.getHours()) +
		':' +
		time_pad(date.getMinutes()) +
		':' +
		time_pad(date.getSeconds()) +
		time_timezone_offset(date.getTimezoneOffset())
	);
}




const sitemap_capacity_limit = 50000;
var time_updated =  time_get_current_RFC3339(new Date());



function create_sitemaps_page(directory: string, url_base: string, list: string[]): string[] {
	// filename: sitemap-page-%d.xml
	const filename = 'sitemap-page-';
	var count_sitemap = 0;
	const extension = '.xml';

	var count_url = sitemap_capacity_limit; // note: to spin immediately
	var url_path = '';
	var filepath = '';
	var list_sitemaps: string[] = [];

	const header = `<?xml version="1.0" encoding="utf-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
	const seal = `</urlset>\n`


	// validate before start
	if (list.length <= 0) {
		return list_sitemaps;
	}


	// loop through urls
	for (var i = 0; i < list.length; i++) {
		if (count_url >= sitemap_capacity_limit) {
			// seal the existing sitemap
			if (count_sitemap > 0) {
				fs.appendFileSync(filepath, seal);
			}


			// spin a new sitemap
			count_sitemap++;
			count_url = 0;
			filepath = filename + String(count_sitemap) + extension;
			url_path = Yield_URL(filepath, url_base);
			filepath = path.join(directory, filepath);


			// write the header
			fs.appendFileSync(filepath, header);


			// register into sitemaps list
			list_sitemaps.push(url_path);
		}


		// append url entry
		fs.appendFileSync(filepath,
`	<url>
		<loc>${list[i]}</loc>
		<lastmod>${time_updated}</lastmod>
	</url>
`);
	}

	// seal the last sitemap
	fs.appendFileSync(filepath, seal);


	// report status
	return list_sitemaps;
}




function create_sitemaps_index(filepath: string, list: string[]) {
	const header = `<?xml version="1.0" encoding="utf-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
	const seal = `</sitemapindex>\n`


	// validate before start
	if (list.length <= 0) {
		return;
	}


	// write the header
	fs.appendFileSync(filepath, header);


	// loop through urls
	for (var i = 0; i < list.length; i++) {
		fs.appendFileSync(filepath,
`	<sitemap>
		<loc>${list[i]}</loc>
		<lastmod>${time_updated}</lastmod>
	</sitemap>
`);
	}


	// seal the last sitemap
	fs.appendFileSync(filepath, seal);
}




function create_robots(filepath: string, sitemap_url: string) {
	// write sitemap if available
	if (sitemap_url) {
		fs.appendFileSync(filepath, `Sitemap: ${sitemap_url}`);
	}

	// append the policy
	fs.appendFileSync(filepath, robots_policy);
}




/* exported function for creating the seo configuration files */
export function Create_SEO() {
	const source_file = 'prerender-routes.txt';
	const filename_sitemap = 'sitemap.xml';
	const filename_robots = 'robots.txt';

	const dir_sitemaps = 'sitemaps';
	const dir_sitemaps_build = `assets/${dir_sitemaps}`;

	const filepath_sitemap = `assets/${filename_sitemap}`;
	const filepath_robots = `assets/${filename_robots}`;


	/* bail if source file is missing */
	try {
		if (!fs.existsSync(source_file)) {
			return;
		}
	} catch {
		;
	}


	/* bail if file exists */
	try {
		if (fs.existsSync(dir_sitemaps_build)) {
			return;
		}

		if (fs.existsSync(filepath_sitemap)) {
			return;
		}

		if (fs.existsSync(filepath_robots)) {
			return;
		}
	} catch {
		;
	}


	/* parse urls from prerender-routes.txt */
	var base = Get_Base_URL();
	var sources = fs.readFileSync(source_file).toString().split("\n");
	var list: string[] = [];
	for (var i = 0; i < sources.length; i++) {
		if (!sources[i]) {
			continue
		}

		list[i] = Yield_URL(sources[i], base);
	}


	/* add urls from url_add */
	for (var i = 0; i < url_add.length; i++) {
		if (!url_add[i]) {
			continue
		}

		list.push(Yield_URL(sources[i], base));
	}


	/* remove duplicated urls */
	list.filter((x, i, a) => a.indexOf(x) == i);


	/* remove urls from url_remove */
	for (var i = 0; i < url_remove.length; i++) {
		if (!url_remove[i]) {
			continue
		}

		let target = Yield_URL(url_remove[i], base);
		list = list.filter((sample) => sample != target);
	}


	/* validate list before proceeding */
	if (list.length <= 0) {
		create_robots(filepath_robots, '');
		return; /* no url - bail */
	}


	/* update sitemap baseline url */
	let url_sitemap = Yield_URL(filename_sitemap, base);
	base = Yield_URL(`/${dir_sitemaps}`, base);


	/* create directory */
	if (!fs.existsSync(dir_sitemaps_build)) {
		fs.mkdirSync(dir_sitemaps_build, { recursive: true });
	}


	/* create page sitemaps */
	var sitemaps = create_sitemaps_page(dir_sitemaps_build, base, list);


	/* create index sitemaps */
	create_sitemaps_index(filepath_sitemap, sitemaps);


	/* create robots.txt */
	create_robots(filepath_robots, url_sitemap);


	/* report status */
	console.log(`✓ ${filepath_sitemap} generated successfully.`);
	console.log(`✓ ${filepath_robots} generated successfully.`);
}
