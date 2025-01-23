---
title: 初次使用Obsidian时相关配置
description: 初次使用Obsidian时相关配置
date: 2023/02/19
image: /blogs-img/stackedit-zh.png
published: true
---

# 前言

之前一直使用的是$StackEdit中文版$作为日常md文档的编写工具。![StackEdit 中文版](/blogs-img/stackedit-zh.png)

## StackEdit 中文版的优点：

- 无需下载软件，其本质上是一个web轻应用
- 自动连接Gitee，初始化仓库，自动同步免费

但是它的缺点也很多，比如web应用虽然轻巧但是文件不能本地化，不安全；不能自定义额外的主题样式（或者说不太容易）；某些js插件比如mermaid在渲染时会有一些bug。

---

于是今天开始初次使用MD使用者非常推荐的Obsidian，关于这款软件的介绍不再多说，接下来记录一下我在初次使用Obsidian的一些操作。

# 操作记录

1. 创建非默认仓库

<mermaid>
graph LR
a(左侧边栏)-->b(新建仓库/在指定文件夹下创建仓库)-->c(选择自己的文件夹如D:/obsidianRepository)-->d(仓库名:MyRepository)
</mermaid>

2. 更改主题样式

<mermaid>
graph LR
a(设置)-->b(主题/管理)-->c(选择自己喜欢的主题样式如Blue Topaz)
</mermaid>

3. 配置远程同步
   由于Obsidian官方同步要收费，所以这里我采用了Git+坚果云双重同步备份方式

   <mermaid>
   graph LR
   a(坚果云)-->a1(右键创建的Obsidian仓库夹)-->a2(坚果云/同步文件夹)
   a1-->a3(将仓库文件夹拖拽到坚果云软件中)
   b(Git/使用gitee)-->b1(下载Git软件到本地)-->b2(在Obsidian仓库文件出右键)-->b3(Git Bash here)-->b4(参见以下命令)
   </mermaid>

   ```javascript
   $ git init //初始化git仓库
   //以下操作要先获取到gitee账号的进入权限
   $ ssh-keygen -t rsa -C "your_email@youremail.com",后面的就是你创建账号的邮箱
   ```

   输入该命令行后，你就可以在”我的电脑/用户/jxc/.ssh“中找到生成的id_rsa_pub公钥.复制这个公钥，上传到gitee
   接下来添加远程仓库

   ```javascript
   $ git add remote git@gitee:username/repository
   // username是gitee账户名，repository是你要备份的远程仓库名

   $ git remote//查看远程仓库,应返回origin
   ```

实际上origin已经变成里你本地仓库的一个分支，它像一个指针或索引，指向远程仓库。

如果你之前使用了StackEdit，那么它会自动为你创建一个远程仓库，如果你在里面已经有一些文档了，建议执行以下命令将远程仓库的文件覆盖到本地仓库

```javascript
$ git pull -hard origin/master//origin是远程分支在本地仓库的一个指针（索引）分支，master是你要拉取的远程分支名
```

## 结语

接下来打开你的Obsidian，你会发现仓库里出现了之前在StackEdit编写的文件，此时坚果云同步文件夹里也有了远程备份。当你完成新文档的编写，坚果云会自动同步文件，而Git需要你手动提交并推送到远程仓库，细节可以看这里：

[Git菜鸟教程](https://www.runoob.com/git/git-tutorial.html)
