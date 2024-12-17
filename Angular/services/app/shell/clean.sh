#!/bin/sh
#
# COPYRIGHT LICENSE NOTICE HERE
#
if [ "$WORKSPACE_ROOT" = "" ]; then
        1>&2 printf -- "[ ERROR ] %s\n" "Missing WORKSPACE_ROOT!"
        return 1
fi
1>&2 printf -- "Workspace: %s\n" "$WORKSPACE_ROOT"




1>&2 printf -- "%s\n" "Cleaning up workspace..."
___old_IFS="$IFS"
while IFS="" read -r ___line || [ -n "$___line" ]; do
        1>&2 printf -- "Removing %s ...\n" "$___line"
        rm -rf "${WORKSPACE_ROOT}/${___line}" &> /dev/null
done << EOF
assets/manifest.webmanifest
assets/CNAME
assets/sitemaps
assets/sitemap.xml
assets/robots.txt
assets/browserconfig.xml
assets/.nojekyll
services/app/root.html
services/app/.root.html
dist/
.angular/
node_modules/
coverage/
EOF
IFS="$___old_IFS" && unset ___old_IFS ___line




# done
return 0
