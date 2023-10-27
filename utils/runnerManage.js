const { timeoutBreakPoint } = require("./timeoutBreakPoint.js");

var statistics=storages.create("rm_statistics")

events.on("exit", function () {
  log("exit 清空异常统计");
  statistics.clear()
});

setInterval(function () {}, 1000); //这个代码的作用？保持脚本运行 https://www.kancloud.cn/conquerrorfy/daowuya399/2126081

const runLoop = function (filePathList, limitTimeSeconds, useBreakPoint, backFunc) {
    let limitTime = limitTimeSeconds * 1000;

  // 在此处给脚本排队即可
  // let filePathList = ["kuaishou_one.js"];

  filePathList = filePathList.map(function (filePath) {
    return files.path(filePath);
  });

  while (1) {
    if (filePathList.length > 0) {
      //清除所有，子程序，超时关闭参数。

      if (useBreakPoint) {
        timeoutBreakPoint.clear();
      }

      let e = engines.execScriptFile(filePathList[0]);
      while (!e.getEngine()); //等待脚本运行
      let currentScriptEngine = e.getEngine();
      let lastTime = new Date().getTime();
      log("当前时间", lastTime);
      while (1) {
        let currentTime = new Date().getTime();

        let stop = false;

        if (useBreakPoint && timeoutBreakPoint.isTimeout("kkk")) {
          log("子程序超时");
          stop = true;
        }

        if (currentTime - lastTime > limitTime) {
          log("脚本超时");
          stop = true;
        }

        if (stop) {
          log("运行超时, 开始 执行销毁命令");
          currentScriptEngine.forceStop();

          //进行异常统计
          statistics.put("countExcetionBack", statistics.get("countExcetionBack", 0) + 1);

          log("运行超时, 结束 执行销毁命令");

          log("开始回退...");
          log("回退结果 %s", backFunc());

          break;
        }

        if (currentScriptEngine.isDestroyed()) {
          break;
        } else {
          sleep(100);
        }
      }
    } else {
      engines.myEngine().forceStop();
    }
    //   filePathList.shift(); //注释掉，就会重复执行一个脚本
  }
};

module.exports = { runLoop };
