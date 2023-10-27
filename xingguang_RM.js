const { runLoop } = require("./utils/runnerManage.js");

let filePathList = ["xingguang.js"];

var backFunc = function () {
  var i = 6;
  while (i-- > 0) {
    var ele = textMatches("(抢现金|立即抢)").findOne(1000);
    if (ele) {
      return true;
    }
    sleep(3000);
    back();
    // backBySwipe()
  }
  return false;
};

runLoop(filePathList, 60, true, backFunc);
