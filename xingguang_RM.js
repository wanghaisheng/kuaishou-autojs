const { runLoop } = require("./utils/runnerManage.js");
const { pinLog, reloadApp, cleanInit } = require("./utils/util.js");

//检测当前是否已经在入口了
var ele = textMatches("(抢现金|立即抢)").findOne(3000);
if (!ele) {
  //启动快手
  let appName = "快手";
  reloadApp(appName);
  cleanInit(appName);
  mannulInit();
}

//提示操作
function mannulInit() {
  pinLog.warn("请手动找到，星光红包初始界面!!");
  while (1) {
    sleep(1000);
    var ele = textMatches("(抢现金|立即抢)").findOne(3000);
    if (ele) {
      pinLog.log("已经处于初始界面，谢谢！！！");

      pinLog.log("");
      break;
    }
  }
}

let filePathList = ["xingguang.js"];

var backFunc = function () {
  var i = 6;
  while (i-- > 0) {
    var ele = textMatches("(抢现金|立即抢)").findOne(3000);
    if (ele) {
      return true;
    }
    sleep(100);
    back();
    // backBySwipe()
  }
  console.warn("回退失败。用户干预");
  pinLog.log("错误【回退失败】请用户干预！！");
  //手动干预
  mannulInit();
  return false;
};

runLoop(filePathList, 60, true, backFunc);
