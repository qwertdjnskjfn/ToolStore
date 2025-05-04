<div align="center">
  <h3>📖 简介</h3>
  <p>一个简洁的代理工具导航网站，提供各类工具、软件和机场服务的下载链接与介绍。</p>
</div>

---

## 🚀 功能特性

- 模块化架构，便于扩展和维护
- 支持工具版本号显示
- 响应式设计，适配多种设备
- 弹窗背景滚动优化
- 返回顶部按钮
- 机场、软件和工具卡片布局
- 详细的机场信息弹窗

## 🛠️ 技术栈

- 原生JavaScript（模块化）
- CSS3（响应式设计）
- HTML5

## 📂 项目结构

主要配置文件和模块：

```
assets/
 ├── css/                # 样式文件
 ├── images/             # 图片资源
 └── scripts/
     ├── configs/        # 配置文件
     │   ├── card-data.js       # 卡片数据配置
     │   ├── download-config.js # 下载链接配置
     │   ├── airport-config.js  # 机场详情配置
     │   └── recommend-config.js # 推荐配置
     └── modules/        # 功能模块
         ├── api.js             # API模拟层
         ├── card-renderer.js   # 卡片渲染模块
         ├── download-modal.js  # 下载弹窗模块
         ├── airport-modal.js   # 机场详情弹窗模块
         ├── back-to-top.js     # 返回顶部功能
         └── ...
```

## 💻 如何添加新内容

### 添加新工具

1. 在 `assets/scripts/configs/card-data.js` 中的 `toolsData` 数组添加工具信息：

```js
{
    name: "工具名称",
    image: "assets/images/tools/工具图标.png",
    link: "https://工具官网或下载链接"
}
```

2. 在 `assets/scripts/configs/download-config.js` 中添加下载链接和版本信息：

```js
'工具名称': {
    version: 'v1.0.0',
    windows: '下载链接',
    mac: '下载链接',
    linux: '下载链接',
    android: '下载链接',
    ios: '下载链接',
    github: 'GitHub链接'
}
```

### 添加新软件

在 `assets/scripts/configs/card-data.js` 中的 `softwareData` 数组添加软件信息：

```js
{
    name: "软件名称",
    image: "assets/images/software/软件图标.png",
    link: "https://软件官网"
}
```

### 添加新机场

1. 在 `assets/scripts/configs/card-data.js` 中的 `airportData` 数组添加机场信息：

```js
{
    name: "机场名称",
    image: "assets/images/airports/机场图标.png",
    link: "https://机场官网"
}
```

2. 在 `assets/scripts/configs/airport-config.js` 中添加机场详细信息：

```js
'机场名称': {
    description: '机场描述',
    packages: [
        {
            name: '套餐名称',
            price: '15.00',
            period: '月',
            traffic: '100G/月'
        }
    ],
    features: [
        // 机场特性
    ],
    link: '机场链接',
    tags: ['标签1', '标签2']
}
```

## 🔄 最近更新

1. **模块化重构**：
   - 创建card-data.js配置文件
   - 实现API模拟层
   - 卡片渲染模块化

2. **UI改进**：
   - 修复弹窗背景滚动问题
   - 优化图片圆角显示
   - 添加返回顶部按钮

3. **功能增强**：
   - 添加工具版本号显示
   - 优化机场详情弹窗展示
   - 改进卡片点击交互

## 📝 贡献指南

| 贡献仓库  
| 请提交一个 [Pulls](https://github.com/Re0XIAOPA/ToolStore/pulls)  
| 或者克隆仓库完成之后同步分支  
| 网址：[点击前往](https://toolstore.awafuns.cn/) 参考

> [!NOTE]
> 项目已完成模块化改造，新增内容请遵循现有模块化结构。

> [!IMPORTANT]
> 本项目仅供学习参考
