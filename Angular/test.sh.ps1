echo \" <<'RUN_AS_BATCH' >/dev/null ">NUL "\" \`" <#"
@ECHO OFF
REM LICENSE CLAUSES HERE
REM ----------------------------------------------------------------------------




REM ############################################################################
REM # Windows BATCH Codes                                                      #
REM ############################################################################
echo "[ ERROR ] --> powershell.exe !!!"
exit /b 1
REM ############################################################################
REM # Windows BATCH Codes                                                      #
REM ############################################################################
RUN_AS_BATCH
#> | Out-Null




echo \" <<'RUN_AS_POWERSHELL' >/dev/null # " | Out-Null
################################################################################
# Windows POWERSHELL Codes                                                     #
################################################################################
# execute
$null = . ".\init.sh.ps1"
$null = Write-Host "initializing the repository..."
$null = ng build --configuration development --server main.server.ts | Out-Null
$null = Remove-Item -Recurse -Force ".\dist" -ErrorAction SilentlyContinue
$null = [System.IO.File]::FlushAll()
$null = ng test --no-watch --code-coverage --browsers ChromeHeadless
################################################################################
# Windows POWERSHELL Codes                                                     #
################################################################################
exit
<#
RUN_AS_POWERSHELL




################################################################################
# Unix Main Codes                                                              #
################################################################################
# execute
. "./init.sh.ps1"
1>&2 printf -- "%s\n" "initializing the repository..."
ng build --aot --configuration development --server main.server.ts &> /dev/null
rm -rf "./dist/" &> /dev/null
sync
ng test --no-watch --code-coverage --browsers ChromeHeadless
################################################################################
# Unix Main Codes                                                              #
################################################################################
exit $?
#>
