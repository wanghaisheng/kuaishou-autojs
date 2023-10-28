//清理初始化环境
const {cleanInit,mutilClick,reloadApp,printEles}= require("util.js"); //!!!!! 特别注意，使用模块化，需要保存文件到指定设备。//这个路径，不确定原因，感觉是jvm-npm.js的事情导致的。

// reloadApp('钓鱼人')

// cleanInit("钓鱼人")

// 打印所有布局
// printEles()

// 寻找页面中的滚动控件
// log(id('view_pager').scrollable().find())
// log(scrollable().find())
// scrollForward()
// scrollDown(1)
// id('recycler_view').findOne().scrollForward()

// log(id("acpb_share_view").find())
// className('androidx.viewpager.widget.ViewPage').findOne().scrollDown()
// id('lrvhRecyclerView').findOne().scrollForward()

// textMatches("作品").findOne()

log(currentPackage())//com.smile.gifmaker