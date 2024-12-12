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
$null = Write-Host "clean-ing up existing configuration files..."
$null = Remove-Item -Force ".\assets\manifest.webmanifest" -ErrorAction SilentlyContinue
$null = Remove-Item -Force ".\assets\CNAME" -ErrorAction SilentlyContinue
$null = Remove-Item -Recursive -Force ".\assets\sitemaps" -ErrorAction SilentlyContinue
$null = Remove-Item -Force ".\assets\sitemap.xml" -ErrorAction SilentlyContinue
$null = Remove-Item -Force ".\assets\robots.txt" -ErrorAction SilentlyContinue
$null = Remove-Item -Force ".\assets\browserconfig.xml" -ErrorAction SilentlyContinue
$null = Remove-Item -Force ".\assets\.nojekyll" -ErrorAction SilentlyContinue
return
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
1>&2 printf -- "%s\n" "clean-ing up existing configuration files..."
rm "./assets/manifest.webmanifest" &> /dev/null
rm "./assets/CNAME" &> /dev/null
rm -r "./assets/sitemaps/" &> /dev/null
rm "./assets/sitemap.xml" &> /dev/null
rm "./assets/robots.txt" &> /dev/null
rm "./assets/browserconfig.xml" &> /dev/null
rm "./assets/.nojekyll" &> /dev/null
return 0
################################################################################
# Unix Main Codes                                                              #
################################################################################
exit $?
#>
