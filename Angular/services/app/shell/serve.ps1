#
# COPYRIGHT LICENSE NOTICE HERE
#
if ("${env:WORKSPACE_RUN}" -eq "") {
        ${env:WORKSPACE_RUN} = "development"
}


# execute
$null = . "${env:WORKSPACE_ROOT}\services\app\shell\init.ps1"
$null = ng serve
return $?
