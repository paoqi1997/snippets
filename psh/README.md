# [Learn PowerShell](https://github.com/PowerShell/PowerShell/tree/master/docs/learning-powershell)

So that is a powerful shell?

## [基本命令](https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.core/get-help?view=powershell-7.2)

相关命令如下所示：

```ps1
# 获取帮助
PS C:\Users\paoqi> Get-Help
# 获取当前会话的执行策略
PS C:\Users\paoqi> Get-ExecutionPolicy

# 查看版本
PS C:\Users\paoqi> $PSEdition
# 查看版本信息
PS C:\Users\paoqi> $PSVersionTable

# 输入多行命令
PS C:\Users\paoqi> py -3 -c `
>> 'import math; print(math.pi)'

# 发起 GET 请求
PS C:\Users\paoqi> Invoke-RestMethod -Method GET -Uri "ipinfo.io" | ConvertTo-Json -Depth 64

# 查看已安装的字体
PS C:\Users\paoqi> Add-Type -AssemblyName System.Drawing
PS C:\Users\paoqi> $installedFonts = New-Object 'System.Drawing.Text.InstalledFontCollection'
PS C:\Users\paoqi> $installedFonts.Families
```

## [环境变量](https://www.pstips.net/powershell-environment-variables.html)

相关命令如下所示：

```ps1
# 列出所有环境变量
PS C:\Users\paoqi> ls env:
# 列出 Path
PS C:\Users\paoqi> ls env:Path
PS C:\Users\paoqi> ls env: | findstr Path
# 查看 Path
PS C:\Users\paoqi> $env:Path
# 创建 MyEnv
PS C:\Users\paoqi> $env:MyEnv="abc"
# 追加新值到 MyEnv
PS C:\Users\paoqi> $env:MyEnv+=";xyz"
```

## 文件

相关命令如下所示：

```ps1
# 查看所在目录的文件包含 paoqi 的行
PS C:\Users\paoqi> ls | Select-String paoqi

# 查看给定目录下符合过滤条件的文件和文件夹
PS C:\Users\paoqi> Get-ChildItem -Path C:\Users\paoqi\AppData\Local\Temp -Filter gopls-diff-stats* -File
PS C:\Users\paoqi> Get-ChildItem -Path C:\Users\paoqi\AppData\Local\Temp -Filter go-build* -Directory

# 删除给定目录下符合过滤条件的文件和文件夹
PS C:\Users\paoqi> Get-ChildItem -Path C:\Users\paoqi\AppData\Local\Temp -Filter gopls-diff-stats* -File | Remove-Item -Force
PS C:\Users\paoqi> Get-ChildItem -Path C:\Users\paoqi\AppData\Local\Temp -Filter go-build* -Directory | Remove-Item -Recurse -Force
```
