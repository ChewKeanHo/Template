# AutomataCI - Angular Static Site Generator

This document for the project developers including junior experiences. It covers
the basic guides for operating the generator.




## Directory Structures

Unlike what was recommended by Angular, AutomataCI prepared 2 clearly separated
components directories:

1. `contents/` - organize page components with respect to pathing hirarchy.
2. `services/` - where your libraries and service components stays.
3. `services/app/` - where `app-root`, `app-footer`, and `Init.ts` components
    are located.
5. `assets/` - any static files located at the root of the site.

The root directory for the workspace is where both `main.ts` and
`main.server.ts` are located.

For internationalization (i18n), it is best to keep it as a service component
libraries while keeping the `contents/` directory as the page template. You can
definite and pass the language code using the `app.routes.ts` routing mechanism.
Then, the page components can render the specific language accordingly.

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
$ ./watch.sh.ps1    # for watch
```

This is mainly due to Angular does not have any pre-initialization function
to update critical SEO files generations autonomously & dynamically. Affected
files are:

* `assets/browserconfig.xml`
* `assets/CNAME`
* `assets/.nojekyll`
* `assets/sitemap.xml`
* `assets/robots.txt`
* `assets/manifest.webmanifest`
* `services/app/root.html`

This includes the `index.html` (`services/app/root.html`) that `angular.json`
depends on. To workaround this issue, a 2-steps execution is done using the
Shell (and PowerShell on Windows) scripts where Stage-1 is to prepare these
criticaly files dynamically while Stage-2 is your designated execution.

Those shell scripts are Polygot in nature so the same script works on both
UNIX and Windows OSes natively.




## Server-Side Rendering (SSR) or Static Site Generation (SSG) Enabled

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

> **DO NOT SEND IN ANY OF THEM VIA COMMAND ARGUMENTS**
>
> The workspace initialization is only sourcing from `angular.json` data file.
> Failure can cause unknown and time-consuming concequences.




## Site-Level Metadata

You just need to edit `services/app/Metadata.ts` data file that houses the
site-level metadata. Each fields are documented with its inline
specifications.




## PWA Web Manifest

By default, the workspace engine prepares and generates the
`assets/manifest.webmanifest` file dynamically in the Stage-1 execution.

It generally uses `services/app/Metadata.ts` data for dynamic configurations.




## Site Favicons, Logos, and Screenshots

This workspace defines the favicons, logos, and screenshots metadata in the
`services/app/Metadata.ts` data file. You can supply the media files in the
`assets/` directory (e.g. `assets/screenshots/`, `assets/thumbnails/`,
`assets/logos/`).

If you just want to dive in with site construction, simply override the
existing template files in the `assets/` directory is suffice.




## Open-Graph Metadata

By default, AutomataCI setup the default image thumbnails located inside the
`assets/thumbnails/` directory. These images serve as the fall back images
in case the page-level ones failed. These default thumbnails are configurable
in the `services/app/Metadata.ts` file.

The `services/app/root.html` (main template file) is dynamically generated
in Stage-1 execution with the site-level thumbnails meta included.

Currently, Angular updates the meta tags dynamically using `Meta` and `Title`
services from `@angular/platform-browser` library. There is no way to statically
generate/patch the output `index.html` file yet.

Recommended media dimension would be:

1. `1200x630` - horizontal widescreen presentation
2. `1200x1200` - square presentation
3. `480x480` - fallback presentation




## LD+JSON Search Engine Optimization Schematic Data

This feature is pending and under development.

```
SPEC:
By default, AutomataCI only setup the default empty tag in the
`services/app/root.html`.

These LD+JSON SEO schematic data must be updated at the page-level rendering.
For more technical specifications, please refer to the following:

1. https://schema.org/docs/full.html

For SEO, the default page **MUST** be the root page since Angular only
pre-render the landing page HTML once and let its Javascript to take over
the others.
```




## Sitemaps & `Robots.txt` Search Engine Optimization (SEO)

By default, the engine generates both the sitemaps (`assets/sitemap.xml` and
the `assets/sitemaps/` directory) and the `assets/robots.txt` autonomously
using the `services/app/Metadata.ts` data file via Stage-1 execution.

It uses the sitemap index methodology for large scale contents mapping.




## `browserconfig.xml` fallback configuration

While deemed obselete, this file is generated autonomously for backward
compatibilities and silencing the request using the `services/app/Metadata.ts`
data file via Stage-1 execution.




## `.nojekyll` configuration file

Specific to GitHub Pages, the engine generates the `assets/.nojekyll`
configuration file for instructing the facility not to use
[Jekyll](https://jekyllrb.com/) via Stage-1 execution.




## `CNAME` configuration file

Specific to GitHub Pages, the engine generates the `assets/CNAME` config
file based on the `services/app/Metadata.ts` data file via Stage-1 execution.

This file is used by GitHub Pages to implement custom domain configurations
persistently.
