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

var db = storages.create("kuaishou_gz_list_" + nowDate);
var ksDb = storages.create("kuaishou_gz" + nowDate);

// storageUserName();

const R = { SUC: 1, FAIL: 2, SLOW: 3 };

// log(" 结果 %d",resultDiverter())
function resultDiverter() {
  log("进入结果匹配");
  var ele = idMatches(
    /.*status_text_view|.*live_activity_red_packet_unlucky_title_text|.*live_activity_red_packet_grab_button_tip_text_view/
  ).findOne();
  log(ele);
  var id = ele.id();
  if (id.indexOf("live_activity_red_packet_grab_button_tip_text_view") > -1) {
    //和关注主播抢红包，重复了。
    return R.SUC;
  } else if (id.indexOf("live_activity_red_packet_unlucky_title_text") > -1) {
    return R.SLOW;
  } else if (id.indexOf("status_text_view") > -1) {
    return R.FAIL;
  }
  log("出现未处理结果" + ele);
}

// log(" 步骤 %s", stepDiverter());
//一天只能关注120人
function stepDiverter() {
  //通过id来匹配所有的情况. 有些可能不在屏幕里面。
  //这几个id不能同时出现。不然就会有问题
  var eles;
  //阻塞匹配

  eles = idMatches(
    /(.*live_activity_red_packet_grab_button_tip_text_view.*|.*live_activity_red_packet_grab_button_view.*|.*live_activity_red_packet_grab_button_snatch_view.*|.*live_activity_red_packet_unlucky_title_text.*)/
  ).untilFind(); //可能找到多个吧？？？id("live_red_pack_count_down_second_text_view")
  // id("live_activity_red_packet_grab_button_view")id("live_activity_red_packet_grab_button_tip_text_view")
  log("正则匹配到==", eles);

  //如果匹配到多个，有一个优先级吧。
  var ele;
  log(eles.size());
  if (eles.size() > 1) {
    //找到可以点击的.这个不一定。因为有的只是不可点击而已..不行，因为确实不能点击，有一些组件。

    //找到在屏幕里面的
    var eleArrInScreen = findInScreen(eles);

    log("在屏幕里面的", eleArrInScreen);
    var orders = [
      {
        id: "live_activity_red_packet_grab_button_tip_text_view",
        order: 1,
      },
      {
        id: "live_activity_red_packet_grab_button_view",
        order: 2,
      },
      {
        id: "live_activity_red_packet_grab_button_snatch_view",
        order: 3,
      },
      {
        id: "live_activity_red_packet_unlucky_title_text",
        order: 4,
      },
    ];

    var miniOrder = 10000;
    var firstEle;
    log("##############");
    for (var el of eleArrInScreen) {
      log("&&&&&&&", el);
      for (var order of orders) {
        if (el.id().indexOf(order.id) > -1) {
          log("找到id 的order", order.order);
          if (order.order < miniOrder) {
            miniOrder = order.order;
            firstEle = el;
          }
          break;
        }
      }
    }
    log("选择", ele);

    log("================");
    ele = firstEle;
  } else {
    //就一个，直接赋值
    log("就一个");
    for (var e of eles) {
      ele = e;
    }
  }

  // var ele=findOneInScreen(eles)
  log("id匹配最后选择 ==", ele);

  var id = ele.id();
  log(id);

  //下面的可能同时出现吗？
  if (id.indexOf("live_activity_red_packet_grab_button_tip_text_view") > -1) {
    //关注主播抢红包
    return 1;
  } else if (id.indexOf("live_activity_red_packet_grab_button_view") > -1) {
    //读秒
    return 2;
  } else if (
    id.indexOf("live_activity_red_packet_grab_button_snatch_view") > -1
  ) {
    //开
    return 3;
  } else if (id.indexOf("status_area_container") > -1) {
    //很遗憾，未中奖
    return 4;
  } else if (
    id.indexOf("live_activity_red_packet_grab_button_tip_text_view") > -1
  ) {
  } else if (id.indexOf("live_activity_red_packet_unlucky_title_text") > -1) {
    //手慢了，红包派完了id("live_red_packet_container_close_view")
    return 5;
  } else if (id.indexOf("") > -1) {
  } else if (id.indexOf("") > -1) {
  }
  return -1;
  //自动弹出提醒。领取使用，text("快来领取主播红包吧")
}

// qXJ();
function qXJ() {
  text("刷新").clickable().click();
  sleep(1500);

  textMatches("(抢现金|立即抢)").waitFor();

  var buttons = textMatches("(抢现金|立即抢)").find();

  var miniTime = 100;
  var fastButton;
  for (var button of buttons) {
    var time = button
      .parent()
      .children()
      .findOne(textMatches(/(开|\d+)/));

    console.log("类型-%s 时间-%d", button.text(), time.text());

    if (time.text() == "开") {
      fastButton = button;
      break;
    }

    var timeInt = parseInt(time.text());
    if (timeInt < miniTime) {
      fastButton = button;
      miniTime = timeInt;
    }
  }

  //插入超时时间。
  var excTime = miniTime + 10; //如果在这个时间内。脚本未执行完成。直接就杀掉。因为执行出错了。
  timeoutBreakPoint.mark("kkk", excTime);

  console.log("点击 类型-%s 时间-%d", fastButton.text(), miniTime);
  // log(fastButton);
  fastButton.parent().click();
}

var guanzhuList = [];
// guanZhu()
var guanZhu = function () {
  log("点击- 关注主播抢红包");
  var guanZhuZhuBoQiangHongBao = text("关注主播抢红包").findOne();
  // log(guanZhuZhuBoQiangHongBao);
  guanZhuZhuBoQiangHongBao.click();
  // findAndStorageUsername();
  //todo 关注之后获得用户名字
  ksDb.put("guanZhuCount", ksDb.get("guanZhuCount", 0) + 1);
};

var findAndStorageUsername = function () {
  id("live_anchor_avatar_icon").findOne().click();
  //获取用户名字
  sleep(1000);
  const userName = id("live_profile_user_name").findOne().text();

  //放到db
  console.log("存储用户名" + userName);
  db.put(userName, "");
  back();
};

// dumiao()
var dumiao = function () {
  var miao = id("live_red_pack_count_down_second_text_view").findOne();

  // //有时候，直接就会跳过读秒，直接开奖
  // if (!miao) {
  //   log("未找到读秒，跳过");

  //   return;
  // }

  //阻塞等待。怀疑多一些没显示的。这个貌似不稳定。因为容易错过。
  console.info("开始等待，1s倒计时");
  var lastOneSec = id("live_red_pack_count_down_second_text_view")
    .text("1")
    .findOne();
  console.info("开始等待，1s倒计时 结束");

  sleep(1300);
};

var kai = function () {
  log("准备开");
  // 可能存在多个红包组件。找一个的话，会找到屏幕外面的组件。
  var kais = id("live_activity_red_packet_grab_button_snatch_view").untilFind();
  log(kais);

  //有时候，直接就会跳过读秒，直接开奖
  if (!kais) {
    log("未找到开，跳过");
    return;
  }

  var kai = findOneInScreen(kais);

  log(kai);

  sleep(500, 1000);
  clickUnclickbleCenter(kai, 4);
  log("点击开= %s", kai.bounds());
};
// kai();

var failSlow = function () {
  var result = text("手慢了，红包派完了").findOne();
  log(result.text());

  // var close = id("live_red_packet_container_close_view").findOne();
  // //todo这个位置可能出现，购物车的弹框。
  // clickUnclickble(close);

  back();
  sleep(2000);
  back();
};

// failSlow()

// yihan()
var failUnluck = function () {
  log("很遗憾，未中奖");
  //todo 这个地方，感觉不稳定。
  back();
  sleep(1000);
  back();
  sleep(1000);

  //close 特殊标记
};

// suc()
var suc = function () {
  var jixuqiang = id(
    "live_activity_red_packet_grab_button_tip_text_view"
  ).findOne();
  clickUnclickble(jixuqiang);
};

// backFromliveShow()
function backFromliveShow() {
  var ele = id("live_activity_widget_content_container").findOne();
  log(ele);
  clickUnclickbleCenter(ele, 10, 10);
  sleep(1000);
}

// findClickableParent(id("live_show_layout").findOne());
function findClickableParent(ele) {
  var depth = 10;
  var pointEle = ele;
  while (depth-- > 0) {
    pointEle = pointEle.parent();
    if (pointEle.clickable()) {
      log(pointEle);
      log(depth);
      break;
    }
  }
}

// back()// 貌似需要改成屏幕边缘滑动

//没有找到红包，back（）???

main();
function main() {
  console.log("进入流程");
  var count = 0;
  var countSuc = 0;

  // pinLog.log("抢包次数 " + count++ + " 命中次数 " + countSuc);
  qXJ();
  sleep(1000);
  //分流器
  var step = stepDiverter();

  log(step);
  var stepsList = [guanZhu, dumiao, kai]; //里面是function

  for (var i = 1; i <= stepsList.length; i++) {
    if (i < step) {
      continue;
    }

    var stepFunc = stepsList[i - 1];
    log("（首次入口%d-）执行 第[%d)步", step, i - 1);
    stepFunc();
  }

  var res = resultDiverter();
  log("结果为：%d", res);
  switch (res) {
    case R.SUC:
      countSuc++;
      suc();
      break;
    case R.FAIL:
      failUnluck();
      break;
    case R.SLOW:
      failSlow();
      break;
  }
}
