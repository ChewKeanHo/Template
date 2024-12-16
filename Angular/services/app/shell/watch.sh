#!/bin/sh
#
# COPYRIGHT LICENSE NOTICE HERE
#
if [ "$WORKSPACE_RUN" = "" ]; then
        WORKSPACE_RUN="development"
fi


# execute command
. "${WORKSPACE_ROOT}/services/app/shell/init.sh"
ng build --watch --configuration "$WORKSPACE_RUN"
return $?
