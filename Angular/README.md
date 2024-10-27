# AutomataCI Static Site Generator Angular Setup

This document is mainly for Angular developer to understand what is going on
with the organization here. Most of the resources are the same.




## Directory Structures

Unlike what was recommended by Angular, AutomataCI prepares 2 separate
components directories:

1. `contents/` - organize the pages
2. `services/` - where your libraries and components stays

The `contents/` structures the website page hirarchy and imports the `services/`
libraries to construct the page.




## Server-Side Rendering (SSR) or Static Site Generation (SSG) First

There is a high chance this project is likely being used to generate JAM Stack.
Hence, AutomataCI prioritizes the SSR and SSG (pre-rendering) facilities.




## Setting website Base URL

To set the Base URL, make sure you update the `baseHref` and `deployUrl` data
inside `angular.json`:

```
diff --git a/angular/angular.json b/angular/angular.json
index 5379d9e..fb2e8fa 100644
--- a/angular/angular.json
+++ b/angular/angular.json
@@ -46,6 +46,8 @@
           },
           "configurations": {
             "production": {
+              "baseHref": "https://www.example.com/",
+              "deployUrl": "https://www.example.com/",
               "budgets": [
                 {
                   "type": "initial",
```

Then make sure you edit `assets/CNAME` and add only the domain name inside. This
is for GitHub or GitLab authentication use.

Then update the `assets/manifest.webmanifest` for PWA settings. Specifically,
look for `start_url` and etc.




## For development

Everything is the same as Angular: `$ ng serve`




## For Tests

Everything is the same as Angular: `$ ng test` OR `$ ng e2e`




## For Production

Everything is the same as Angular: `$ ng build`

For full automation, use: `$ ./automataCI/ci.sh.ps1 build`
