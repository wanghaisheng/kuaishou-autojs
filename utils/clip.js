var clipStorage = storages.create("clip");

 var getClipX=function() {
  var th1 = threads.start(function () {
    var win = floaty.window(
      <vertical>
        <input id="输入" w="*" h="50" />
      </vertical>
    );
    auto.setWindowFilter(function (window) {
      return true;
    });
    ui.run(() => {
      win.requestFocus();
      win.输入.requestFocus();
    });
    var th = threads.start(function () {
      et = className("EditText").findOne();
      et.paste();
      log("获取剪切板内容为："+win.输入.text())
      clipStorage.put("1", win.输入.text());
      ui.run(() => {
        win.disableFocus();
      });
    });
    th.join();
  });

  //等待获取内容
  th1.join();
  return clipStorage.get("1");
}

var setClipX=function(text){
    setClip(text)
}

// //测试    
setClip("xxxxxxx43x");  // 设置貌似是比较稳定的。
log(getClipX());  //设置之后的第一次，稳定获取.。之后再操作就不是很稳定。


module.exports={getClipX,setClipX}