---
layout: post
title: "重装 Gentoo"
description: "重装 Gentoo 的一些记录"
keywords: "gentoo, 重装"
category: Linux
tags: [Gentoo]
---
{% include JB/setup %}

微薄上已经吐糟过了，对象不是 Gentoo，是漫天的黑苹果教程，能让你晕头转向的教程，知其然不知其所以然的教程。因此，一个 Windows 下的分区操作，将系统统统抹掉。说起来也简单，就是安装 HFS+ 文件系统的支持，然后发现更简单的，卸载掉 HFS+ 文件支持的一个破解软件。然后.....没有然后，全部没了.....这就是故事的开始。

幸好，在 Github 上找到了自己一年前的一些简单备份。幸运的是 world 文件与 package.use 文件都在。尽管 kernel .config 文件实在是找不到了。

笔记本打开 Gentoo handbook，变化好大....记录下吧，这就是有这边文章的原因。

<!-- more -->
双系统开始安装，一块 SSD 硬盘就分成2个分区，第一分区放 Windows 8.1，第二分区放 Gentoo。Windows 8.1 的安装就不做记录了，Gentoo 开始。

liveusb 点亮机子，下载最新的 stage 与 portage 后，各种 mount 后 chroot

```
mkfs.ext4 /dev/sda2
mount /dev/sda2 /mnt/gentoo
mount -t proc proc /mnt/gentoo/proc
mount --rbind /sys /mnt/gentoo/sys
mount --rbind /dev /mnt/gentoo/dev
chroot /mnt/gentoo /bin/bash
env-update && . /etc/profile
emerge --sync
eselect profile list
echo "Europe/Brussels" > /etc/timezone
emerge --config sys-libs/timezone-data
nano -w /etc/locale.gen
locale-gen
eselect locale list
eselect locale set n
nano -w /etc/env.d/02locale
env-update && . /etc/profile
nano -w /etc/conf.d/net
nano -w /etc/conf.d/hostname
ln -sf /etc/init.d/net.lo /etc/init.d/net.enp3s0
nano -w /etc/fstab
nano -w /etc/hosts
passwd root
emerge syslog-ng
rc-update add syslog-ng default
emerge mlocate
emerge dhcpcd
emerge gentoo-sources
```

然后就是按照自己的机子配置，正确配置 cpu、主板芯片组、硬盘、网卡驱动即可，保证重启后能内核顺利跑起来网络OK就行，详细的后面再折腾。

最后安装 syslinux

```
emerge -av syslinux
dd bs=440 conv=notrunc count=1 if=/usr/share/syslinux/mbr.bin of=/dev/sda
mkdir /boot/extlinux
extlinux --install /boot/extlinux
cp /usr/share/syslinux/{chain.c32,menu.c32,memdisk,libcom32.c32,libutil.c32} /boot/extlinux/
```

创建 `/boot/extlinux/extlinux.conf`，内容

```
UI menu.c32
PROMPT 0

MENU TITLE Boot Menu
TIMEOUT 50
DEFAULT gentoo

LABEL gentoo
    MENU LABEL Gentoo Linux 3.14.3
    LINUX /boot/3.14.3-gentoo
    APPEND root=/dev/sda2 radeon.audio=1 radeon.dpm=1

LABEL windows
    MENU LABEL Windows 7 Ultimate
    COM32 chain.c32
    APPEND hd0 1
```

退出后重启电脑。内核包括网络顺利跑起来

然后从 github 上托下 world 与 package.use，当然还有 make.conf

由于我不喜看满屏的跑代码发呆。所以，make.conf 中我特意加入了以下选项

    EMERGE_DEFAULT_OPTS="--quiet-build=y --keep-going=y --with-bdeps=y"

由于我以前的 make.conf 有 layman 行，注释掉 layman 行，先 `emerge -av layman`，然后再去掉注释符

再看了下 /var/lib/portage/world，虽然是一年前的东东，但是还是蛮全的。

```
emerge -avuDN world
```

得益于强劲的 i7 与 16GB 内存。2个半小时所有软件全部安装完工。期间有几次 remerge，不管它，完成后再执行几次 `emerge -avuDN world` 直到全部安装完即可。当然一些软件包依赖 kernel 的 .config 中的配置，按照提示去修改即可。

由于我使用的是 awesome，发现 .xinitrc 文件压根不用我们自己写了，现成的

```
useradd -m -G users havanna
passwd havanna
su - havanna
cp /etc/X11/Sessions/awesome ~/.xinitrc
```

默认没有 `ctrl_alt_bksp` 回退到控制台的

在 `~/.xinitrc` 中加入

    setxkbmap -option terminate:ctrl_alt_bksp

最后 startx，桌面起来了.......然后，又是漫长的各个软件的家目录配置。

END
