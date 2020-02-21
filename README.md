## Motiviation
React frontend to be used with a conference room hub
Idea is that this is deployed to a RaspberryPI like device with a small display and hung next to a conference room.

## Currently supports 
- Select Rooms 
- Display events 
- Receive quick updates with socket.io

## Installation
###React App
1. Make sure that you set up src/config.json to the proper values
    1. Link to hub is especially important here
1. Build 
1. Host built version accessible in your network

###Pi
The idea is to be able  to run this on a Pi zero with a cheap display for minimal cost. 
So we'll need to watch memory carefully. Therefore no window environment or stuff like that is used. 
Just a plain XServer running a single application, chromium in kiosk mode, to access the Frontend URL 

1. Install Raspian Buster **light** (only tested with Buster)
1. Copy setupPi.sh to your home directory
1. `chmod u+x setupPi.sh`
1. `sudo ./setupPi.sh {YOUR_FRONTEND_URL}`
    * Installs xorg & chromium 
    * Makes sure some default settings for chromium to be displayed correctly on a small display are present.
    * Sets up a user "confroom"
    * Enables autologin / autostart for chromium
1. Install whatever display driver you'reusing. (*It's important that this is **not** done before running the install script, as those installers usually modify XServer settings which would not be present before running setup*)
1. Reboot