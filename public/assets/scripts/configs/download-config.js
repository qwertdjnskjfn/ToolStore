// 下载链接配置  全是小写
// 最后更新时间: 12/29/2025, 3:44:43 AM

const downloadLinks = {
    "v2box": {
        "version": "N/A",
        "android": "https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box",
        "ios": "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
    },
    "shadowrocket": {
        "version": "N/A",
        "ios": "https://apps.apple.com/us/app/shadowrocket/id932747118"
    },
    "quantumultx": {
        "version": "N/A",
        "ios": "https://apps.apple.com/us/app/quantumult-x/id1443988620"
    },
    "surge5": {
        "version": "N/A",
        "ios": "https://apps.apple.com/us/app/surge-5/id1442620678"
    },
    "oneclick": {
        "version": "N/A",
        "ios": "https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197"
    },
    "singbox": {
        "version": "v1.12.14",
        "windows": "https://github.com/SagerNet/sing-box/releases/download/v1.12.14/sing-box-1.12.14-windows-amd64.zip",
        "linux": "https://github.com/SagerNet/sing-box/releases/download/v1.12.14/sing-box_1.12.14_linux_amd64.deb",
        "android": "https://github.com/SagerNet/sing-box/releases/download/v1.12.14/SFA-1.12.14-universal.apk",
        "github": "https://github.com/SagerNet/sing-box"
    },
    "hiddify": {
        "version": "N/A",
        "ios": "https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532"
    },
    "clash verge": {
        "version": "v2.4.4",
        "windows": "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.4.4/Clash.Verge_2.4.4_x64_fixed_webview2-setup.exe",
        "mac": "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.4.4/Clash.Verge_2.4.4_x64.dmg",
        "linux": "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.4.4/Clash.Verge_x64.app.tar.gz",
        "github": "https://github.com/clash-verge-rev/clash-verge-rev"
    },
    "mihomo party": {
        "version": "v1.8.9",
        "windows": "https://github.com/mihomo-party-org/clash-party/releases/download/v1.8.9/mihomo-party-windows-1.8.9-x64-setup.exe.sha256",
        "mac": "https://github.com/mihomo-party-org/clash-party/releases/download/v1.8.9/mihomo-party-macos-1.8.9-x64.pkg.sha256",
        "linux": "https://github.com/mihomo-party-org/clash-party/releases/download/v1.8.9/mihomo-party-linux-1.8.9-amd64.deb.sha256",
        "github": "https://github.com/mihomo-party-org/mihomo-party"
    },
    "clashmeta": {
        "version": "v2.11.21",
        "android": "https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.21/cmfa-2.11.21-meta-universal-release.apk",
        "github": "https://github.com/MetaCubeX/ClashMetaForAndroid"
    },
    "surfboard": {
        "version": "v2.25.3",
        "android": "https://github.com/getsurfboard/surfboard/releases/download/mobile-2.25.3/mobile-universal-release.apk",
        "github": "https://github.com/getsurfboard/surfboard"
    },
    "v2rayn": {
        "version": "v7.16.9",
        "windows": "https://github.com/2dust/v2rayN/releases/download/7.16.9/v2rayN-linux-64.zip",
        "mac": "https://github.com/2dust/v2rayN/releases/download/7.16.9/v2rayN-macos-64.dmg",
        "linux": "https://github.com/2dust/v2rayN/releases/download/7.16.9/v2rayN-linux-64.deb",
        "github": "https://github.com/2dust/v2rayN"
    },
    "v2rayng": {
        "version": "v1.10.32",
        "android": "https://github.com/2dust/v2rayNG/releases/download/1.10.32/v2rayNG_1.10.32_universal.apk",
        "github": "https://github.com/2dust/v2rayNG"
    }
};

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
export { downloadLinks };