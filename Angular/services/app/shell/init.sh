#!/bin/sh
#
# COPYRIGHT LICENSE NOTICE HERE
#
if [ "$WORKSPACE_ROOT" = "" ]; then
        1>&2 printf -- "[ ERROR ] %s\n" "Missing WORKSPACE_ROOT!"
        return 1
fi
1>&2 printf -- "Workspace: %s\n" "$WORKSPACE_ROOT"




if [ "$WORKSPACE_RUN" = "" ]; then
        1>&2 printf -- "[ ERROR ] %s\n" "Missing WORKSPACE_RUN!"
        return 1
fi
1>&2 printf -- "Run mode : %s\n" "$WORKSPACE_RUN"




1>&2 printf -- "%s\n" "STAGE-0: Cleaning up existing configuration files..."
___old_IFS="$IFS"
while IFS="" read -r ___line || [ -n "$___line" ]; do
        rm -rf "${WORKSPACE_ROOT}/${___line}" &> /dev/null
done << EOF
assets/manifest.webmanifest
assets/CNAME
assets/sitemaps
assets/sitemap.xml
assets/robots.txt
assets/browserconfig.xml
assets/.nojekyll
services/app/.root.html
EOF
IFS="$___old_IFS" && unset ___old_IFS ___line




# setup CHROME_BIN
___old_IFS="$IFS"
while IFS="" read -r ___line || [ -n "$___line" ]; do
        if [ ! -z "$(type -p "$___line")" ]; then
                CHROME_BIN="$(type -p "$___line")"
                break
        fi
done << EOF
chromium
google-chrome
brave-browser
EOF
IFS="$___old_IFS" && unset ___old_IFS ___line




# initialize repository
1>&2 printf -- "%s\n" "STAGE-1: Initializing repository..."

if [ ! -f "${WORKSPACE_ROOT}/services/app/root.html" ]; then
        printf -- "%s" "\
<!doctype html>
<html lang='en'>
<head>
        <meta charset='UTF-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <base href='/'>
</head>
<body>
        <main>
                <app-root></app-root>
                <div><noscript>
                        <p>Please enable JavaScript to use this application.</p>
                </noscript></div>
        </main>
        <footer><app-footer></app-footer></footer>
</body>
" > "${WORKSPACE_ROOT}/services/app/root.html"
fi

ng build --aot --configuration "${WORKSPACE_RUN:-production}" --server main.server.ts
rm -rf "${WORKSPACE_ROOT}/dist" &> /dev/null
sync




# export critical files
if [ ! -f "${WORKSPACE_ROOT}/services/app/.root.html" ]; then
        1>&2 printf -- "[ ERROR ] failed to compile '%s'!\n" "services/app/root.html"
        exit 1
fi
mv "${WORKSPACE_ROOT}/services/app/.root.html" "${WORKSPACE_ROOT}/services/app/root.html"
sync




# done
1>&2 printf -- "STAGE-2: Executing job...\n"
return 0
