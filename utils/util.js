//app应用关闭
const killApp = function (name) {
  // 所以，填写包名或app名称都可以
  var packageName = getPackageName(name) || getAppName(name);
  if (!packageName) {
    log("找不到packageName" + packageName);
    return;
  }

  // 打开系统级应用设置
  app.openAppSetting(packageName);
  sleep(random(1000, 2000));
  text(app.getAppName(packageName)).waitFor();

  // 执行盲点流程 （多点几次不过分。都是非阻塞的。）
  var times = 3; // 多点几次，应对页面上存在一些其他tips文字，干扰流程。
  do {
    stop();
    times--;
  } while (times);

  sleep(random(2000, 2300));
  back();
};

// 盲点
function stop() {
  var is_sure = textMatches(
    /(.{0,3}强.{0,3}|.{0,3}停.{0,3}|.{0,3}结.{0,3}|.{0,3}行.{0,3})/
  ).findOnce();
  if (is_sure) {
    is_sure.click();
    sleep(random(500, 600));
  }

  var b = textMatches(/(.*确.*|.*定.*)/).findOnce();
  if (b) {
    b.click();
    sleep(random(500, 600));
  }
}

// 工作流- 连续点击
const mutilClick = function (works) {
  for (var work of works) {
    if (work.key) {
      var e = text(work.key).findOne(work.timeout);
      if (e) {
        log("点击->" + e.text());
        e.click();
      } else {
        log("未找到" + work.key);
        printEles();
        break;
      }
    } else if (work.fuzzyKey) {
      var e = textContains(work.fuzzyKey).findOne(work.timeout);
      if (e) {
        log("点击->" + e.text());
        e.click();
      } else {
        log("未找到" + work.fuzzyKey);
        printEles();
        break;
      }
    } else {
      log("配置错误，key 不存在");
    }

    sleep(random(1500, 2000));
  }
};

//初始化环境  杀掉目标应用，然后重新开启
const cleanInit = function (appName) {
  stopOther();
  console.show(); //脚本结束，隐藏控制台
  keepAlive(); // 保持常亮，防止调试期间断开连接
};

const reloadApp = function (appName) {
  killApp(appName);
  auto.waitFor();
  app.launchApp(appName);
  console.log("打开-" + appName);
  keepAlive(); // 保持常亮，防止调试期间断开连接
};

const stopOther = function () {
  engines.all().map((ScriptEngine) => {
    if (engines.myEngine().toString() !== ScriptEngine.toString()) {
      ScriptEngine.forceStop();
    }
  });
};

// 比console.show(true) 好用
events.on("exit", function () {
  console.hide();
});

const printEles = function () {
  function queryList(json) {
    for (var i = 0; i < json.length; i++) {
      var sonList = json[i];
      if (sonList.childCount() == 0) {
        console.log(json[i]);
      } else {
        queryList(sonList);
      }
    }
  }

  // 第二部查找所有控件
  var root = find();

  // 第三步 调用递归方法
  queryList(root);
};

const collectionContains = function (eles, type, value) {
  for (var ele in eles) {
    if (type == "id") {
      if (ele.id() == value) {
        return ele;
      }
    }

    if (type == "text") {
      if (ele.text() == value) {
        return ele;
      }
    }
  }
  return null;
};

const netDelay = function () {
  sleep(1000);
};

const keepAlive = function () {
  device.keepScreenOn(3600 * 1000);
  device.setBrightness(2);
};

const l = function (str) {
  log("@@@@@@ -> " + str);
};

const aWhileExit = function () {
  console.warn("等待 8s 自动退出");
  sleep(8000);
  exit();
};

var pinLog = {};
pinLog.w;
pinLog.init = function (textColor) {
  if (pinLog.w) {
    return;
  }

  if (!floaty.checkPermission()) {
    // 没有悬浮窗权限，提示用户并跳转请求
    toast(
      "本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。"
    );
    floaty.requestPermission();
    exit();
  } else {
    // toastLog("已有悬浮窗权限");
  }

  //显示一个悬浮窗。显示文本  。修改文本内容，id="text"

  let w = floaty.rawWindow(
    <text
      textSize="16sp"
      w="wrap_content"
      h="wrap_content"
      textColor="#C0FF3E"
      padding="6"
      id="text"
    ></text>
  );
  if (textColor) {
    w.text.setTextColor(textColor);
  }
  ui.run(function () {
    //初始化悬浮窗，直接扔到屏幕外面
    w.setPosition(-66666, -66666);
  });

  pinLog.w = w;
};

pinLog.hidden = function () {
  log("悬浮窗隐藏");
  var w = this.w;
  ui.run(function () {
    //初始化悬浮窗，直接扔到屏幕外面
    w.setPosition(-66666, -66666);
  });
};

pinLog.rePosition = function (w) {
  var ww = w.getWidth();
  var wh = w.getHeight();
  var dw = device.width;
  var dh = device.height;
  // 悬浮窗置于底部中央
  var x = (dw - ww) / 2;
  var y = ((dh - wh) * 3) / 4;
  // console.log("固定日志位置：" + x + "---" + y);
  w.setPosition(x, y);
};

pinLog.log = function (msg, timeout) {
  this.init();
  this.w.text.setTextColor(colors.parseColor("#FFFFFF"));
  this._msg(msg);
  // if (!!timeout) {
  //   let timeoutID = setTimeout(function () {
  //     this.hidden();
  //   }, timeout * 1000);
  // }
};
pinLog.warn = function (msg, timeout) {
  this.init();
  this.w.text.setTextColor(colors.parseColor("#F51AAA"));
  this._msg(msg);
  //fix 超时这个想法，貌似不行。以后再说吧
  // if (!!timeout) {
  //   log("fdfddfd"+timeout);
  //   setTimeout(() => {
  //     log("fdsfsdfdffsdfsfdfdfd")
  //     this.hidden();
  //   }, timeout * 1000);
  // }
};

//不能暴露此方法 ,私有属性处理比较麻烦，这里简单处理。https://juejin.cn/post/7080131411503972366
pinLog._msg = function (msg) {
  var w = this.w;

  ui.run(function () {
    //隐藏
    w.setPosition(-6666, -6666);

    //写入文字
    w.text.setText(msg);
  });

  //写入文字之后，再次重绘。不然文字导致的布局不生效
  ui.run(function () {
    //再次计算位置
    pinLog.rePosition(w);
    // w.content.attr("alpha", 1); 这个方法好像不管用
  });
};

const getBrother = function (ele, textStr, id) {
  if (text != "" && text != null) {
    return ele.parent().children().findOne(text(textStr));
  } else if (id != "" && id != null) {
    return ele.parent().children().findOne(text(id));
  }
  return null;
};

const getOtherBrother = function (ele, textStrArr) {
  log("设备检查：d% d%", device.brand, device.model);

  var eles;
  if (device.brand == "OPPO" && device.model == "PEXM00") {
    eles = ele.parent().parent().children(); //
  } else {
    eles = ele.parent().children();
  }

  // log(eles);

  for (var ele of eles) {
    // log("节点"+ele)
    var include = false;
    for (var textStr of textStrArr) {
      // log(textStr + " 比对 " + ele.text());
      // 模拟器，和我真机，不一样。一个只需要判断文本，另外一个还需要判断desc属性。
      if (
        textStr.trim() == ele.text().trim() ||
        textStr.trim() == ele.contentDescription
      ) {
        include = true;
        break;
      }
    }

    if (!include) {
      log("返回兄弟节点d%", ele);
      return ele;
    }
  }

  log("返回兄弟节点d%", "null");
  return null;
};

function backFromWeChat(appName) {
  //等待微信出现
  waitForPackage("com.tencent.mm");
  console.log("微信出现，等待几秒");
  sleep(2000);
  // 切换回来
  app.launchApp(appName);
  console.log("切回应用 d%", appName);
  sleep(800);
}

const clickRandom = function (ele) {
  var b = ele.bounds();
  var x = random(1, b.right - b.left) + b.right;
  var y = random(1, b.buttom - b.top) + b.buttom;
  click(x, y);
};

function clickUnclickble(ele) {
  var b = ele.bounds();
  log(b);
  var x = random(1, b.right - b.left) + b.left;
  var y = random(1, b.bottom - b.top) + b.top;
  log("模拟点击 %d %d", x, y);
  click(x, y);
}

function clickUnclickbleCenter(ele, x, y) {
  var b = ele.bounds();
  log(b);

  if (!x) {
    x = 0;
    y = 0;
  }

  if (!y) {
    y = x;
  }

  var x = parseInt((b.right - b.left) / 2) + b.left + random(-x, x);
  var y = parseInt((b.bottom - b.top) / 2) + b.top + random(-y, y);
  log("模拟点击 %d %d", x, y);
  click(x, y);
}

function pressUnclickbleCenter(ele, x, y) {
  var b = ele.bounds();
  log(b);

  if (!x) {
    x = 0;
    y = 0;
  }

  if (!y) {
    y = x;
  }

  var x = parseInt((b.right - b.left) / 2) + b.left + random(-x, x);
  var y = parseInt((b.bottom - b.top) / 2) + b.top + random(-y, y);
  log("模拟点击 %d %d", x, y);
  press(x, y);
}

const nowDate = function () {
  // 获取当前日期
  var date = new Date();

  // 获取当前月份
  var nowMonth = date.getMonth() + 1;

  // 获取当前是几号
  var strDate = date.getDate();

  // 添加分隔符“-”
  var seperator = "-";

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
  return nowDate;
};

function clickImg(smallImgPath, threshold) {
  var smallImg = images.read(smallImgPath); //读取本地的领取图片
  var img = captureScreen();
  var result = findImage(img, smallImg, {
    threshold: threshold,
  }); //找到图会返回坐标 找不到返回null
  if (!result) {
    log("没找到");
    return false;
  } else {
    click(result.x, result.y);
    log("找到了");
    return true;
  }
}
// clickImg("1.jpg", 0.9);

function findOneInScreen(eles) {
  log("设备 w %d,h %d", device.width, device.height);
  for (var ele of eles) {
    var r = ele.bounds();
    log(r);
    if (
      device.width > r.right &&
      r.right >= 0 &&
      device.width > r.left &&
      r.left >= 0 &&
      device.height > r.top &&
      r.top >= 0 &&
      device.height > r.bottom &&
      r.bottom >= 0
    ) {
      return ele;
    }
  }
  return null;
}

function findInScreen(eles) {
  log("设备 w %d,h %d", device.width, device.height);
  var elesInScreen = [];
  for (var ele of eles) {
    var r = ele.bounds();
    log(r);
    if (
      device.width > r.right &&
      r.right >= 0 &&
      device.width > r.left &&
      r.left >= 0 &&
      device.height > r.top &&
      r.top >= 0 &&
      device.height > r.bottom &&
      r.bottom >= 0
    ) {
      elesInScreen.push(ele);
    }
  }
  return elesInScreen;
}

// 模块化 https://www.freecodecamp.org/chinese/news/module-exports-how-to-export-in-node-js-and-javascript/
module.exports = {
  clickImg,
  nowDate,
  printEles,
  cleanInit,
  killApp,
  mutilClick,
  netDelay,
  collectionContains,
  reloadApp,
  l,
  aWhileExit,
  pinLog,
  getOtherBrother,
  getBrother,
  clickUnclickble,
  clickUnclickbleCenter,
  backFromWeChat,
  clickRandom,
  keepAlive,
  findOneInScreen,
  findInScreen,
  pressUnclickbleCenter,
  stopOther,
};
