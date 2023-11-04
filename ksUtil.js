const loopDoUtilTime = (func, seconds, randomSec) => {
  var untilTime = seconds * 1000 + new Date().getTime();
  var randomWait = randomSec * 1000;
  while (new Date().getTime() <= untilTime) {
    func();
    sleep(random(100, randomWait));
  }
};

const nextVedio = () => {
  scrollForward();
  sleep(500, 1000); //时间可能要长一点
};

const randomOperate = (operateArr) => {
  return operateArr[random(0, operateArr.length - 1)];
};

module.exports = {
  loopDoUtilTime,
  nextVedio,
  randomOperate,
};
