# bakery
bakery是个微信站。

项目收尾，就利用晚上和休息的时间做的一个微信商场，因为“有赞”，“微盟”什么的平台还是太贵了。一个菜鸡前端做这个事，肯定选nodejs+mongodb。一直都是零零散散的了解一些nodejs的知识，终于跨出这一步，做一个完整的商城。

刚好在熟悉vuejs2.0,前台页面就用vue了，后台express+mongodb，数据库的知识不扎实，mongodb这种非关系型的数据库又更没设计过，所以开发完毕才意识到，花时间最多的是mongodb的增删改查语句。

本地上开发完，部署是一根硬骨头。服务器是看到亚马逊云的活动页，免费试用一年。1G内存+1核+8G硬盘，服务器在俄亥俄洲，平均延迟300ms，域名用的朋友的二级域名。代码托管在github上原因有两个，一方面便于管理，另一方面，linux上部署也方便，可以直接pull。

## 发布程序步骤
1、 前端工程打包npm run build

2、 文件拷贝   ./release.sh

3、 ssh链接生产机，进到项目目录（bakery目录）

4、 执行git pull下载代码

5、 重启服务 pm2 restart app

配置不够，优化来凑！微信站的优化工作做了哪些？![请点这里](https://github.com/guguji5/blogs/blob/master/the%20optimization%20of%20bakery.md)