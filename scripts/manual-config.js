// 手动配置的仓库和下载链接
const manualConfig = {
    // 手动配置的仓库信息
    repositories: {
        // 示例格式：
        // "app-name": {
        //   owner: "owner-name",
        //   repo: "repo-name"
        // }
        "v2box": {
            "owner": "v2box",
            "repo": "v2box",
            "name": "v2box",
            "version": "N/A",
            "links": {
                "version": "N/A",
                "android": "https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box",
                "ios": "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690",
            }
        }
    },

    // 手动配置的下载链接
    downloadLinks: {
        // 示例格式：
        // "app-name": {
        //   windows: "https://example.com/windows-download",
        //   macos: "https://example.com/macos-download",
        //   linux: "https://example.com/linux-download",
        //   ios: "https://example.com/ios-download",
        //   android: "https://example.com/android-download"
        // }
        "v2box": {
            "version": "N/A",
            "android": "https://play.google.com/store/apps/details?id=dev.hexasoftware.v2box",
            "ios": "https://apps.apple.com/us/app/v2box-v2ray-client/id6446814690"
        }
    }
};

module.exports = manualConfig; 