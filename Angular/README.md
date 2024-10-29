# AutomataCI Static Site Generator Angular Setup

This document is mainly for the project developers including junior role to
understand what is going on in the workspace and how to operate it.
Most of the Angular resources should be the same.




## Directory Structures

Unlike what was recommended by Angular, AutomataCI prepared 2 clearly separated
components directories:

1. `contents/` - organize the pages
2. `services/` - where your libraries and components stays
3. `assets/` - any static files located at the root of the site.

The root directory is programmed to be here, where all the `app.*.ts` and
`main.*.ts` are located.

The `contents/` component directory structures the website page hirarchy.
Each page imports component libraries from the `services/` directory for
constructing its content. All components in both directories are both using
Angular Components to operate seamlessly.

For internationalization (i18n), it is best to keep it as service libraries
while retaining the `contents/` directory as the page rendering template. You
can pass the language code using the `app.routes.ts` routing mechanism and
have them rendered accordingly.

To avoid path conflicts, you should always check the `assets/` availability
before creating the content inside `content/` directory.

For better separation of concerns:

1. `content/` components is recommended to have `PAGE_` prefix for clarity
2. `service/` components can remain to be anything but is best to be organized
   into directory for later module construction and etc.




## Operations

Due to Angular's limitation (dating Angular 18), You are **strongly advised**
to use the prepared Polygot shell for commands:

```
$ cd workspace/     # get into your Angular workspace as current directory

$ # run any of the following matching your intention:
$ ./serve.sh.ps1    # for development
$ ./test.sh.ps1     # for test run
$ ./build.sh.ps1    # for build
```

This is mainly due to Angular does not have any pre-initialization function
that can setup the workspace's critical data files dynamically
(example: `assets/manifest.webmanifest`, `assets/CNAME`, and etc) before the
actual start-up. To workaround this challenge, a 2-steps execution is done
inside these scripts where the `init.sh.ps1` (sourced by others) is
responsible for building and updating these critical data files using the
Angular server-side-rendering capability.

These are Polygot scripts which means it should work for both UNIX and Windows
operating system natively.




## Server-Side Rendering (SSR) or Static Site Generation (SSG) First

AutomataCI prioritizes the SSR and SSG (pre-rendering) facilities over other
modes. There is a high chance this project is likely being used to generate
JAM stack static website.




## Setting website Base URL

To set the Base URL, make sure you update the `baseHref` and `deployUrl` data
inside the `angular.json` as follows:

```
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "app": {
      ...
      "architect": {
        "build": {
          ...
          "configurations": {
            "production": {
              "baseHref": "https://www.example.com/",
              "deployUrl": "https://www.example.com/",
              ...
  ...
}
```

`baseHref` is for the website base URL while `deployUrl` is for the asset-only
base URL.

**DO NOT PASS ANY OF THEM IN VIA ARGUMENTS**. The workspace initialization is
sourced `angular.json` only. Failure can cause unknown and time-consuming
concequences.




## PWA Web Manifest & CNAME

By default, AutomataCI prepared the workspace to generate their critical data
files dynamically using the 2-steps operational workaround.

To modify them, look for these generator files and modify accordingly:

* `init.pwa.ts` - for generating `assets/manifest.webmanifest` file.
* `init.cname.ts` - for generating the `assets/CNAME` file.




## Site-Level Metadata

By default, AutomataCI prepared a site-level metadata file for default values
rendering purposes located at:

* `init.metadata.ts` - a constant object holding the site-level data.

This affects a lot of built-in facilities like `assets/manifest.webmanifest` and
page rendering.




## Site Logos & Favicons

This workspace comes with a default placement for logos & favicons
pre-programmed located at `assets/logos/` directory. Updating all the graphic
files will update the project entirely.

These logos are reusable outside of favicon usage especially those `.svg`
format.

To add/remove a logo, look for:

1. `init.pwa.ts` web manifest generator.
2. `app.html` head section.




## Update Screenshots

Baseline PWA requires 3 basic screenshots located inside `assets/screenshots/`
for:

* `wide` form factor (recommended `1200x630` size)
* `narrow` form factor (recommended `630x1200` size)
* any form factor (recommended `1200x1200` size)

To add/remove a logo, look for `init.pwa.ts` web manifest generator. For more
technical specifications, please refer to the following:

1. https://web.dev/articles/add-manifest
2. https://developer.mozilla.org/en-US/docs/Web/Manifest/screenshots




## Open-Graph Metadata

By default, AutomataCI setup the default image thumbnails located inside the
`assets/thumbnails/` directory. These images serve as the fall back images
in case the page-level ones failed.

By practice, these Open-Graph metadata must be updated at page-level.

Recommended media dimension would be:

1. `1200x630` - horizontal widescreen presentation
2. `1200x1200` - square presentation
3. `480x480` - fallback presentation

You are free to alter the thumbnails located in `app.html` head section.

For image, please use:

```
	<meta property="og:image" content="/path/to/asset.image" />
	<meta property="og:image:type" content="image/FORMAT" />
	<meta property="og:image:width" content="WIDTH" />
	<meta property="og:image:height" content="HEIGHT" />
	<meta property="og:image:alt" content="TITLE" />
```

For video, please use:

```
	<meta property="og:video" content="/path/to/asset.video" />
	<meta property="og:video:type" content="video/FORMAT" />
	<meta property="og:video:width" content="WIDTH" />
	<meta property="og:video:height" content="HEIGHT" />
	<meta property="og:video:alt" content="CAPTION" />
```

For audio, please use:

```
	<meta property="og:audio" content="/path/to/asset.audio" />
	<meta property="og:audio:type" content="audio/FORMAT" />
```

For more technical specification, please refer to the following:

1. https://ogp.me/




## LD+JSON Search Engine Optimization Schematic Data

By default, AutomataCI only setup the default empty tag in the `app.html`.

These LD+JSON SEO schematic data must be updated at the page-level rendering.
For more technical specifications, please refer to the following:

1. https://schema.org/docs/full.html




## Sitemaps & `Robots.txt` Search Engine Optimization Configurations

By default, AutomataCI generates the following automatically:

* 1 index sitemap (`assets/sitemap.xml`)
* all the pages' sitemap inside `assets/sitemaps/` directory
* 1 robot text file (`assets/robots.txt`)

The sitemaps are complying to the 50,000 entries limit.

This is done by:

1. parsing the `prerender-routes.txt` url list
2. add from `url_add` specific url list
3. remove from `url_remove` specific url list

To add/remove urls or modify the `robots.txt` policy:

* `init.sitemaps.ts` - the generator script.

Look for:

1. `url_add` - add additional URLs after `prerender-routes.txt`
2. `url_remove` - remove URLs right before writing.
3. `robots_policy` - the `robots.txt` without the `Sitemap: ` field (added
   automatically whenever available).




## `browserconfig.xml` fallback configuration

While deemed obselete, this file is generated for backward compatibilities and
silencing those automated requests. AutomataCI automatically generate this
config file into `assets/browserconfig.xml` based on the site-level metadata
information.




## `.nojekyll` configuration file

Specific to GitHub, it is required to generate this configuration file for
static site generator not using [Jekyll](https://jekyllrb.com/).




## `CNAME` configuration file

Specific to GitHub, AutomataCI generates the `assets/CNAME` configuration file
as requested for custom domain implementations. By default, this file is not
generated and will be hosted on GitHub Pages.

To set the domain, please refer to:

* `init.cname.ts` - generator file

Look for `const data = ''; // override the content here` and specify the domain
value into it.
