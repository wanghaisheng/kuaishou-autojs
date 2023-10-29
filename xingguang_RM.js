const { runLoop } = require("./utils/runnerManage.js");
const {
  pinLog,
  reloadApp,
  cleanInit,
  clickUnclickbleCenter,
  stopOther,
} = require("./utils/util.js");
const { getClipX, setClipX } = require("./utils/clip.js");

stopOther();
auto.waitFor();
console.show();

let appName = "快手";
//检测当前是否已经在入口了
console.log("检测用户是否在活动入口");
//中间用户需要操作，等待用户切app，所以时间稍微长一点
if (
  currentPackage() != "com.smile.gifmaker" ||
  textMatches("(抢现金|立即抢)").findOne(5000) == null
) {
  console.log("当前不在入口，尝试自动进入");
  if (!autoIn()) {
    mannulInit();
  }
}

function autoIn() {
  //未来改成，从服务拉取
  var kuaishouShare = getClipX();
  //清空剪切板

  // setClipX("好的");

  // var kuaishouShare =
  //   "https://v.kuaishou.com/bvoyJh 才艺💃幺妹妹的直播很精彩，快来围观！点击链接，打开【快手】直接观看！";
  console.log(kuaishouShare);
  if (!kuaishouShare || kuaishouShare.indexOf("v.kuaishou.com") < 0) {
    //剪切板不存在分享,手动操作https://v.kuaishou.com/ajbtws 潮社男孩1.0练气版的直播很精彩，快来围观！点击链接，打开【快手】直接观看！
    console.log("自动进入失败。不存在剪切板分享入口");
    return false;
  }

  console.log("开始自动进入");

  //打开app，找到弹框，点击进入
  reloadApp(appName);
  cleanInit(appName);

  console.log("等待进入快手");
  while (currentPackage() != "com.smile.gifmaker") {
    sleep(1000);
  }

  // 找到弹框
  console.log("等待弹框");

  var ele = textMatches("[^的]*直播.*").id("action").clickable().findOne();
  log(ele);

  if (!ele) {
    console.log("未自动弹出，自动进入失败");
    return false;
  }

  if (ele.text().indexOf("暂未直播") > 0) {
    //todo 重新切换，重新复制粘贴板，切换应用
  }

  sleep(1000);
  log(ele);
  ele.click();
  // press(x, y, 1)

  console.log("查找星光活动"); //todo

  console.log("自动进入失败");
  return false;
}

//提示手动操作
function mannulInit() {
  console.log("请手动找到，星光红包初始界面!!");
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
  //todo 重启进入
  return false;
};

runLoop(filePathList, 60, true, backFunc);
