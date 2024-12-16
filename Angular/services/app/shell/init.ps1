#
# COPYRIGHT LICENSE NOTICE HERE
#
if ("${env:WORKSPACE_ROOT}" -eq "") {
        $null = Write-Host "[ ERROR ] Missing `${env:WORKSPACE_ROOT}"
        return 1
}
$null = Write-Host "Workspace: ${env:WORKSPACE_ROOT}"




if ("${env:WORKSPACE_RUN}" -eq "") {
        $null = Write-Host "[ ERROR ] Missing `${env:WORKSPACE_RUN}"
        return 1
}
$null = Write-Host "Run Mode : ${env:WORKSPACE_RUN}"




$null = Write-Host "STAGE-0: Cleaning up existing configuration files..."
foreach ($___line in [
        "assets\manifest.webmanifest",
        "assets\CNAME",
        "assets\sitemaps",
        "assets\robots.txt",
        "assets\browserconfig.xml",
        "assets\.nojekyll",
        "services\app\.root.html"
]) {
        $null = Remove-Item -Force "${env:WORKSPACE_ROOT}\${___line}" `
                                -ErrorAction SilentlyContinue
}




# setup CHROME_BIN
foreach ($___line in [
        "chromium.exe",
        "chrome.exe",
        "brave.exe",
]) {
        $___browser = Get-Command $___line -ErrorAction SilentlyContinue
        if ($___browser -ne "") {
                $env:CHROME_BIN = $___browser
                break
        }
}
return




# initialize repository
$null = Write-Host "STAGE-1: Initializing repository..."

if (-not (Test-Path -Path "${env:WORKSPACE_ROOT}\services\app\root.html")) {
        @"
<!doctype html>
<html lang='en'>
<head>
        <meta charset='UTF-8'/>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <base href='/'>
</head>
<body>
        <main>
                <app-root></app-root>
                <div><noscript>
                        <p>Please enable JavaScript to use this application.</p>
                </noscript></div>
        </main>
        <footer><app-footer></app-footer></footer>
</body>
"@ `
        | Out-File -FilePath "${env:WORKSPACE_ROOT}\services\app\root.html" `
                   -Encoding UTF8
}

$null = ng build --aot --configuration ${env:WORKSPACE_RUN} --server main.server.ts `
$null = Remove-Item -Recurse -Force "${env:WORKSPACE_ROOT}\dist" `
        -ErrorAction SilentlyContinue
$null = [System.IO.File]::FlushAll()
$null = ng test --no-watch --code-coverage --browsers ChromeHeadless




# export critical files
if (-not $(Test-Path -Path "${env:WORKSPACE_ROOT}\services\app\.root.html")) {
        $null = Write-Error "[ ERROR ] failed to compile 'services\app\root.html'"
        exit 1
}
$null = Move-Item -Force `
                -Path "${env:WORKSPACE_ROOT}\services\app\.root.html" `
                -Destination "${env:WORKSPACE_ROOT}\services\app\root.html"
$null = [System.IO.File]::FlushAll()




# done
$null = Write-Host "STAGE-2: Executing job..."
return
