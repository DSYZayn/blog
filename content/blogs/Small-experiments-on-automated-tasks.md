---
title: 自动化任务的小实验
description: 自动化任务的小实验
date: 2023/07/18
image: /blogs-img/whyour_qinglong.png
published: true
---

# 平台与工具

无论是Windows 系统或是 Linux 系统，都不是最重要的，考虑到自动化任务通常需要长期后台运行、不间断、无人看管，因此最适合作用于服务器上。
本次自动化任务实验选用Centos 7作为底层系统，使用shell脚本，借助qinglong面板管理自动化任务。
需要特别说明的是，通常在linux平台运行自动化脚本程序只需要使用crontab即可，考虑到后续脚本数量可能增多、有git hook的需求以及脚本监控的需要，因此采用功能强大的青龙面板。
此外，自动化任务的脚本可以是任何脚本语言，如Python。

# 实验设计

## 环境描述

- Centos 7 3.10.0-1160.92.1.el7.x86_64
- Bash
- Docker
- whyour/qinglong

### 青龙面板--linux依赖：

- tcl
- expect

## 目标任务

- 在docker容器中执行调用外部脚本clear.sh
- 定期删除/home/rubbish/\*

## 脚本代码

```shell
# clear.sh
#test for schedule scripts

echo "start to clear rubbish"
starttime=$(date +%Y-%m-%d\ %H:%M:%S)
echo $starttime
rm -rf /home/rubbish/*
```

<mermaid>
graph LR
a(输出整饰要素)-->b(执行删除命令)
</mermaid>

```shell
# execOut.sh
#!/usr/bin/expect -f
set cmd_prompt "]#|~]?"
spawn ssh root@172.17.0.1
expect {
		 "yes/no" { send "yes\n";exp_continue }
		 "password" { send "mysecret\n" }
}
expect -re $cmd_prompt
send "df -h\n"
send "source ~/scripts/clear.sh\n"

expect eof
```

<mermaid>
graph LR
a(设置环境变量)-->b(启动一个进程ssh连接外部环境)-->c(tcl 模式-动作语法向expect发送信息模拟登陆)-->d(匹配字符串)-->e(发送磁盘监控命令并调用clear.sh)-->f(移交控制台给用户 一段时间后自动退出)
</mermaid>

## cli操作

新建/home/rubbish,并填充测试文件
运行docker-qinglong，使用docker cp导入execOut.sh脚本（目标路径为/ql/data/scripts/path/to/execOut.sh)
在青龙面板中启用脚本任务

### crontab

[参考] 0 15 10 ? \* 6#3

### 命令/脚本

/usr/bin/expect /ql/data/scripts/path/to/execOut.sh

### linux依赖

**必须** ：tcl expect

# 实验结果及讨论

```
单次运行成功，expect eof将会在约8秒后自动退出用户，整体运行11秒，但并无额外开销，只是单纯进程未结束。
```

![运行日志](https://image.gumengya.com/i/2023/07/19/64b6db336e890.png)
理论上单次成功即可正常周期自动化运行，因此crontab表达式设置为每月一次。其次，当脚本数量增多且代码量增大时，考虑使用git进行版本管理，直接在青龙面板中订阅git仓库即可达到hook的效果（实际上只是定期拉取仓库,跟hook不一样)。
整体实验完成度较好。
