---
title: python网络爬虫概述
description: python网络爬虫概述
date: 2022/12/30
image: /blogs-img/crawler.jpeg
published: true
tags: [Python, Crawler]
---

写在前面：网络爬虫对于网站管理者并不是一个很友好的行为，爬取时请遵守robots.txt协议。本爬虫教程系列比较简略，只会提到关键的地方，细节和编程基础仍需读者自己研究。

# 什么是网络爬虫？

> 网络爬虫（又称为网页蜘蛛，[网络](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C/143243?fromModule=lemma_inlink)机器人，在[FOAF](https://baike.baidu.com/item/FOAF/4916497?fromModule=lemma_inlink)社区中间，更经常的称为网页追逐者），是一种按照一定的规则，自动地抓取万维网信息的[程序](https://baike.baidu.com/item/%E7%A8%8B%E5%BA%8F/13831935?fromModule=lemma_inlink)或者[脚本](https://baike.baidu.com/item/%E8%84%9A%E6%9C%AC/1697005?fromModule=lemma_inlink)。另外一些不常使用的名字还有蚂蚁、自动索引、模拟程序或者蠕虫。[^1]

简单来讲，网络爬虫是一种以脚本或程序为手段，批量获取网络信息的行为。

# 用什么工具？

首选python，当然理论上具有网络编程特性的语言都可以做到，只是复杂度有所区别。
网络爬虫是一种以结果为导向的行为，所以并不是一定要用某一样工具，也不是局限于某一款IDE。比如如果一个网页上的信息是线性的表格，那么你可以使用：
excel的从web获取功能![从Web获取](https://pic4.zhimg.com/v2-49736f8b81005a225c0c3bc3e22ce9cb_r.jpg)
这个模块和python-pandas库的read_html方法类似，将HTML网页中的表格解析为DataFrame对象，返回列表。

```python
pandas.read_html(io, match='.+', flavor=None, header=None, index_col=None, skiprows=None, attrs=None, parse_dates=False, thousands=', ', encoding=None, decimal='.', converters=None, na_values=None, keep_default_na=True, displayed_only=True)
```

- 数据（IO）：接收网址、文件、字符串。
- 正则匹配数据（match）：正则表达式，返回与正则表达式匹配的表格。
- 解析方式（flavor）：解析器默认为‘lxml’，如果失败则返回bs4 + html5lib。
- 标题行（header）：指定列标题所在的行，list为多重索引。
- 解码方式（encoding）：解码方式，默认使用网页文档中的编码方式。

如果你能熟练的掌握以上方法，那么恭喜你掌握了最基础的网络爬虫。

# 需要遵守的协议

通常来说，网页管理者会把协议写在robots.txt内，如哔哩哔哩的爬虫协议：
[https://www.bilibili.com/robots.txt](https://www.bilibili.com/robots.txt)
![robots.txt](/blogs-img/bilibili_robots_txt.png)
显然，哔哩哔哩的协议里只允许部分搜索引擎爬取它的网页信息。

# python网络爬虫

## 需要的环境

建议使用python3，conda环境，当然自带的venv也是可以的

## 常用的爬虫库

### 请求部分

1.urllib3（其实现在不常用了）
2.requests

> Requests 是⽤Python语⾔编写，基于urllib，采⽤Apache2 Licensed开源协议的 HTTP 库。它⽐ urllib 更加⽅便，可以节约我们⼤量的⼯作，完全满⾜HTTP测试需求。

⼀句话——**Python实现的简单易用的HTTP库**
3.selenium
4.pandas（其实也不常用）
5.clicknium(新生代工具)

### 资源处理部分

1.requests(可以直接下载视频、音频、图片......)
2.lxml（强大的html处理库）3. re(正则表达式）4. pandas（强大的文件处理库）5. BeautifulSoup（bs4，靓汤，全能的）6. docx 7. csv 8. numpy（当matlab用）9. matplotlib（可视化的库）
10.threading（多线程）

### 调用外部引擎（软件）

1.多线程下载--IDM
2.you-get+ffmpeg
3.os.system||subprocess(调用cmd）
...

### 数据库

1.MySQL
2.MongoDB
...

## 主要步骤

-请求资源 -分析处理资源 -存储资源

[^1]: [网络爬虫\_百度百科](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E7%88%AC%E8%99%AB/5162711)
