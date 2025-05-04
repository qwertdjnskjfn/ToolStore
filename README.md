<div align="center">
  <h3>📖 简介</h3>
  <p>一个简洁的代理工具导航网站，提供各类工具、软件和机场服务的下载链接与介绍。</p>
</div>

---

## 📂 项目结构

主要配置文件和模块：

```
assets/
 ├── css/                # 样式文件
 │   ├── style.css             # 主样式
 │   ├── recommend-badge.css   # 推荐徽章样式
 │   └── ...
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
         ├── recommend.js       # 推荐系统模块
         ├── feedback-modal.js  # 反馈表单模块
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

2. 在 `assets/scripts/configs/airport-config.js` 中添加✈️详细信息：

```js
'✈️名称': {
    description: '✈️描述',
    packages: [
        {
            name: '套餐名称',
            price: '15.00',
            period: '月',
            traffic: '100G/月'
        }
    ],
    features: [
        // ✈️特性
    ],
    link: '✈️链接',
    tags: ['标签1', '标签2']
}
```

### 配置推荐卡片


在 `assets/scripts/configs/recommend-config.js` 中添加或修改推荐配置（推荐的卡片将会显示特殊徽章并排序在前面）：


```js
export const recommendConfig = {
    // 工具类推荐
    tools: [
        '工具1',
        '工具2'
        // 更多推荐工具...
    ],
    
    // 软件类推荐
    software: [
        '软件1',
        '软件12'
        // 更多推荐软件...
    ],
    
    // ✈️类推荐
    proxy: [
        '✈️1',
        '✈️2'
        // 更多推荐✈️...
    ]
};
```

## 📝 贡献指南

| 贡献仓库  
| 请提交一个 [Pulls](https://github.com/Re0XIAOPA/ToolStore/pulls)  
| 或者克隆仓库完成之后同步分支  
| 网址：[点击前往](https://toolstore.awafuns.cn/) 参考

> [!NOTE]
> 项目已完成模块化改造，新增内容请遵循现有模块化结构。

> [!IMPORTANT]
> 本项目仅供学习参考
