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
  getclipX,
} = require("./utils/util");

const { timeoutBreakPoint } = require("./utils/timeoutBreakPoint.js");

// for (let index = 0; index < 100; index++) {
//   log(genComment());
// }

// log(currentActivity())
// // n27.a
// //com.yxcorp.gifshow.HomeActivity

// log(currentPackage())
var ele = textMatches(".*直播.*").clickable().find();
log(ele)
// //com.smile.gifmaker
// 进入直播间  暂未直播，去个人主页

// pinLog.log("抢包次数 " + 0 + " 命中次数 ");

// var thread = threads.start(function () {
//   //在子线程执行的定时器
//   // setInterval(function(){
//   //     log("子线程:" + threads.currentThread());
//   // }, 1000);
//   timeoutBreakPoint.mark("kkkk", 11);

//   sleep(10 * 1000);
// });

// log("当前线程为主线程:" + threads.currentThread());

// while (1) {
//   if (timeoutBreakPoint.isTimeout("kkkk")) {
//     log("子程序超时");
//     thread.interrupt();
//     timeoutBreakPoint.clear();
//     break;
//   }
// }

// pinLog.log("中国人名很行fdf")
// sleep(3000)
// pinLog.warn("非常nice")
// pinLog.log("3秒后消失",3)
// sleep(1000)
// // pinLog.hidden()
// sleep(11000000000)

// events.observeToast();

// events.onToast(function(toast){

// log("Toast内容: " + toast.getText() + " 包名: " + toast.getPackageName());

// });

// sleep(1000000000)

// const { clickImg,keepAlive } = require("./utils/util");

// keepAlive()


// t=0.1
// requestScreenCapture();

// while(t<=1){
//     clickImg("./imgs/jx.jpg",t);
//     t=t+0.1
// }

