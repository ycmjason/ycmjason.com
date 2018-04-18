#!/usr/bin/env sh
set -e
npm run build

cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ycmjason/ycmjason.github.io.git dev:master

cd ../..
