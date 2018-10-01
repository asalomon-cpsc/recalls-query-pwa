Param(
    [string]$destDir
  )

  if(!(Test-Path $destDir)){
    Write-host "Directory doesn't exist, creating it"
    new-item -ItemType directory -Name recalls-pwa-app -Path $destDir
    $destDir += "recalls-pwa-app"
  # Write-Output "Exiting build program..."
    [Environment]::Exit(8)
}
if(!(Test-Path $destDir)){
    Write-Host "Bad Directory name please try again using a valid directory path."
  # Write-Output "Exiting build program..."
    [Environment]::Exit(8)
}
$deploydir=$destDir
Write-Output "destination directory for build files is $deploydir"

if(Test-Path $deploydir){
  node build/build.js
  ##Write-Output "destination directory exist, deleting..."
  #rimraf $deploydir
  Write-Host "destination directory deleted"
  Write-Host "copying build files to destination directory $deploydir"
  $files = Get-ChildItem .\dist
  foreach ($file in $files){
   copy-item $file.FullName -Recurse $deploydir
  }

  Write-host "deployment complete"
  
}