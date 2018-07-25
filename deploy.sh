#!/bin/sh
npm run build
rm -rf ../notes-server/web
cp -r build ../notes-server/web