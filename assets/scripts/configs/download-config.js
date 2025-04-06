// 下载链接配置  全是小写
const downloadLinks = {
    // clash verge
    'clash verge': {
        windows: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.0/Clash.Verge_2.2.0_x64-setup.exe',
        mac: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.0/Clash.Verge_2.2.0_x64.dmg',
        linux: 'https://github.com/clash-verge-rev/clash-verge-rev/releases/download/v2.2.0/Clash.Verge-2.2.0-1.x86_64.rpm',
        github: 'https://github.com/clash-verge-rev/clash-verge-rev'
    },
    // mihomo party
    'mihomo party': {
        windows: 'https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.7.2/mihomo-party-windows-1.7.2-x64-setup.exe',
        mac: 'https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.7.2/mihomo-party-macos-1.7.2-x64.pkg',
        linux: 'https://github.com/mihomo-party-org/mihomo-party/releases/download/v1.7.2/mihomo-party-linux-1.7.2-x86_64.rpm',
        github: 'https://github.com/mihomo-party-org/mihomo-party'
    },
    // clashmeta
    'clashmeta': {
        android: 'https://github.com/MetaCubeX/ClashMetaForAndroid/releases/download/v2.11.8/cmfa-2.11.8-meta-x86-release.apk',
        github: 'https://github.com/MetaCubeX/ClashMetaForAndroid'
    },
    // surfboard
    'surfboard': {
        android: 'https://github.com/getsurfboard/surfboard/releases/download/mobile-2.24.10/mobile-universal-release.apk',
        github: 'https://github.com/getsurfboard/surfboard'
    },
    // v2rayn
    'v2rayn': {
        windows: 'https://github.com/2dust/v2rayN/releases/download/7.7.0/v2rayN-With-Core.zip',
        github: 'https://github.com/2dust/v2rayN'
    },
    // v2rayn
    'v2rayng': {
        android: 'https://github.com/2dust/v2rayNG/releases/download/1.9.39/v2rayNG_1.9.39_universal.apk',
        github: 'https://github.com/2dust/v2rayNG'
    },
    // singbox
    'singbox': {
        windows: 'https://github.com/SagerNet/sing-box/releases/download/v1.11.6/sing-box-1.11.6-windows-386.zip',
        android: 'https://github.com/SagerNet/sing-box/releases/download/v1.11.6/SFA-1.11.6-universal.apk',
        linux: 'https://github.com/SagerNet/sing-box/releases/download/v1.11.6/sing-box-1.11.6-linux-386.tar.gz',
        mac: "https://apps.apple.com/us/app/sing-box-vt/id6673731168",
        ios: 'https://apps.apple.com/us/app/sing-box-vt/id6673731168',
        github: 'https://github.com/SagerNet/sing-box'
    },
    // singboxgui
    'gui.for.singbox': {
        windows: 'https://github.com/GUI-for-Cores/GUI.for.SingBox/releases/download/v1.9.5/GUI.for.SingBox-windows-386.zip',
        linux: 'https://github.com/GUI-for-Cores/GUI.for.SingBox/releases/download/v1.9.5/GUI.for.SingBox-linux-amd64.zip',
        github: 'https://github.com/GUI-for-Cores/GUI.for.SingBox'
    },
    // flclash
    'flclash': {
        windows: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-windows-amd64-setup.exe',
        android: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-android-armeabi-v7a.apkk',
        mac: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-macos-arm64.dmg',
        linux: 'https://github.com/chen08209/FlClash/releases/download/v0.8.80/FlClash-0.8.80-linux-amd64.deb',
        github: 'https://github.com/chen08209/FlClash'
    },
    // hiddify
    'hiddify': {
        windows: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-Windows-Setup-x64.exe',
        android: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-Android-universal.apk',
        mac: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-MacOS-Installer.pkg',
        linux: 'https://github.com/hiddify/hiddify-app/releases/download/v2.5.7/Hiddify-Linux-x64.AppImage',
        ios: "https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532",
        github: 'https://github.com/hiddify/hiddify-app'
    },
    // nekobox
    'nekobox': {
        android: 'https://github.com/MatsuriDayo/NekoBoxForAndroid/releases/download/1.3.8/NekoBox-1.3.8-armeabi-v7a.apk',
        github: 'https://github.com/MatsuriDayo/NekoBoxForAndroid'
    },
    // v2rayu
    'v2rayu': {
        mac: 'https://github.com/yanue/V2rayU/releases/download/v4.2.5/V2rayU-64.dmg',
        github: 'https://github.com/yanue/V2rayU'
    },
    // shadowrocket
    'shadowrocket': {
        ios: 'https://apps.apple.com/us/app/shadowrocket/id932747118'
    },
    // quantumultx
    'quantumultx': {
        mac: 'https://apps.apple.com/us/app/quantumult-x/id1443988620',
        ios: 'https://apps.apple.com/us/app/quantumult-x/id1443988620'
    },
    // surge5
    'surge5': {
        mac: 'https://apps.apple.com/us/app/surge-5/id1442620678',
        ios: 'https://apps.apple.com/us/app/surge-5/id1442620678'
    },
    // oneclick
    'oneclick': {
        ios: 'https://apps.apple.com/us/app/oneclick-safe-easy-fast/id1545555197'
    }
};

// 导出配置
export { downloadLinks }; 