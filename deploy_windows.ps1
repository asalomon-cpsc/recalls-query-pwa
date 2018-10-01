Param(
    [string]$destDir
  )

  if(!(Test-Path $destDir)){
   
    new-item -ItemType directory -Name recalls-pwa-app -Path $destDir
    $destDir += "recalls-pwa-app"
  # Write-Output "Exiting build program..."
    [Environment]::Exit(8)
}
if(!(Test-Path $destDir)){
    
  # Write-Output "Exiting build program..."
    [Environment]::Exit(8)
}
$deploydir=$destDir


if(Test-Path $deploydir){
  node build/build.js
  ##Write-Output "destination directory exist, deleting..."
  #rimraf $deploydir
  
  $files = Get-ChildItem .\dist
  foreach ($file in $files){
   copy-item $file.FullName -Recurse $deploydir -Force
  }

  
  
}