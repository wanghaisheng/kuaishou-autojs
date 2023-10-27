var timeoutBreakPoint = {};

timeoutBreakPoint.storage = storages.create("TBP-ks");

timeoutBreakPoint.mark = function (uniqueName, timeoutSecend) {
  let currentTime = new Date().getTime();
  let limitTime = currentTime + timeoutSecend * 1000;
  log("子程序标记超时时间：%d", timeoutSecend);
  this.storage.put(uniqueName, limitTime);
};

timeoutBreakPoint.isTimeout = function (uniqueName) {
  let currentTime = new Date().getTime();
  let limitTime = this.storage.get(uniqueName); //todo 可以优化一下，取出来缓存一下
  if (!limitTime) {
    // log("未找到超时时间");
    return false;
  }

  return currentTime > limitTime;
};

timeoutBreakPoint.clear = function () {
  this.storage.clear();
};

module.exports = { timeoutBreakPoint };
