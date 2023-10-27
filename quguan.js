//取消关注。从内存中读取今天关注的人，全部取消。
const { keepAlive } = require("util");
keepAlive();

var delNameList = [
  "小明翡翠珠宝",
  "文赫•赫派",
  "北冰洋、970",
  "金平520",
  "无名小卒力哥",
];

pages();

function pages() {
  var pageCount = 10;
  var lastPage = [];
  while (1 && pageCount-- > 0) {
    lastPage = page(lastPage);

    scrollDown(1);
    sleep(1000);
  }
}

function page(lastPageList) {
  var namePageList = [];
  var nameListEle = id("name").find(); //fix 取了其他页的第一行。其他也没有取消行为。没关系！！！，不太好唯一标记
  nameListEle.forEach((element) => {
    namePageList.push(element.text());
  });

  //   log("本页用户==",namePageList);
  //   log("上页用户==",lastPageList)

  //取差集，去重
  uniNamePageList = getComplementary(namePageList, lastPageList);
  log("唯一用户==", uniNamePageList);

  //取交集，确定本页删除 列表
  var delList = getIntersection(delNameList, uniNamePageList);

  log("即将删除列表==" + delList);
  for (var del of delList) {
    delSub(del);
    //todo 从db删除
    delNameList = delNameList.filter((item) => item != del);
  }

  return namePageList;
}

function delSub(name) {
  if (name == "") {
    return;
  }
  log("即将取关->%d", name);

  var more = text(name)
    .findOne()
    .parent()
    .parent()
    .parent()
    .parent()
    .findOne(id("more_btn"));
  more.click();

  text("取消关注").findOne().parent().click();

  var sure = id("qlist_alert_dialog_item_text")
    .text("取消关注")
    .findOne()
    .parent();
  sure.click();
  console.log("已经取消关注%d", name);
  sleep(1000);
}

//交集
function getIntersection(a, b) {
  return a.filter(function (v) {
    return b.indexOf(v) > -1;
  });
}

//差集
function getComplementary(a, b) {
  return a.filter(function (v) {
    return b.indexOf(v) == -1;
  });
}

// test()
function test() {
  var a = [1, 2, 3, 4, 5];
  var b = [2, 4, 6, 8, 10];

  console.log(getIntersection(a, b)); //[ 2, 4 ]
  console.log(getComplementary(a, b)); //[ 1, 3, 5, 6, 8, 10 ]
}
