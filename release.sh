#!/bin/bash

rm bakeryApi/public/index.html
rm bakeryApi/public/static -r
cp bakeryWeb/dist/index.html bakeryApi/public
cp -r bakeryWeb/dist/static bakeryApi/public

#scp -r bakeryApi/dbconf ubuntu@52.15.185.161:/home/ubuntu/bakery/bakeryApi/
#scp -r bakeryApi/public ubuntu@52.15.185.161:/home/ubuntu/bakery/bakeryApi/
#scp -r bakeryApi/routes ubuntu@52.15.185.161:/home/ubuntu/bakery/bakeryApi/
#scp -r bakeryApi/view ubuntu@52.15.185.161:/home/ubuntu/bakery/bakeryApi/
#scp bakeryApi/app.js ubuntu@52.15.185.161:/home/ubuntu/bakery/bakeryApi/
#scp bakeryApi/package.json ubuntu@52.15.185.161:/home/ubuntu/bakery/bakeryApi/

git add bakeryApi/public
msg='public is commited auto in '`date "+%Y-%m-%d %H:%M:%S"`
git commit -m "$msg" bakeryApi/public
git pull
git push