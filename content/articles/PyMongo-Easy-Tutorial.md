---
title: PyMongo简易教程
description: PyMongo简易教程
published: 2023/03/19
slug: PyMongo简易教程
---
> 前言：本教程旨在弥补中文互联网上pymongo教程不适配4.0版本的一些问题
> 本教程基于4.3.3版本

# 下载PyMongo

**pip** 是一个python官方的包管理工具

```shell
pip install pymongo
# 你可以指定安装pymongo版本，像这样:
pip install pymongo==4.3.3 
#如果你希望搜索到大部分的中文文档是有效的，请勿使用4以上的版本

```

# 连接MongoDB

## 无认证方式

如果你的MongoDB数据库无需认证即可操作，可以直接使用以下两种方式连接：

```python
import pymongo
if __name__=="__main__":
# 第一种方式，指定参数
    client = pymongo.MongoClient(host="localhost",# 主机名
							     port="27017"# 端口名
							    )
#第二种方式，使用uri直接连接
	client = pymongo.MongoClient("mongodb://localhost:27017/")
```

以上两种方式的效果是完全一样的,返回一个MongoClient对象

## 有认证方式

`请注意`：pymongo在升级到4.0版本以后带来了大量的变化，具体细节参考[pymongo官方文档](https://pymongo.readthedocs.io/en/stable/index.html)

```python
import pymongo
if __name__=="__main__":
#pymongo==4.3.3
# 方式一
	client = pymongo.MongoClient(
							  host='example.com',# 主机名
							  port='27017',# 端口名
							  username='user',
							  password='password',
							  authSource='the_database',# 数据库名
							  authMechanism='SCRAM-SHA-256'# 加密方式)
# 方式二
	uri = "mongodb://user:password@example.com/?authSource=the_database&authMechanism=SCRAM-SHA-1"
	client = pymongo.MongoClient(uri)
# MONGODB-CR加密方式已不支持登陆，该加密方式已被MongoDB废弃
```

# 创建集合

MongoDB将文档存储在集合中。集合类似于关系数据库中的表。

```mermaid
graph TB
n(MongoDB)-.-a(database)-->b(collections)-->c(documents)
s(MySQL)-.-aa(database)-->bb(tables)-->cc(rows)
```


| SQL术语     | MongoDB术语 | 解释                                 |
| ------------- | ------------- | -------------------------------------- |
| database    | database    | 数据库                               |
| table       | collection  | 数据库表/集合                        |
| row         | document    | 数据记录行/文档                      |
| column      | field       | 数字字段/域                          |
| index       | index       | 索引                                 |
| table joins |             | 表连接，MongoDB不支持                |
| primary key | primary key | 主键，MongoDB自动将_id字段设置为主键 |

```python
import pymongo
# 创建一个python字典列表，包含8个字典
cars = [ {'name': 'Audi', 'price': 52642},
    {'name': 'Mercedes', 'price': 57127},
    {'name': 'Skoda', 'price': 9000},
    {'name': 'Volvo', 'price': 29000},
    {'name': 'Bentley', 'price': 350000},
    {'name': 'Citroen', 'price': 21000},
    {'name': 'Hummer', 'price': 41400},
    {'name': 'Volkswagen', 'price': 21600} ]

client = MongoClient('mongodb://localhost:27017/')

with client:

    db = client.testdb
    db.cars.insert_many(cars)# 将字典列表插入为集合，一个字典存储为一个文档（BSON格式)
```

# 列出集合

使用`list_collection_names()`

# 列出数据库

使用`list_database_names()`

# 删除集合

使用`drop()`
格式：<数据库>.<集合>.drop()

```python
# 省略连接数据库过程
mydb = client.testdb
mydb.cars.drop()
```

# 运行命令

```python
#省略连接数据库过程
mydb = client.testdb
status = mydb.command("serverStatus")
print(status)
#如果报错请检查用户权限
```

# PyMongo游标

`find()`方法返回一个PyMongo游标，这与pymysql是类似的
该游标是对查询结果集的引用

```python
#使用上下文管理 client,省略数据库连接过程
with client:

    db = client.testdb

    cars = db.cars.find()#使用游标

    print(cars.next())#从结果集中获取下一个文档
    print(cars.next())
    print(cars.next())

    cars.rewind()#将游标倒回到未评估状态

    print(cars.next())
    print(cars.next())
    print(cars.next())  

    print(list(cars))#将游标转换为列表，它将所有数据加载到内存中
```

# 其他

参考[极客教程-pymongo](https://geek-docs.com/python/python-tutorial/python-pymongo.html#ftoc-heading-7)
该文档较新但仍有部分内容不适用于pymongo4以上的版本，如果发现了未找到xxx方法的错误，请及时移步官方文档查看变更。
