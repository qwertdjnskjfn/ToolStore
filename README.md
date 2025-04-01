
<div align="center">
  <h3>📖 简介</h3>
  <p>一个简洁的代理工具导航网站，提供各类工具、软件和机场服务的下载链接与介绍。</p>
</div>

---
| 贡献仓库  
| 请提交一个 [Pulls](https://github.com/Re0XIAOPA/ToolStore/pulls)  
| 或者克隆仓库完成之后同步分支  
| 网址：[点击前往](https://toolstore.awafuns.cn/) 参考

配置文件在 assets/scripts/config

- airport-config 机场配置
- download-config 下载配置
- recommend-config 推荐配置
- 邮箱配置不可用

download-config 配置文件

```js
'Tools': {
    // 下载地址
    windows: '',
    mac: '',
    linux: '',
    android: '',
    ios: '',
    github: ''
  },
```

如果你要添加 只需在index.html 中添加然后在配置文件中配置即可

工具

```html
<!-- XXXX -->
<tr>
    <td>
        <img src="assets/images/tools/XXXX.png" alt="XXXX" style="display:none">
        <span class="tool-name">XXXX</span>
    </td>
    <td>
      <a href="">下载</a>
    </td>
</tr>
```

推荐

```html
 <!-- XXX -->
  <tr>
      <td>
          <img src="assets/images/software/XXX.png" alt="XXX" style="display:none">
          <span class="tool-name">XXX</span>
      </td>
      <td><a href="https://www.pixiv.net/">官网链接</a></td>
  </tr>
```

机场

```html
 <!-- XX机场 -->
<tr>
    <td>
        <img src="assets/images/airports/XX.jpg" alt="XX机场" style="display:none">
        <span class="tool-name">XX机场</span>
    </td>
    <td><a href="">官网链接</a></td>
</tr>
```

| 仅供学习参考
