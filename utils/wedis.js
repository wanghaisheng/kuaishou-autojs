let serverAddress = "192.168.123.82:7379";
// 参考 webdis 文档： https://github.com/nicolasff/webdis
// docker pull nicolas/webdis:latest
// docker run --name webdis-autojs --rm -d -p 0.0.0.0:7379:7379 nicolas/webdis
// docker stop xxx
// 请求格式为：以'/'分割命令和参数
const cmd = function (command) {
  let commandKeys = command.split(" ");
  let suffix = "";
  commandKeys.forEach((e) => {
    if (!e || e.trim() === "") {
      // 字符串为空字符串或为 null 或 undefined
      return;
    }

    suffix += "/";
    suffix += e;
  });
  log("wedis send  %s", suffix);
  let r = http.get(serverAddress + suffix);
  let b = r.body.string();
  log("wedis rsp: %s", b);
  return JSON.parse(b);
};

const setServerAdder = function (adder) {
  serverAddress = adder;
};

//简单的，服务注册，和服务发现
const registerServer = function (ip) {
  const serverlistKey = "serverlist";
  //todo 查看本机ip https://juejin.cn/post/6972913930226106399  可能需要添加模块，改成手动输入吧！

  return cmd(util.format("sadd serverlist %s", ip));
};

const discoverServer = function () {
  return cmd("smembers serverlist");
};

// 简单的配置中心
const configurationRemote = function () {};

// test
// registerServer("192.168.123.82");
// registerServer("192.168.123.83");
// log(discoverServer().smembers[0]);
// // cmd("flushdb")

module.exports = { cmd, registerServer, discoverServer };
