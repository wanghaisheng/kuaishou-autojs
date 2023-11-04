' 多机器调试的时候，指定某个机器。
strCommand = "cmd /c scrcpy.exe --select-usb"

For Each Arg In WScript.Arguments
    strCommand = strCommand & " """ & replace(Arg, """", """""""""") & """"
Next

CreateObject("Wscript.Shell").Run strCommand, 0, false
