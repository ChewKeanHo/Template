#!/bin/sh
#
# COPYRIGHT LICENSE NOTICE HERE
#
if [ "$WORKSPACE_ROOT" = "" ]; then
        1>&2 printf -- "[ ERROR ] %s\n" "Missing WORKSPACE_ROOT!"
        return 1
fi
1>&2 printf -- "Workspace: %s\n" "$WORKSPACE_ROOT"




1>&2 printf -- "%s\n" "Setting up workspace..."
npm install
if [ $? -ne 0 ]; then
        return 1
fi



# done
return 0
