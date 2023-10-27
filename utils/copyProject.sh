#!/bin/bash

# 请确保已经安装了ADB工具并将其添加到系统环境变量中

# 设置要同步的文件夹路径和目标手机路径
local_folder="E:\code\open\kuaishou"
phone_folder="/storage/emulated/0/脚本/kuaishou/utils"

# 检查ADB连接是否正常
adb devices

# 挂载手机存储设备为可读写模式
adb shell mount -o rw,remount /system

# 创建目标文件夹（如果不存在）
adb shell mkdir -p $phone_folder

# 将文件夹中的所有文件逐一复制到手机上
for file in "$local_folder"/*; do
    adb push "$file" "$phone_folder/"
done

# 按需设置文件权限和所属用户/组
# adb shell chmod -R <permissions> $phone_folder
# adb shell chown -R <user>:<group> $phone_folder

echo "同步完成！"