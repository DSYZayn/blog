---
title: 多节点裸金属部署OpenStack的一些想法
description: 多节点裸金属部署OpenStack的一些想法
date: 2023/07/03
published: true
image: https://image.gumengya.com/i/2023/07/04/64a2f68b5b9b7.png
tags: [server, openstack]
---

> 前言：最近刚结束期末周，身心俱疲。本来打算最近几天完成三个节点的裸金属部署上OpenStack，讨论了一下决定先打磨方案，下学期再折腾。下面是目前的一些情况和想法。

# 服务器配置清单

| ID         |                                                        188                                                         |                                                        189                                                         |                          190                          |
| ---------- | :----------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------: |
| 服务器型号 |                                               HP Proliant DL160 Gen9                                               |                                               HP Proliant DL160 Gen9                                               |           DELLEMC<br /><br />PowerEdge R740           |
| CPU        |                                 2\*Intel(R) Xeon(R)<br />E5-2609<br />1.90GHz 6/6                                  |                                 2\*Intel(R) Xeon(R)<br />E%-2609<br />1.90GHz 6/6                                  | 2\*Intel(R) Xeon(R)<br />Bronze 3104<br />1.70GHz 6/6 |
| 内存       |                                                   6\*16DIMM DDR4                                                   |                                                  6\*16 DIMM DDR4                                                   |                    4\*16 DIMM DDR4                    |
| 硬盘       |                                             2\*300G SAS<br />6\*1T SAS                                             |                                             2\*300G SAS<br />6\*1T SAS                                             |                       3\*2T SAS                       |
| 网卡       | HP Ethernet<br />1Gb 4-port 331T<br />Adapter - NIC<br /><br />HP Ethernet<br />1Gb 2-port 361i<br />Adapter - NIC | HP Ethernet<br />1Gb 4-port 331T<br />Adapter - NIC<br /><br />HP Ethernet<br />1Gb 2-port 361i<br />Adapter - NIC |                          \                            |

[![IMG_20210102_103638.jpg](https://image.gumengya.com/i/2023/07/04/64a2f5900abd7.jpg '服务器实物')](https://image.gumengya.com/i/2023/07/04/64a2f5900abd7.jpg '服务器实物')

## 网络拓扑概览

[![微信图片_20230704002327.png](https://image.gumengya.com/i/2023/07/04/64a2f6105210c.png)](https://image.gumengya.com/i/2023/07/04/64a2f6105210c.png '网络拓扑概览')

## 虚拟化平台-vsphere

[![图片1.png](https://image.gumengya.com/i/2023/07/04/64a2f68b5b9b7.png)](https://image.gumengya.com/i/2023/07/04/64a2f68b5b9b7.png)

# OpenStack

*Openstack*是一个[云平台](https://baike.baidu.com/item/%E4%BA%91%E5%B9%B3%E5%8F%B0/3963188?fromModule=lemma_inlink)管理的项目，它不是一个软件。这个项目由几个主要的组件组合起来完成一些具体的工作。Openstack是一个旨在为公共及[私有云](https://baike.baidu.com/item/%E7%A7%81%E6%9C%89%E4%BA%91/7998789?fromModule=lemma_inlink)的建设与管理提供软件的[开源项目](https://baike.baidu.com/item/%E5%BC%80%E6%BA%90%E9%A1%B9%E7%9B%AE/3406069?fromModule=lemma_inlink)。它的社区拥有超过130家企业及1350位开发者，这些机构与个人将 Openstack作为[基础设施即服务](https://baike.baidu.com/item/%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E5%8D%B3%E6%9C%8D%E5%8A%A1/22700884?fromModule=lemma_inlink)资源的通用前端。Openstack项目的首要任务是简化云的部署过程并为其带来良好的[可扩展性](https://baike.baidu.com/item/%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7/8669999?fromModule=lemma_inlink)。本文希望通过提供必要的指导信息，帮助大家利用 Openstack前端来设置及管理自己的[公共云](https://baike.baidu.com/item/%E5%85%AC%E5%85%B1%E4%BA%91/10397972?fromModule=lemma_inlink)或私有云。

简单来说，vshpere提供虚拟机管理方案，而OpenStack可以提供如云平台一样的丝滑体验，参考**华为云**--FushionSphere OpenStack，即一个由开源OpenStack修改而来的商业版本。

## kolla-ansible

这是一个结构相对简单的项目，它通过一个shell脚本，根据用户的参数，选择不同的playbook和不同的参数调用ansible-playbook执行。使用kolla-ansible，可以简化OpenStack的部署过程。

kolla-ansible是基于Docker容器技术的工具，使用时将会创建一系列Docker容器来部署OpenStack。

<mermaid>
graph LR
a(master)-->b(compute1)
a-->c(compute2)
</mermaid>

_OpenStack_ 理论上可以提供私有云一样的完整服务，但是其各种服务可以单独安装也可以自由组合，基于我们目前的应用场景，暂时考虑只部署Compute(计算服务)，即虚拟机管控平台。

与vsphere不同的是，OpenStack能提供API以供开发者创建或销毁资源。

...未完待续
