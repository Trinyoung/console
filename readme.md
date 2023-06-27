## 介绍
console 项目是一个论坛系统， 是使用qiankun.js搭建的项目。主项目为fuxi(伏羲)；

子应用由nvwa(女娲)，houyi(后羿)，xingtian(刑天)；

fuxi(伏羲)： 乾坤的主应用, 技术栈为 vue2，es6， 负责登录， 注册，以及主应用的架子；

nvwa(女娲): 论坛的后台管理系统，嵌入在主项目内，主要模块功能是个人的文章管理，类目管理， 文章创建等。技术栈为vue3 + typescript;

xingtian(刑天): 论坛的后台管理系统，嵌入在主项目内， 主要功能是个人的数据管以及统计信息。 技术栈为 react + typescript;

houyi(后羿)：论坛的前台项目，嵌入在主项目内，主要功能是文章展示， 以及文章评论点赞功能。技术栈为 nuxt + typescript；

