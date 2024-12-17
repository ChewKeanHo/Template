#
# COPYRIGHT LICENSE NOTICE HERE
#
if ("${env:WORKSPACE_ROOT}" -eq "") {
        $null = Write-Host "[ ERROR ] Missing `${env:WORKSPACE_ROOT}"
        return 1
}
$null = Write-Host "Workspace: ${env:WORKSPACE_ROOT}"




$null = Write-Host "Cleaning up workspace..."
foreach ($___line in [
        "assets\manifest.webmanifest",
        "assets\CNAME",
        "assets\sitemaps",
        "assets\sitemap.xml",
        "assets\robots.txt",
        "assets\browserconfig.xml",
        "assets\.nojekyll",
        "services\app\root.html",
        "services\app\.root.html",
        "dist",
        ".angular",
        "node_modules",
        "coverage",
]) {
        $null = Write-Host "Removing ${___line} ..."
        $null = Remove-Item -Recurse -Force "${env:WORKSPACE_ROOT}\${___line}" `
                                -ErrorAction SilentlyContinue
}




# done
return
