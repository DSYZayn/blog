---
title: 基于玩客云的软路由实验
description: 基于玩客云的软路由实验
date: 2024/01/25
published: true
image: https://s2.loli.net/2024/01/25/9KXTobEgQyWZnvJ.png
tags: [openwrt, 软路由]
---

> 前言：结合前期实验室的软路由需求，需要有一个独立设备用于播发Tailscale子网流量，发现软路由非常适合这样的需求，但由于传统软路由价格较高，所以想到使用玩客云这款已经退市的设备刷上openwrt系统来实现我的想法。

# 实验环境

软件环境可以直接上网搜，挺多的。

## 硬件环境

- 玩客云v1.3一台，无电源，送公对公线一条 -->25.97元
- 12V 1.5A电源一只-->旧设备不用的 0元
- 单独购买了公对公线一条 --> 7.73元
- 平口螺丝刀一把
- 小梅花螺丝刀一把
- 吹风机一只
- win11电脑一台

## 软件环境

- Amlogic_USB_Burning_Tool_v2.2.4
- openwrt-07.29.2023-diy-for-cheng-burn-by-cheng.img
- chrome浏览器
- ssh连接工具

## 实验过程

## 拆机

玩客云的接口侧是一个盖板加下方的机器。注意翘起的仅仅是盖板，盖板下方是有螺丝的一层板。
吹风机热风加热SD卡出，将平口螺丝刀插入接口侧盖板，随着双面胶逐渐软化，慢慢沿边缘划开盖板并翘起。
![IMG_20240125_155548.jpg|300](https://s2.loli.net/2024/01/25/Hpq5JUeBVWcQ3Pn.png)
撬开第一层之后是这样的：
![IMG_20240125_155624.jpg|300](https://s2.loli.net/2024/01/25/OI2JhLvjuBYaqQt.png)
用梅花螺丝刀卸下小螺丝，保存好
![IMG_20240125_160648.jpg|300](https://s2.loli.net/2024/01/25/unAaJKdPRVIU9TO.png)

## 刷入openwrt固件

1. 打开Amlogic_USB_Burning_Tool_v2.2.4
2. 文件->导入烧录的固件openwrt-07.29.2023-diy-for-cheng-burn-by-cheng.img
3. 刷机线连接电脑和玩客云，注意接入玩客云靠近HDMI的USB接口
4. 短接触点，此时不要给玩客云通电,用平口螺丝刀短接即可，有镊子也可以![image.png|300](https://s2.loli.net/2024/01/25/a6mCuTt1FfSliNR.png)
5. 保持短接状态，插上电源，直到软件识别出USB HUB设备时取消短接
6. 点击开始，刷入固件![wx_camera_1706188339530.jpg|300](https://s2.loli.net/2024/01/25/Rv7LTXeuw183GQn.png)
7. 刷入完成后点击**停止**断开USB连接，关闭软件，移除刷机线。
8. 拔出电源，重新插入电源。

## 配置网络

1. 网线直接连接玩客云与电脑
2. (可省略)在电脑的ssh工具中连接192.168.2.2,账号密码均为root![mmexport1706191635307.png|300](https://s2.loli.net/2024/01/25/9KXTobEgQyWZnvJ.png)
3. 访问192.168.2.2![mmexport1706191626848.png|300](https://s2.loli.net/2024/01/25/l9Uv8rC1DIoztyk.png)
4. 设置接口为DHCP获取ip地址，并配置ipv6.

- 网络->接口->lan->静态ip改为dhcp
- 新增接口->wan6->开启dhcpv6->ipv6中继模式
- 最后保存并应用

5. 这时可以将玩客云接入路由器了，它会自动获取ip地址，可在路由器面板上看到，其hostname是**cheng**

## 安装并配置tailscale

Tailscale是一个用于异地组网的工具，如你不需要，可以跳过本节

### 安装Tailscale

- 系统->软件包->下载并安装软件包->输入tailscale并确认
- (或者)ssh连接，输入命令`opkg install tailscale`

### 登录tailscale

ssh连接，输入命令tailscale up,然后访问链接登录即可

# 参考文章

[1] [小风博客](http://blog.xiaofengguanjia.top/)
[2] [玩客云/网心云刷OpenWrt当旁路由教程](https://www.jianshu.com/p/ab86fd279942)
[3] [拯救矿渣，玩客云部署甜糖，迄今为止最好的，保姆式教程 1月6日更新](right.com.cn/forum/thread-4058499-1-1.html)
