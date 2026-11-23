#!/bin/sh
# собирает папку build для хостинга ВКонтакте (без service worker и манифеста)
set -e
cd "$(dirname "$0")"
rm -rf build && mkdir build
cp index.html vk-bridge.min.js icon-192.png icon-512.png build/
cp -r assets snd voice build/
sed -i '/<link rel="manifest"/d' build/index.html
