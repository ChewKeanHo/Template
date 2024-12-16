/*
 * COPYRIGHT LICENSE NOTICE HERE
 */
import { METADATA_SITE } from 'services/app/Metadata';

import { Create_Web_Manifest } from './pwa';
import { Create_CNAME } from './cname';
import { Create_HTML_Index } from './html';
import { Create_SEO } from './seo';
import { Create_Browser_Config_XML } from './browserconfig-xml';
import { Create_No_Jekyll } from './no-jekyll';




export function Init_Site (
	path_app_root: string,
	path_asset: string,
	url_base: string,
	path_prerender: string,
) {
	Create_Browser_Config_XML(
		path_asset,
		url_base,
		METADATA_SITE.Color_Theme_Background,
	);
	Create_CNAME(path_asset, METADATA_SITE.ID_CNAME);
	Create_No_Jekyll(path_asset);
	Create_SEO(path_asset, url_base, path_prerender, METADATA_SITE.SEO);
	Create_Web_Manifest(path_asset, url_base, METADATA_SITE);
	Create_HTML_Index(path_app_root, url_base, METADATA_SITE);
}
