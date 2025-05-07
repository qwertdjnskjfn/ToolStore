const fs = require('fs');
const path = require('path');
const axios = require('axios');
const https = require('https');

// 导入手动配置
const { manualConfig } = require('./manual-config');

// 配置项
const CONFIG = {
    // 需要排除的仓库（比如一些特殊的应用商店链接）
    excludeRepos: [
        'shadowrocket',
        'quantumultx',
        'surge5',
        'oneclick',
        'v2box'
    ],
    // 仓库名称映射（将GitHub仓库名映射到我们想要的名称）
    repoNameMapping: {
        'clash-verge-rev': 'clash verge',
        'mihomo-party': 'mihomo party',
        'ClashMetaForAndroid': 'clashmeta',
        'surfboard': 'surfboard',
        'v2rayN': 'v2rayn',
        'v2rayNG': 'v2rayng',
        'sing-box': 'singbox',
        'GUI.for.SingBox': 'gui.for.singbox',
        'FlClash': 'flclash',
        'hiddify-app': 'hiddify',
        'NekoBoxForAndroid': 'nekobox',
        'V2rayU': 'v2rayu'
    },
    // iOS应用商店链接配置
    iosAppStoreLinks: {
        'shadowrocket': 'https://apps.apple.com/us/app/shadowrocket/id932747118',
        'quantumultx': 'https://apps.apple.com/us/app/quantumult-x/id1443988620',
        'surge5': 'https://apps.apple.com/us/app/surge-5/id1442620678',
        'oneclick': 'https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197',
        'v2box': 'https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690',
        'singbox': 'https://apps.apple.com/us/app/sing-box-vt/id6673731168',
        'hiddify': 'https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532'
    },
    // 平台特定的文件匹配模式
    platformPatterns: {
        windows: /\.exe$|\.msi$|\.zip$|windows|win/i,
        mac: /\.dmg$|\.pkg$|\.app$|macos|mac/i,
        linux: /\.deb$|\.rpm$|\.AppImage$|\.tar\.gz$|linux/i,
        android: /\.apk$|android/i,
        ios: /\.ipa$|ios/i
    },
    // 平台排序顺序
    platformOrder: ['windows', 'mac', 'linux', 'android', 'ios', 'github']
};

// 创建axios实例
const axiosInstance = axios.create({
    httpsAgent: new https.Agent({
        rejectUnauthorized: false // 禁用SSL证书验证
    }),
    timeout: 10000, // 设置超时时间为10秒
    headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'ToolStore-Update-Script'
    }
});

// 从card-data.js中读取仓库信息
async function getRepositories() {
    const cardDataPath = path.join(__dirname, '../public/assets/scripts/configs/card-data.js');
    const content = fs.readFileSync(cardDataPath, 'utf8');
    
    // 使用正则表达式提取GitHub仓库链接
    const repoRegex = /link:\s*"https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/releases"/g;
    const repos = [];
    let match;

    while ((match = repoRegex.exec(content)) !== null) {
        const [_, owner, repo] = match;
        const repoName = repo.toLowerCase();
        if (!CONFIG.excludeRepos.includes(repoName)) {
            // 使用映射的名称，如果没有映射则使用原始名称
            const mappedName = CONFIG.repoNameMapping[repo] || repoName;
            repos.push({
                owner,
                repo,
                name: mappedName.toLowerCase()
            });
        }
    }

    return repos;
}

// 获取仓库的最新发布版本
async function getLatestRelease(owner, repo) {
    try {
        // 获取最新的release
        const response = await axiosInstance.get(
            `https://api.github.com/repos/${owner}/${repo}/releases/latest`
        );

        if (!response.data) {
            console.error(`未找到 ${owner}/${repo} 的发布版本`);
            return null;
        }

        console.log(`成功获取 ${owner}/${repo} 的最新版本: ${response.data.tag_name}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error(`获取 ${owner}/${repo} 的最新版本失败:`, error.response.status, error.response.data.message);
        } else if (error.code === 'ECONNABORTED') {
            console.error(`获取 ${owner}/${repo} 的最新版本超时`);
        } else {
            console.error(`获取 ${owner}/${repo} 的最新版本失败:`, error.message);
        }
        return null;
    }
}

// 根据平台匹配下载链接
function matchPlatformAssets(assets) {
    const platformLinks = {};
    
    for (const asset of assets) {
        const assetName = asset.name.toLowerCase();
        for (const [platform, pattern] of Object.entries(CONFIG.platformPatterns)) {
            if (pattern.test(assetName)) {
                // 如果已经找到该平台的链接，检查版本号是否更新
                if (!platformLinks[platform] || 
                    assetName.includes('universal') || 
                    assetName.includes('amd64') || 
                    assetName.includes('x64')) {
                    platformLinks[platform] = asset.browser_download_url;
                }
                break;
            }
        }
    }
    
    return platformLinks;
}

// 按照指定顺序排序对象属性
function sortObjectByOrder(obj, order) {
    const sortedObj = {};
    // 首先添加version字段
    if (obj.hasOwnProperty('version')) {
        sortedObj.version = obj.version;
    }
    // 然后按照指定顺序添加其他字段
    order.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            sortedObj[key] = obj[key];
        }
    });
    return sortedObj;
}

// 更新download-config.js
async function updateDownloadConfig() {
    console.log('开始更新下载配置...');
    const repos = await getRepositories();
    console.log(`找到 ${repos.length} 个仓库需要更新`);
    
    const downloadLinks = {};

    // 首先添加手动配置的下载链接
    for (const [name, config] of Object.entries(manualConfig.downloadLinks)) {
        downloadLinks[name] = sortObjectByOrder(config, CONFIG.platformOrder);
        console.log(`已添加手动配置的下载链接: ${name}`);
    }

    // 然后添加iOS应用商店链接
    for (const [appName, appStoreLink] of Object.entries(CONFIG.iosAppStoreLinks)) {
        if (!downloadLinks[appName]) {  // 如果还没有手动配置
            const links = {
                version: 'N/A',
                ios: appStoreLink
            };
            downloadLinks[appName] = sortObjectByOrder(links, CONFIG.platformOrder);
            console.log(`已添加iOS应用商店链接: ${appName}`);
        }
    }

    // 最后处理GitHub仓库
    for (const repo of repos) {
        // 检查是否已手动配置
        if (manualConfig.repositories[repo.name]) {
            console.log(`跳过 ${repo.name}，使用手动配置`);
            continue;
        }

        console.log(`正在处理 ${repo.owner}/${repo.repo}...`);
        const release = await getLatestRelease(repo.owner, repo.repo);
        if (!release) continue;

        const platformLinks = matchPlatformAssets(release.assets);
        const links = {
            version: release.tag_name,
            ...platformLinks,
            github: `https://github.com/${repo.owner}/${repo.repo}`
        };
        downloadLinks[repo.name] = sortObjectByOrder(links, CONFIG.platformOrder);
        
        console.log(`已更新 ${repo.name} 的下载链接，版本: ${release.tag_name}`);
    }

    // 生成新的配置文件内容
    const configContent = `// 下载链接配置  全是小写
// 最后更新时间: ${new Date().toLocaleString()}

const downloadLinks = ${JSON.stringify(downloadLinks, null, 4)};

// 获取工具版本号
export function getToolVersion(toolName) {
    if (!toolName) return '';

    // 标准化名称：转小写并移除多余空格
    const normalizedName = toolName.toLowerCase().trim();

    // 直接检查是否存在匹配
    if (downloadLinks[normalizedName] && downloadLinks[normalizedName].version) {
        return downloadLinks[normalizedName].version;
    }

    // 如果找不到完全匹配，尝试部分匹配
    for (const key in downloadLinks) {
        // 检查工具名称是否包含在配置键中，或配置键是否包含在工具名称中
        if ((normalizedName.includes(key) || key.includes(normalizedName)) &&
            downloadLinks[key].version) {
            return downloadLinks[key].version;
        }
    }

    // 如果找不到任何匹配，返回空字符串
    return '';
}

// 导出配置
export { downloadLinks };`;

    // 写入配置文件
    const configPath = path.join(__dirname, '../public/assets/scripts/configs/download-config.js');
    fs.writeFileSync(configPath, configContent);
    console.log('下载配置已更新！');
}

// 执行更新
updateDownloadConfig().catch(error => {
    console.error('更新过程中发生错误:', error);
    process.exit(1);
}); 