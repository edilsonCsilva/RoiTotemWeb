@echo off
cmd.exe /c start /min init.bat ^& exit
start "Chrome" chrome --start-fullscreen --app=http://localhost:8089