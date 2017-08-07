# bakery

## 发布程序步骤
1、 前端工程打包npm run build

2、 文件拷贝   ./release.sh

3、 ssh链接生产机，进到项目目录（bakery目录）

4、 执行git pull下载代码

5、 重启服务 pm2 restart app