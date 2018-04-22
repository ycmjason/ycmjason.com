#!/usr/bin/env sh
set -e
npm run build

cd .vuepress/dist

echo '{
  "hosting": {
    "public": ".",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}' > firebase.json

echo '{
  "projects": {
    "default": "ycmjason-com"
  }
}' > .firebaserc

firebase deploy

cd ../..
