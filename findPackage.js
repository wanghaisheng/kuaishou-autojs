// 找红包
// 通过某个列表进入工作流程。开始滑动，每次等待几秒，进行包的寻找，如果存在，获取时间，人数，并且分享出去。循环。

// 红包分析。红包类型：倒计时红包，进行中红包，自动弹出红包，多个红包。

// 首页-关注-找到直播-开始滑动

const { cmd } = require("./utils/wedis");
const { loopDoUtilTime, nextVedio, randomOperate } = require("./ksUtil");


function intoList() {

}


function reward() {}

function existPackage(){

}

function getRewardTime() {}

function getPersonCount() {}

function share(shareLink, expireTimeSeconds) {
  // 使用，可过期的list结构。sorted set。自动过期。
  cmd(util.format("ZADD shareLink %d %s", expireTimeSeconds, shareLink));
  // 这个操作可以不在这里做，单例做就行。不然集群环境操作频繁
  cmd(
    util.format(
      "ZREMRANGEBYSCORE shareLink %s %d",
      "-inf",
      new Date().getTime()
    )
  );
}

function getShare(configTimeRange) {
  //找到一个30秒之内的红包

  var timeMin = new Date().getTime() + configTimeRange * 1000;

  // 从小到大排序
  var link = cmd(
    util.format("ZRANGEBYSCORE shareLink %d %s", timeMin, "%2Binf")
  ).ZRANGEBYSCORE[0];

  if (!link) {
    log("未从服务器获取到链接，开始等待，重新获取");
    sleep(2000);
    return getShare(configTimeRange);
  }
  log("从服务器获取连接 %s", link);
  // 只取出来一个。抢完之后，自动过期了。下次就取不出来了。所以，不必担心重复问题。
  return link;
}

// test = () => {
//   cmd("del shareLink"); //也不用删除，每次都会更新

//   share("111", new Date().getTime() + 1000 * 60 * 1);
//   share("3333", new Date().getTime() + 1000 * 60 * 3);
//   share("888", new Date().getTime() + 1000 * 60 * 8);

//   getShare(9 * 60); //应该只有，

//   cmd("ZRANGE shareLink 0 -1 WITHSCORES");
// };
// // test();

// 抢红包
function get() {
  //杀掉app
  //通过分享进入
  //等待开始点击
}
