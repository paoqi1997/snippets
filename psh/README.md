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
```

## [环境变量](https://www.pstips.net/powershell-environment-variables.html)

相关命令如下所示：

```ps1
# 列出所有环境变量
PS C:\Users\paoqi> ls env:
# 查看 Path
PS C:\Users\paoqi> $env:Path
# 创建 MyEnv
PS C:\Users\paoqi> $env:MyEnv="abc"
# 追加新值到 MyEnv
PS C:\Users\paoqi> $env:MyEnv+=";xyz"
```
