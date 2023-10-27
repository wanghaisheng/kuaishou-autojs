const {
  cleanInit,
  reloadApp,
  l,
  netDelay,
  aWhileExit,
  pinLog,
  clickImg,
  clickUnclickble,
  clickUnclickbleCenter,
  nowDate,
  findOneInScreen,
  findInScreen,
} = require("./utils/util");

const { timeoutBreakPoint } = require("./utils/timeoutBreakPoint.js");

// for (let index = 0; index < 100; index++) {
//   log(genComment());
// }

// log(currentActivity())
// // n27.a
// //com.yxcorp.gifshow.HomeActivity

// log(currentPackage())

// //com.smile.gifmaker

// pinLog.log("抢包次数 " + 0 + " 命中次数 ");

var thread = threads.start(function () {
  //在子线程执行的定时器
  // setInterval(function(){
  //     log("子线程:" + threads.currentThread());
  // }, 1000);
  timeoutBreakPoint.mark("kkkk", 11);

  sleep(10 * 1000);
});

log("当前线程为主线程:" + threads.currentThread());

while (1) {
  if (timeoutBreakPoint.isTimeout("kkkk")) {
    log("子程序超时");
    thread.interrupt();
    timeoutBreakPoint.clear();
    break;
  }
}
