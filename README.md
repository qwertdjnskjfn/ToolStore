
<div align="center">
   <!-- <a href="">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#7c8aff" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" /><path d="M2 17L12 22L22 17" stroke="#7c8aff" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" /><path d="M2 12L12 17L22 12" stroke="#7c8aff" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" /></svg>
    </a>
  <h1>ToolStore</h1> -->
  <h3>📖 简介</h3>
  <p>一个简洁的代理工具导航网站，提供各类工具、软件和机场服务的下载链接与介绍。</p>
</div>

<!-- ---

### 🚀 工具客户端

| 名称         | 说明                               | 平台                | 项目地址                                                     |
| ------------ | ---------------------------------- | ------------------- | ------------------------------------------------------------ |
| Clash Verge  | 跨平台的 Clash GUI 客户端          | Windows/macOS/Linux | [GitHub](https://github.com/clash-verge-rev/clash-verge-rev) |
| Mihomo Party | 基于 Clash 内核的多平台代理工具    | Windows/macOS/Linux | [GitHub](https://github.com/mihomo-party-org/mihomo-party)   |
| ClashMeta    | Android 平台的 Clash 客户端        | Android             | [GitHub](https://github.com/MetaCubeX/ClashMetaForAndroid)   |
| Surfboard    | Android 平台的代理工具             | Android             | [GitHub](https://github.com/getsurfboard/surfboard)          |
| V2rayN       | Windows 平台的 V2Ray 客户端        | Windows             | [GitHub](https://github.com/2dust/v2rayN)                    |
| SingBox      | 通用代理平台                       | 全平台              | [GitHub](https://github.com/SagerNet/sing-box)               |
| FlClash      | 基于 Flutter 的跨平台 Clash 客户端 | 全平台              | [GitHub](https://github.com/chen08209/FlClash)               |
| Hiddify      | 多平台代理工具                     | 全平台              | [GitHub](https://github.com/hiddify/hiddify-app)             |
| NekoBox      | Android 平台的代理工具             | Android             | [GitHub](https://github.com/MatsuriDayo/NekoBoxForAndroid)   |
| V2rayU       | macOS 平台的 V2Ray 客户端          | macOS               | [GitHub](https://github.com/yanue/V2rayU)                    |

**🍎 iOS工具:**

| 名称         | 说明         | 商店链接                                                                        |
| ------------ | ------------ | ------------------------------------------------------------------------------- |
| Shadowrocket | iOS 代理工具 | [App Store](https://apps.apple.com/us/app/shadowrocket/id932747118)             |
| QuantumultX  | iOS 代理工具 | [App Store](https://apps.apple.com/us/app/quantumult-x/id1443988620)            |
| Surge5       | iOS 代理工具 | [App Store](https://apps.apple.com/us/app/surge-5/id1442620678)                 |
| OneClick     | iOS 代理工具 | [App Store](https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197) |

### 💻 软件推荐

精选优质网站&&软件推荐

### 🌐 机场推荐

精选优质稳定的机场服务推荐 -->

---
| 贡献仓库  
| 请提交一个 [Pulls](https://github.com/Re0XIAOPA/ToolStore/pulls)

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
