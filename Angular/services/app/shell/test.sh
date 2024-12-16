#!/bin/sh
#
# COPYRIGHT LICENSE NOTICE HERE
#
if [ "$WORKSPACE_RUN" = "" ]; then
        WORKSPACE_RUN="development"
fi


# execute command
. "${WORKSPACE_ROOT}/services/app/shell/init.sh"
CHROME_BIN="$CHROME_BIN" ng test --no-watch \
                                 --code-coverage \
                                 --browsers ChromeHeadless
return $?
