@echo off
echo Closing existing Chrome instances...
taskkill /F /IM chrome.exe >nul 2>&1
timeout /t 1 >nul
echo Launching Chrome with Antigravity Remote Debugging...
start "" "C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --restore-last-session
echo Done! Chrome is now connected to Antigravity on port 9222.
