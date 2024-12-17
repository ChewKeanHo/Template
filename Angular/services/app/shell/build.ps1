#
# COPYRIGHT LICENSE NOTICE HERE
#
if ("${env:WORKSPACE_RUN}" -eq "") {
        ${env:WORKSPACE_RUN} = "production"
}


# execute
. "${WORKSPACE_ROOT}/services/app/shell/init.sh"
ng build --aot --configuration "$WORKSPACE_RUN"
if ($? -ne 0) {
        return 1
}


## BUG WORKAROUND: check Angular's root-level index.html file
## Refer         : https://github.com/angular/angular-cli/blob/d449c9d09387f64f3295f3e0d2703f30b8d4be36/packages/angular/build/src/builders/application/options.ts#L235
$null = Write-Host "Patching Angular's 'dist/browser/index.html' bug..."
$___dest = "${env:WORKSPACE_ROOT}\dist\browser\index.html"
if (-not Test-Path $___dest) {
        foreach ($___source in $(
                "${env:WORKSPACE_ROOT}\dist\browser\index.html",
                "${env:WORKSPACE_ROOT}\dist\browser\index.csr.html"
        )) {
                if (Test-Path $___source) {
                        $null = Copy-Item $___source $___dest
                        break
                }
        }

        if (-not Test-Path $___dest) {
                $null = Write-Error "[ ERORR ] missing '${___dest}'"
                return 1
        }
}


return 0
