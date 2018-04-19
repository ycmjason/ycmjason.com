#!/usr/bin/env sh
set -e
npm run build

cd .vuepress/dist

echo "www.ycmjason.com" > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ycmjason/ycmjason.github.io.git master

cd ../..
