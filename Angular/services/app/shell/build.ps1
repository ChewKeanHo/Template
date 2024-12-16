#
# COPYRIGHT LICENSE NOTICE HERE
#
if ("${env:WORKSPACE_RUN}" -eq "") {
        ${env:WORKSPACE_RUN} = "production"
}


# execute
. "${WORKSPACE_ROOT}/services/app/shell/init.sh"
ng build --aot --configuration "$WORKSPACE_RUN"
exit $?
