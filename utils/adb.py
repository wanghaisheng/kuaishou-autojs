import adbutils
from adbutils import adb
import re,os,glob
# https://github.com/openatx/adbutils  要求python3.6 
# https://blog.csdn.net/xiaoerbuyu1233/article/details/122124201

adb = adbutils.AdbClient(host="127.0.0.1", port=5037)
for info in adb.list():
    print(info.serial, info.state)
    # <serial> <device|offline>

for d in adb.device_list():
    print(d.serial) # print device serial
    # 点亮屏幕
    d.shell("input keyevent KEYCODE_POWER")
    # 解锁
    d.shell("input keyevent 82")
    # 关屏时间
    d.shell("settings put system screen_off_timeout 10000000")
    # 屏幕常亮？？ https://www.jianshu.com/p/bae933aac556   在我的手机上，不管用。。。妈的
    d.shell("svc power stayon usb")

    for f in glob.glob(r'E:\code\open\kuaishou\**\*.js',recursive=True):
        localPath=f
        phonePath=f.replace("E:\code\open\kuaishou","/storage/emulated/0/脚本/kuaishou").replace("\\","/")
        print(localPath)
        print(phonePath)
        d.sync.push(localPath,phonePath)