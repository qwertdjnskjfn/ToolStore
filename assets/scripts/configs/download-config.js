// 下载链接配置  全是小写

// zjh 

const downloadLinks = {
    // Clash Verge
    'clash verge': {
        version: 'v2.2.2',
        windows: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64-setup.exe',
        mac: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge_2.2.2_x64.dmg',
        linux: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.2/Clash.Verge-2.2.2-1.x86_64.rpm',
        github: 'https://github.com/clash-verge-rev/clash-verge-rev'
    },
    // Mihomo Party
    'mihomo party': {
        version: 'v1.7.2',
        windows: 'https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.7.2/mihomo-party-windows-1.7.2-x64-setup.exe',
        mac: 'https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.7.2/mihomo-party-macos-1.7.2-x64.pkg',
        linux: 'https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.7.2/mihomo-party-linux-1.7.2-x86_64.rpm',
        github: 'https://github.com/mihomo-party-org/mihomo-party'
    },
    // ClashMeta
    'clashmeta': {
        version: 'v2.11.8',
        android: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.8/cmfa-2.11.8-meta-universal-release.apk',
        github: 'https://github.com/MetaCubeX/ClashMetaForAndroid'
    },
    // Surfboard
    'surfboard': {
        version: 'v2.24.10',
        android: 'https://github.com/getsurfboard/surfboard/releases/download/mobile-2.24.10/mobile-universal-release.apk',
        github: 'https://github.com/getsurfboard/surfboard'
    },
    // V2rayN
    'v2rayn': {
        version: 'v7.10.5',
        windows: 'https://github.com/2dust/v2rayN/releases/download/7.10.5/v2rayN-windows-64.zip',
        mac: 'https://github.com/2dust/v2rayN/releases/download/7.10.5/v2rayN-macos-64.dmg',
        linux: 'https://github.com/2dust/v2rayN/releases/download/7.10.5/v2rayN-linux-64.zip',
        github: 'https://github.com/2dust/v2rayN'
    },
    // V2rayNG
    'v2rayng': {
        version: 'v1.9.39',
        android: 'https://github.com/2dust/v2rayNG/releases/download/1.9.39/v2rayNG_1.9.39_universal.apk',
        github: 'https://github.com/2dust/v2rayNG'
    },
    // SingBox
    'singbox': {
        version: 'v1.11.6',
        windows: 'https://github.com/SagerNet/sing-box/releases/download/v1.11.6/sing-box-1.11.6-windows-386.zip',
        android: 'https://github.com/SagerNet/sing-box/releases/download/v1.11.6/SFA-1.11.6-universal.apk',
        linux: 'https://github.com/SagerNet/sing-box/releases/download/v1.11.6/sing-box-1.11.6-linux-386.tar.gz',
        mac: "https://apps.apple.com/us/app/sing-box-vt/id6673731168",
        ios: 'https://apps.apple.com/us/app/sing-box-vt/id6673731168',
        github: 'https://github.com/SagerNet/sing-box'
    },
    // GUI.for.SingBox
    'gui.for.singbox': {
        version: 'v1.9.5',
        windows: 'https://github.com/GUI-for-Cores/GUI.for.SingBox/releases/download/v1.9.5/GUI.for.SingBox-windows-386.zip',
        linux: 'https://github.com/GUI-for-Cores/GUI.for.SingBox/releases/download/v1.9.5/GUI.for.SingBox-linux-amd64.zip',
        github: 'https://github.com/GUI-for-Cores/GUI.for.SingBox'
    },
    // FlClash
    'flclash': {
        version: 'v0.8.80',
        windows: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-windows-amd64-setup.exe',
        android: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apkk',
        mac: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-macos-arm64.dmg',
        linux: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-linux-amd64.deb',
        github: 'https://github.com/chen08209/FlClash'
    },
    // Hiddify
    'hiddify': {
        version: 'v2.5.7',
        windows: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-Windows-Setup-x64.exe',
        android: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-Android-universal.apk',
        mac: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-MacOS-Installer.pkg',
        linux: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-Linux-x64.AppImage',
        ios: "https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532",
        github: 'https://github.com/hiddify/hiddify-app'
    },
    // NekoBox
    'nekobox': {
        version: 'v1.3.8',
        android: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/download/1.3.8/NekoBox-1.3.8-armeabi-v7a.apk',
        github: 'https://github.com/MatsuriDayo/NekoBoxForAndroid'
    },
    // V2rayU
    'v2rayu': {
        version: 'v4.2.5',
        mac: 'https://github.com/yanue/V2rayU/releases/download/v4.2.5/V2rayU-64.dmg',
        github: 'https://github.com/yanue/V2rayU'
    },
    // Shadowrocket
    'shadowrocket': {
        version: 'N/A',
        ios: 'https://apps.apple.com/us/app/shadowrocket/id932747118'
    },
    // QuantumultX
    'quantumultx': {
        version: 'N/A',
        mac: 'https://apps.apple.com/us/app/quantumult-x/id1443988620',
        ios: 'https://apps.apple.com/us/app/quantumult-x/id1443988620'
    },
    // Surge5
    'surge5': {
        version: 'N/A',
        mac: 'https://apps.apple.com/us/app/surge-5/id1442620678',
        ios: 'https://apps.apple.com/us/app/surge-5/id1442620678'
    },
    // OneClick
    'oneclick': {
        version: 'N/A',
        ios: 'https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197'
    },
    // V2Box
    'v2box': {
        version: 'N/A',
        android: 'https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box',
        ios: 'https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690'
    }
};




/* 
 * ------------------------------
 * 
 *  以下内容是 2025-05-05 新增的
 * 
 * ------------------------------
 */

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