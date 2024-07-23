---
title: 编译安装postgresql
description: 编译安装postgresql
published: 2023/03/26
slug: 编译安装postgresql
---
环境声明：centos7 postgresql-v15.2 安装目录 /home/psql

> 前言：通常我们采用官方推荐的方式安装postgresql，像这样：

```shell
sudo yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm  
sudo yum install -y postgresql15-server  
sudo /usr/pgsql-15/bin/postgresql-15-setup initdb  
sudo systemctl enable postgresql-15  
sudo systemctl start postgresql-15
```

在这一个代码块中，如果你以root身份登陆，可以省略sudo。首先它下载了postgresl最新的rpm包，然后对postgresql15-server进行了安装，接下来它切换到postgresql的bin目录，使用initdb程序初始化了数据库（请注意必须以非root身份使用），最后它被添加为开机自启并且启动了postgresql数据库。

# 编译安装的不同

无论是使用rpm命令还是yum命令安装的都是**已编译好**的程序包，在整个安装过程中用户只需执行一条命令即可完成安装。这样带来的好处是方便，但因为是安装的是**已编译好的包，所以用户的系统平台环境必须与rpm包制作者的系统平台环境相同**。此外，如果用户要安装使用某程序上的某个功能，而rpm包制作者在编译过程中默认没有指定该功能的实现，这时候该怎么办呢？更何况如果某程序只是提供源码而没有现成的rpm包。这时就需要用户手动编译安装了，而**编译安装就是将程序源代码编译成完全适合自己平台类型的程序包。**

# 面对真实需求

- root用户磁盘空间较小，/home挂载的空间较大
- 无法使用yum直接安装在/home
- 其他原因

# 思路解析

既然不能使用yum工具一条命令完成安装，那么我们可以将程序源代码编译成完全适合自己平台类型的程序包，再安装到/home目录。
在这个过程中，我们首先要知道的是postgresql不允许root用户登陆，因此我们需要创建一个用户组并在其中创建一个用户。
其次，我们使用wget命令下载psql程序源代码，编译安装。
最后，我们添加进程保护配置、环境变量、程序授权、数据库初始化
到这里以后，你就可以正常使用psql数据库了。

# 具体步骤

> 下面登陆为root用户

## 创建用户组及用户

```shell
#创建群组
groupadd postgres
#创建用户postgres 并指定群组为postgres
useradd -g postgres postgres
```

## 下载程序源码

下载PostgreSQL源码，点击 [PostgreSQL](https://ftp.postgresql.org/pub/source) 进入源码版本选择页，可以选择相应的版本

```shell
# 下载psql源码
wget https://ftp.postgresql.org/pub/source/v15.2/postgresql-15.2.tar.gz
# 解压
tar zxvf postgresql-15.2.tar.gz
#切换目录
cd postgresql-15.2
```

## 编译及安装

1.配置编译参数

```shell
# 查看编译参数
# ./configure --help
# 选择相应的参数，生成makefile文件
./configure --prefix=/home/psql --with-pgport=5432
```

**执行configure脚本的作用：**

①用户可以通过选项传递参数给configure脚本，以指定启用的功能特性、安装路径等；而configure脚本在执行的过程中会参考用户的指定以及Makefile.in文件生成makefile文件；

②检查程序指定要启用的功能特性所依赖到的外部环境。
\--prefix参数是指定编译安装的目录；--with-pgport是指定psql的端口，通常为5432

2.编译安装

```shell
#编译
make
#安装
make install
##也可以使用&&符号，表示如果make没有发生错误即执行make install 
make && make install
```

3.安装第三方工具

```shell
cd contrib
#编译安装
make && make install
```

运行下面的命令
`/home/psql/bin/pg_ctl -V`
如果显示`pg_ctl (PostgreSQL) 15.2`以及类似的消息，即表示已经安装成功了。但只是表示安装成功了，离正常使用还差的远。

## 配置服务

centos 使用systemd启动守护进程，`systemd`默认的服务目录为`/usr/lib/systemd/system`，安装psql服务需要在该目录下创建一个文件，为了和软件保持一致，这里我命名为psql.service 在该文件中添加以下内容：

```shell
[Unit]
Description=The PostgreSQL Database Server
After=syslog.target
After=network.target

[Service]
Type=forking
User=postgres
Group=postgres

ExecStart=/home/psql/bin/pg_ctl start -D /home/psql/data
ExecStop=/home/psql/bin/pg_ctl stop
ExecReload=/home/psql/bin/pg_ctl reload -D /home/psql/data
TimeoutSec=300

[Install]
WantedBy=multi-user.target
```

虽然这里配置好了，但是仍然无法使用`systemctl start psql`来启动数据库服务，这里有三个原因

1. 没有初始化数据库
2. 没有登陆postgres用户
3. psql的权限还没有更改
   在解决这三个问题之前，我们需要为postgres用户指定一个家目录。

```shell
chown postgres -R /home/psql
usermod -d /home/psql postgres
```

然后添加环境变量,在这里我们在/etc/profile中添加如下语句
`export PATH=/home/psql/bin:$PATH`

## 提升psql的权限

```shell
chmod -R 777 /home/psql
```

## 登陆postgres用户并初始化

```shell
su postgres
cd /
mkdir data
cd /bin
./initdb -D ./../data
```

# 收尾工作

登陆root用户，从root启动psql服务

```shell
cd 
systemctl start psql
```

参考文献：

1. [PostgreSQL编译安装](https://zhuanlan.zhihu.com/p/356300088)
2. [kill命令大全](https://www.runoob.com/linux/linux-comm-kill.html)
3. [Linux添加新用户及创建主目录](https://blog.csdn.net/u013602059/article/details/120338496)
4. [Linux上安装PostgreSQL](https://www.runoob.com/postgresql/linux-install-postgresql.html)
5. [PostgreSQL编译安装详细过程](https://blog.csdn.net/sdut406/article/details/116839968)
6. [源码编译安装PostgreSQL](https://blog.csdn.net/xk_xx/article/details/122985115)
7. [PostgreSQL download](https://www.postgresql.org/download/linux/redhat/)
8. [Linux系统服务神器：systemctl的配置与使用](https://juejin.cn/post/7059400745665167397)
