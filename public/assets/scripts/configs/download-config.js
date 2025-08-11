// 下载链接配置  全是小写
// 最后更新时间: 8/11/2025, 3:39:46 AM

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
        "version": "v1.12.1",
        "windows": "https://github.com/SagerNet/sing-box/releases/download/v1.12.1/sing-box-1.12.1-windows-amd64.zip",
        "mac": "https://github.com/SagerNet/sing-box/releases/download/v1.12.1/SFM-1.12.1-universal.dmg",
        "linux": "https://github.com/SagerNet/sing-box/releases/download/v1.12.1/sing-box_1.12.1_linux_amd64.deb",
        "android": "https://github.com/SagerNet/sing-box/releases/download/v1.12.1/SFA-1.12.1-universal.apk",
        "github": "https://github.com/SagerNet/sing-box"
    },
    "hiddify": {
        "version": "N/A",
        "ios": "https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532"
    },
    "clash verge": {
        "version": "v2.3.2",
        "windows": "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.3.2/Clash.Verge_2.3.2_x64_fixed_webview2-setup.exe",
        "mac": "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.3.2/Clash.Verge_2.3.2_x64.dmg",
        "linux": "https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.3.2/Clash.Verge_x64.app.tar.gz",
        "github": "https://github.com/clash-verge-rev/clash-verge-rev"
    },
    "mihomo party": {
        "version": "v1.8.3",
        "windows": "https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.8.3/mihomo-party-windows-1.8.3-x64-setup.exe.sha256",
        "mac": "https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.8.3/mihomo-party-macos-1.8.3-x64.pkg.sha256",
        "linux": "https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.8.3/mihomo-party-linux-1.8.3-amd64.deb.sha256",
        "github": "https://github.com/mihomo-party-org/mihomo-party"
    },
    "clashmeta": {
        "version": "v2.11.15",
        "android": "https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.15/cmfa-2.11.15-meta-universal-release.apk",
        "github": "https://github.com/MetaCubeX/ClashMetaForAndroid"
    },
    "surfboard": {
        "version": "v2.25.3",
        "android": "https://github.com/getsurfboard/surfboard/releases/download/mobile-2.25.3/mobile-universal-release.apk",
        "github": "https://github.com/getsurfboard/surfboard"
    },
    "v2rayn": {
        "version": "v7.13.7",
        "windows": "https://github.com/2dust/v2rayN/releases/download/7.13.7/v2rayN-linux-64.zip",
        "mac": "https://github.com/2dust/v2rayN/releases/download/7.13.7/v2rayN-macos-64.dmg",
        "linux": "https://github.com/2dust/v2rayN/releases/download/7.13.7/v2rayN-linux-64.AppImage",
        "github": "https://github.com/2dust/v2rayN"
    },
    "v2rayng": {
        "version": "v1.10.11",
        "android": "https://github.com/2dust/v2rayNG/releases/download/1.10.11/v2rayNG_1.10.11_universal.apk",
        "github": "https://github.com/2dust/v2rayNG"
    },
    "gui.for.singbox": {
        "version": "v1.9.8",
        "windows": "https://github.com/GUI-for-Cores/GUI.for.SingBox/releases/download/v1.9.8/GUI.for.SingBox-windows-amd64.zip",
        "github": "https://github.com/GUI-for-Cores/GUI.for.SingBox"
    },
    "flclash": {
        "version": "v0.8.87",
        "windows": "https://github.com/chen08209/FlClash/releases/download/v0.8.87/FlClash-0.8.87-windows-amd64.zip.sha256",
        "mac": "https://github.com/chen08209/FlClash/releases/download/v0.8.87/FlClash-0.8.87-macos-amd64.dmg.sha256",
        "linux": "https://github.com/chen08209/FlClash/releases/download/v0.8.87/FlClash-0.8.87-linux-amd64.rpm.sha256",
        "android": "https://github.com/chen08209/FlClash/releases/download/v0.8.87/FlClash-0.8.87-android-arm64-v8a.apk",
        "github": "https://github.com/chen08209/FlClash"
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