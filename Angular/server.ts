/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './main.server';




// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
	const server = express();
	const dir_dist_server = dirname(fileURLToPath(import.meta.url));
	const dir_dist_browser = resolve(dir_dist_server, '../browser');
	const html_index_server = join(dir_dist_server, 'index.server.html');
	const commonEngine = new CommonEngine();


	server.set('view engine', 'html');
	server.set('views', dir_dist_browser);

	// Example Express Rest API endpoints
	// server.get('/api/**', (req, res) => { });
	// Serve static files from /browser
	server.get('*.*', express.static(dir_dist_browser, {
		maxAge: '1y',
	}));


	// All regular routes use the Angular engine
	server.get('*', (req, res, next) => {
		const { protocol, originalUrl, baseUrl, headers } = req;

		commonEngine.render({
			bootstrap: bootstrap,
			documentFilePath: html_index_server,
			url: `${protocol}://${headers.host}${originalUrl}`,
			publicPath: dir_dist_browser,
			providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
		})
		.then((html) => {
			res.send(html);
		})
		.catch((err) => {
			next(err);
		});
	});

	return server;
}




function run(): void {
	const port = process.env['PORT'] || 4000;


	// Start up the Node server
	const server = app();
	server.listen(port, () => {
		console.log(`Node Express server listening on http://localhost:${port}`);
	});
}
run();
