# AutomataCI - Angular Static Site Generator

This document for the project developers including junior experiences. It covers
the basic guides for operating the generator.




## Directory Structures

Unlike what was recommended by Angular, AutomataCI prepared 2 clearly separated
components directories:

1. `contents/` - organize page components with respect to pathing hirarchy.
2. `services/` - where your libraries and service components stays.
3. `services/app/` - where `app-root` and `app-footer` components are located.
4. `services/init/` - where your project init components are located.
5. `assets/` - any static files located at the root of the site.

The root directory for the workspace is where both `app.ts` and `app.server.ts`
are located.

For internationalization (i18n), it is best to keep it as a service component
libraries while keeping the `contents/` directory as the page template. You can
pass the language code using the `app.routes.ts` routing mechanism and have
them rendered accordingly.

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
# (1) get into your Angular workspace as current directory
$ cd Angular/


# (2) run any of the following matching your intention:
$ ./serve.sh.ps1    # for development
$ ./test.sh.ps1     # for test run
$ ./build.sh.ps1    # for build
```

This is mainly due to Angular does not have any pre-initialization function
where the workspace's critical data files can be updated dynamically
(example: `assets/manifest.webmanifest`, `assets/CNAME`, and etc). To workaround
this, a 2-steps execution is done inside these scripts where the `init.sh.ps1`
(sourced by the all shell scripts) is responsible for building and updating
these critical data files using the server-side-rendering.

Those are Polygot scripts which means it works on both UNIX and Windows OSes
natively.




## Server-Side Rendering (SSR) or Static Site Generation (SSG) First

AutomataCI prioritizes the SSR and SSG (pre-rendering) facilities over other
modes. There is a high chance this project is likely being used to generate
front-end JAM stack static website.




## Setting website Base URL

To set the base URL, update the `baseHref` and `deployUrl` data inside the
`angular.json` data file as follows:

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

`baseHref` is used as the website base URL while `deployUrl` is for the
asset-only base URL.

**DO NOT SEND IN ANY OF THEM VIA COMMAND ARGUMENTS**. The workspace
initialization is only sourcing from `angular.json` data file. Failure can
cause unknown and time-consuming concequences.




## Site-Level Metadata

You just need to edit `services/app/metadata.ts` data file that houses the
site-level metadata. Each fields are documented with inline specifications.




## PWA Web Manifest

By default, the workspace engine prepares and generates the
`manifest.webmanifest` file dynamically via the 2-steps operation using the
`services/app/metadata.ts` data.




## Site Favicons, Logos, and Screenshots

This workspace defines the favicons, logos, and screenshots metadata in the
`services/app/metadata.ts` data file ("Icons" section). You can supply the
media files in the `assets/` directory.

The default media files are located in `assets/logos/` directory. On the
first run, you can just update these media files to match your project.




## Open-Graph Metadata

By default, AutomataCI setup the default image thumbnails located inside the
`assets/thumbnails/` directory. These images serve as the fall back images
in case the page-level ones failed.

In practice, these Open-Graph metadata must be updated at page-level.

Recommended media dimension would be:

1. `1200x630` - horizontal widescreen presentation
2. `1200x1200` - square presentation
3. `480x480` - fallback presentation

You are free to alter the thumbnails located in `services/app/root.html` head
section.

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

By default, AutomataCI only setup the default empty tag in the
`services/app/root.html`.

These LD+JSON SEO schematic data must be updated at the page-level rendering.
For more technical specifications, please refer to the following:

1. https://schema.org/docs/full.html




## Sitemaps & `Robots.txt` Search Engine Optimization (SEO)

By default, the engine generates both the sitemaps and the `robots.txt`
autonomously using the `services/app/metadata.ts` data file via the 2-steps
operation.

The engine is designed to utilize sitemap index for large scale contents.




## `browserconfig.xml` fallback configuration

While deemed obselete, this file is generated autonomously for backward
compatibilities and request silencing via the 2-steps operation.




## `.nojekyll` configuration file

Specific to GitHub Pages, the engine generates the `assets/.nojekyll`
configuration file for instructing the facility not to use
[Jekyll](https://jekyllrb.com/) via the 2-steps operation.




## `CNAME` configuration file

Specific to GitHub Pages, the engine generates the `assets/CNAME` config
file based on the `services/app/metadata.ts` data file. This is used by
GitHub Pages to implement custom domain configurations.
