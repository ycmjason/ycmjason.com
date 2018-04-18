#!/usr/bin/env sh
vuepress build docs

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:ycmjason/ycmjason.github.io.git master:gh-pages

cd ../../../
/bin/rm -rf docs
