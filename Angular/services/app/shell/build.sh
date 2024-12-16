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
return $?
