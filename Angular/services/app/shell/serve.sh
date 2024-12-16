#!/bin/sh
#
# COPYRIGHT LICENSE NOTICE HERE
#
if [ "$WORKSPACE_RUN" = "" ]; then
        WORKSPACE_RUN="development"
fi


# execute
. "${WORKSPACE_ROOT}/services/app/shell/init.sh"
ng serve
return $?
