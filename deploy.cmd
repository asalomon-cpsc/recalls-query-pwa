@echo off
setlocal
REM arg check
if [%1] == [] goto usage
echo parameter is %1
echo setting build
SET build=%1
echo build set tp %build%
SET server1=%computername%
SET server2=%computername%

IF "%build%"=="staging" (
    echo staging
    SET server1="rmsstgintweb1"
    echo server1 is %server1%
)

IF  "%build%"=="development" (
    echo development
    SET server1="rmspreprodweb1"
    SET server2="rmspreprodweb2"
)

IF "%build%"=="production" (
    echo production
   SET server1="rmsprodweb1"
   SET server2="rmsprodweb2"
)

SET SOURCE_LOC=".\dist"
SET DEPLOY_LOC1="\\\\%server1%\\c$\\inetpub\\wwwroot\\recalls-pwa-api\\wwwroot /e /mir /purge"
SET DEPLOY_LOC2="\\\\%server2%\\c$\\inetpub\\wwwroot\\recalls-pwa-api\\wwwroot /e /mir /purge"

echo ---------------------------------------
echo Copying to %server2%
echo ---------------------------------------
CALL ROBOCOPY  %SOURCE_LOC% %DEPLOY_LOC1% 

echo ---------------------------------------
echo Copying to %server2% 
echo ---------------------------------------
CALL ROBOCOPY %SOURCE_LOC% %DEPLOY_LOC2% 
:usage
echo Error: Incorrect Usage.
@Echo Correct Usage: %0 [Staging/development/production]

ENDLOCAL