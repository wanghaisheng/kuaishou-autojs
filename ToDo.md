结果，fail，和slow，如何回退? 粗暴的使用back+检测，循环6次，多次尝试回退的方式。
修正日志显示？windows绘制之后，再填入文字，才能拿到文字撑开的位置。进而进行位置定位。
如果杀掉进程，并且重新进入到活动？目前是利用，分享，复制连接。读取剪切板，然后切入应用的方式。（未完成，找图找色部分）
如果检测页面并没有变化。？无解
添加reload。？
联合调试，取关方法。？没必要取关，如果当做个人账号，是可以联合起来取关的，但是，这些主播内容垃圾，但是，确实从业务角度都是吸金大户。值得关注。

调整架构方式。

快手页面，可能随时跳出来一个页面，影响下一个页面的运行。

1. 定义所有的单个页面的操作。
2. 注册到数据库中。并且，使用goto的方式。

多个红包，多个状态的匹配。还要阻塞等待。

找到在屏幕中的组件

还有可能组件叠加在一起。

过程中，还可能直接跳过

## 业务分析
找包，抢包，一拖多。

红包分类

//红包类型，星光热门红包，(会自动弹出来，执行关注主播操作，读秒，、手慢了，红包拍完了，退退，)
//穿云箭红包，点击之后，自动抢，自动公布。读秒，等待发榜。
//人气助力票，
//人气榜红包

### app入口

## 架构方式

## todo
- [x] pinLog 日志修改
- [ ] 关注满上限监控
- [ ] 自动触发取关流程
- [ ] 然后，养号

## 防屏蔽
1. 随机养号
2. 防屏蔽框架
3. 群控，多台机器部署脚本，启动脚本。卸载升级脚本。? 感觉需要搭建一个dns服务。提供所有不同手机的不同网络进行访问。
4. 多台机器redis共享内存。订阅发布模式进行。分布式任务的方式。