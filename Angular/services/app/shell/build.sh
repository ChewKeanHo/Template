#!/bin/sh
#
# COPYRIGHT LICENSE NOTICE HERE
#
if [ "$WORKSPACE_RUN" = "" ]; then
        WORKSPACE_RUN="production"
fi


# execute
. "${WORKSPACE_ROOT}/services/app/shell/init.sh"
ng build --aot --configuration "$WORKSPACE_RUN"
if [ $? -ne 0 ]; then
        return 1
fi


## BUG WORKAROUND: check Angular's root-level index.html file
## Refer         : https://github.com/angular/angular-cli/blob/d449c9d09387f64f3295f3e0d2703f30b8d4be36/packages/angular/build/src/builders/application/options.ts#L235
1>&2 printf -- "Patching Angular's dist/browser/index.html bug...\n"
___dest="${WORKSPACE_ROOT}/dist/browser/index.html"
if [ ! -f "$___dest" ]; then
        ___old_IFS="$IFS"
        while IFS="" read -r ___source || [ -n "$___source" ]; do
                if [ -f "$___source" ]; then
                        cp "$___source" "$___dest"
                        break
                fi
        done <<EOF
${WORKSPACE_ROOT}/dist/browser/root.html
${WORKSPACE_ROOT}/dist/browser/index.csr.html
EOF
        IFS="$___old_IFS" && unset ___old_IFS ___source

        if [ ! -f "$___dest" ]; then
                1>&2 printf -- "[ ERROR ] missing %s\n" "$___dest"
                return 1
        fi
fi
unset ___dest


## report status
return 0
