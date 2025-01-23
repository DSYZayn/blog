---
title: 真实需求下的极简爬虫记录
description: 真实需求下的极简爬虫记录
date: 2023/02/07
slug: 真实需求下的极简爬虫记录
---

### 前言

[post cid="607" cover="" size=""/]

# 需求

爬取‘国际海运网’的港口数据。

# 页面分析

![pic1](https://ass.dongsy.com.cn/imgs/shippingchina01.png)

可以看到，该页面布局为简单的线性表，目标信息位于标签\<table>中，没有ajax请求

# 爬取思路分析

前言提到，爬虫是以结果为导向的一种技术，无关乎技术栈的选择。既然目标信息位于简单的线性表中，所以考虑pandas 库中的read_html方法，理论上代码量和速度都会比使用requests库更好。

### 有效url分析

显然首页的/index并不是可以批量提取目标信息的url，于是点击下一页，观察url的变化。

幸运的是，这个网页十分的简单，很容易就发现了这个含有页数的有效url

> **http://info.shippingchina.com/tools/worldport/index/oneday//type//page/3.html**

要做的只是进行字符串拼接

## 理论可行，实践开始：

[hplayer]
[Music server="tencent" id="002prJCQ3ymbaT" type="song"/]
[/hplayer]

### 环境配置

> conda :Python3.11

> dependencies:pandas------1.5.1

> IDE:Pycharm

### 初探网页

```Python
import pandas as pd
# 因为代码量极少，所以我们直接面对过程编程即可
page = 1 #测试第1页能否正常爬取
url = f"http://info.shippingchina.com/tools/worldport/index/oneday//type//page/{page}.html"
res = pd.read_html(url)
print(res, type(res))
```

#### 分析返回结果

![分析返回结果](https://image.gmit.vip/i/2023/02/19/63f21273ebb09.jpg)

可见，这个方法很奏效，返回了一个两个元素的list,这代表了寻找到了两个\<table>标签，第一个出现的原因是网页中搜索框是一个单独的\<table>。我们去网站上验证一下：

![第一个元素的验证](https://image.gmit.vip/i/2023/02/19/63f212799c4f4.jpg)

接下来就简单了，只需要获取第二个元素进行整备存储即可。

### 数据的拼接

通过查看列表第二个元素的类型，发现为

> <class 'pandas.core.frame.DataFrame'>

这意味着这个表是DataFrame类型，适用于DataFrame的所有方法。

在批量爬取目标信息时，使用concat方法，默认纵向拼接，它会自动对接列名字段。

```Python
df = pd.DataFrame()  # 新建一个空数据表
url = f"http://info.shippingchina.com/tools/worldport/index/oneday//type//page/{page}.html"
res = pd.read_html(url)[1]
res.set_index('序 号', inplace=True)
df = pd.concat([df, res], ignore_index=True)
time.sleep(random.uniform(0.5, 2))  # 随机延迟0.5-2s,规避网页对爬虫的限制以及可能的网页性能问题
```

# 完整代码

```Python
#!/usr/bin/env
# -*- coding: UTF-8 -*-
# @filename :getPort.py
# @author: zayn
# @datetime:2023/2/7 22:41
import random
import time

import pandas as pd

if __name__ == '__main__':
	# |**  程序入口  **|
	df = pd.DataFrame()
	print(df)
	for page in range(1, 48):

		url = f"http://info.shippingchina.com/tools/worldport/index/oneday//type//page/{page}.html"
		res = pd.read_html(url)[1]
		res.set_index('序 号', inplace=True)
		df = pd.concat([df, res], ignore_index=True)
		time.sleep(random.uniform(0.5, 2))

	df.to_csv('./port.csv', index=False)
```

### 结果展示

![](https://image.gmit.vip/i/2023/02/19/63f21279a1a19.jpg)
