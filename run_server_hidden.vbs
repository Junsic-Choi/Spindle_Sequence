Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
' Dynamically get the current directoy
strDir = FSO.GetParentFolderName(WScript.ScriptFullName)
strPath = FSO.BuildPath(strDir, "run_server.bat")

' Check if file exists to avoid 80070002
If FSO.FileExists(strPath) Then
    WshShell.Run "cmd /c " & Chr(34) & Chr(34) & strPath & Chr(34) & Chr(34), 0
Else
    MsgBox "Error: run_server.bat not found at " & strPath
End If

Set WshShell = Nothing
Set FSO = Nothing
