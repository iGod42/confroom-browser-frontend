#!/bin/bash

die() {
  echo >&2 "$@"
  exit 1
}

[ "$#" -eq 1 ] || die "Please provide the [url] to connect to as an argument"

sudo apt update
sudo apt install -y xorg xserver-xorg-video-fbturbo chromium-browser

USERNAME="confroom"

# basic usercreation
sudo useradd $USERNAME
sudo mkdir -p /home/$USERNAME/.config/chromium/Default

# startup script for chrome
cat >/home/$USERNAME/startDisplay.sh <<EOF
#!/bin/bash
chromium-browser --kiosk --start-maximized --disable-restore-background-contents --disable-translate --disable-new-tab-first-run $1
EOF

chmod u+x /home/$USERNAME/startDisplay.sh

# chrome browser config is necessary because for some reason chrome starts with a margin
# sets the window to tiny size. Page will render to screen size anyway. This is not ideal, but I haven't found a better way
cat >/home/$USERNAME/.config/chromium/Default/Preferences <<EOF
{
    "browser": {
        "has_seen_welcome_page": true,
        "window_placement": {
        "bottom": 480,
        "left": 0,
        "maximized": true,
        "right": 320,
        "top": 0
        }
    }
}
EOF

# setup xsession to launch whatever's in the startup script
cat >/home/$USERNAME/.xsession <<EOF
xset -dpms s off #To avoid screen going blank after a while
/home/$USERNAME/startDisplay.sh
EOF

# autostart x when logging in
cat >/home/$USERNAME/.bashrc <<'EOF'
# If not running interactively, don't do anything
case $- in
    *i*) ;;
      *) return;;
esac

if [[ -z $DISPLAY ]] && [[ $(tty) == "/dev/tty1" ]]; then
    	echo intheif
	while true; do startx -- -nocursor -depth 16; echo "Again [0]..."; done
fi
EOF

# enable autologin
cat >/etc/systemd/system/getty@tty1.service.d/autologin.conf <<EOF
[Service]
ExecStart=
ExecStart=-/sbin/agetty --autologin $USERNAME --noclear %I \$TERM
EOF

# copy default .profile so that .bashrc is actually read
sudo cp /etc/skel/.profile /home/$USERNAME/.

sudo chown -R $USERNAME:$USERNAME /home/$USERNAME

echo "All set! Don't forget to set the timezone correctly"
