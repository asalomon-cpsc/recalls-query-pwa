Param(
    [string]$destDir
  )

  if(!(Test-Path $destDir)){
    Write-Output "Directory doesn't exist, creating it"
    new-item -ItemType directory -Name recalls-pwa-app -Path $destDir
    $destDir += "recalls-pwa-app"
  # Write-Output "Exiting build program..."
    [Environment]::Exit(8)
}
if(!(Test-Path $destDir)){
    Write-Output "Bad Directory name please try again using a valid directory path."
  # Write-Output "Exiting build program..."
    [Environment]::Exit(8)
}
$deploydir=$destDir
Write-Output "destination directory for build files is $deploydir"

if(Test-Path $deploydir){
  node build/build.js
  ##Write-Output "destination directory exist, deleting..."
  #rimraf $deploydir
  Write-Output "destination directory deleted"
  Write-Output "copying build files to destination directory $deploydir"
  Copy-Item dist -Recurse $deploydir -Force
  Write-Output "deployment complete"
}