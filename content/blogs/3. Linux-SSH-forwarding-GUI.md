---
title: Linux SSH转发GUI
description: Linux SSH转发GUI
date: 2022/11/20
image: https://s1.ax1x.com/2022/11/20/zMjtYQ.png
published: true
tags: [Linux]
---

#测试环境
**Centos 7 xhell xming**

<!--more-->

#配置环境

yum install -y xhost
将会自动配置xorg
<a><img src="https://s1.ax1x.com/2022/11/20/zMb7DS.md.png" alt="zMb7DS.png" border="0" /></a>

进入配置文件

`sudo vim /etc/ssh/sshd_config`

修改以下配置，如果在配置文件里面没有找到，就直接添加到文件末尾即可，最后保存退出:wq

X11Forwarding yes
X11DisplayOffset 10
X11UseLocalhost yes
本地下载#安装xming
![启动xming.1](https://s1.ax1x.com/2022/11/20/zMO7DK.md.png)
![启动xming.2](https://s1.ax1x.com/2022/11/20/zMX8PJ.md.png)

红框中的选项首次可以不选择，如果结果出现异常请返回这里勾选

![](https://s1.ax1x.com/2022/11/20/zMX154.md.png)

桌面右下角出现x图标则表示xming正常运行

![](https://s1.ax1x.com/2022/11/20/zMjpW9.png)

返回到xshell
配置转发端口

[root@xxx ~]# export DISPLAY=本机ip:0.0
本机IP可以通过命令行输入`ipconfig`
请先在服务器端ping一下本机ip，测试连通性

ping -c 4 本机ip #测试
`[roor@xxx~]#xhost +`
出现`access control disabled, clients can connect from any host`时成功运行
接下来以xclock为例

[roor@xxx~]#xclock
![Xclock](https://s1.ax1x.com/2022/11/20/zMjtYQ.png) #常见错误：

1. cannot display''
   解决方法：添加端口 export DISPLAY=本机ip：0.0
2. no protocol specified
   解决方法：xhost + 若仍报异常则不是此处问题
3. xming 日志文件
   `client 4 reject from ip` 解决方法：修改x\*.host文件，添加一行本机ip
   `client 4 reject from ip xxxx`解决方法：启动xming 时勾选

   No Access Control
