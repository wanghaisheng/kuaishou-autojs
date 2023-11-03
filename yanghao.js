const {
  clickUnclickbleCenter,
  clickImg,
  findOneInScreen,
} = require("./utils/util");

main();

// 养号的逻辑。从一个页面中不断的刷，并且进行，点赞/评论/什么都不干，操作。中间要有一定时间的停留。
// 养号需要进行一定的时间，或者进行一定的次数。
function main() {
  console.log("等待进入位置");
  //   waitIntoTab();
  console.log("开始养号");
  loopDoUtilTime(
    () => {
      log("...");
      nextVedio();
      try {
        randomOperate()();
      } catch (error) {
        log("eeee");
      }
    },
    60 * 3,
    3
  );
}

function randomOperate() {
  // 点赞，评论，或者什么也不干
  var operateArr = [() => {}, dianZan, pingLun];
  return operateArr[random(0, 2)];
}

// 判断当前是否在工作页面；否则，自动进入，否则手动介入。
function waitIntoTab() {
  clickImg("./imgs/jx.jpg");
}

function loopDoUtilTime(func, seconds, randomSec) {
  var untilTime = seconds * 1000 + new Date().getTime();
  var randomWait = randomSec * 1000;
  while (new Date().getTime() <= untilTime) {
    func();
    sleep(random(100, randomWait));
  }
}

function nextVedio() {
  scrollForward();
  sleep(500, 1000); //时间可能要长一点
}

// nextVedio()

function dianZan() {
  clickUnclickbleCenter(findOneInScreen(id("like_icon").find()), 6);
}
// dianZan();

function pingLun() {
  clickUnclickbleCenter(findOneInScreen(id("comment_icon").find()), 6);
  sleep(random(100, 300));
  id("editor_holder_text").click();
  sleep(random(100, 300));
  className("EditText").setText("太另类了吧"); //todo 随机生层评论
  sleep(random(100, 300));
  id("finish_button").click();
  sleep(random(300, 400)); //网络等待
  id("tabs_panel_close").click();
}
// pingLun()
