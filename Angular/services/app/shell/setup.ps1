#
# COPYRIGHT LICENSE NOTICE HERE
#
if ("${env:WORKSPACE_ROOT}" -eq "") {
        $null = Write-Host "[ ERROR ] Missing `${env:WORKSPACE_ROOT}"
        return 1
}
$null = Write-Host "Workspace: ${env:WORKSPACE_ROOT}"




$null = Write-Host "Setting up workspace..."
npm install
if ($? -ne 0) {
        return 1
}




# done
return
