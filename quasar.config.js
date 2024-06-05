import { configure } from "quasar/wrappers";
import { fileURLToPath } from "node:url";

export default configure((ctx) => {
  return {
    // 预加载特性配置
    // 预加载功能会在页面切换之前预先获取页面数据
    // preFetch: true,

    // 应用启动文件位于 /src/boot 目录
    // boot 文件会在 "main.js" 中的一部分加载
    boot: [
      "i18n", // 多语言支持文件，用于国际化处理
      "axios", // HTTP 客户端支持文件，用于发起网络请求
    ],

    // 自定义的样式文件
    css: [
      "app.scss", // 使用 SCSS 的全局样式文件
    ],

    // 额外的图标和字体库
    extras: [
      // 'ionicons-v4', // 可选的图标库
      // 'mdi-v7', // 可选的 Material Design Icons v7
      "roboto-font", // Roboto 字体，可选项
      "material-icons", // Material 图标，可选项
    ],

    // 构建配置选项
    build: {
      target: {
        browser: ["es2022", "firefox115", "chrome115", "safari14"], // 指定支持的目标浏览器
        node: "node20", // Node.js 的目标版本
      },
      vueRouterMode: "hash", // Vue Router 模式：'hash' 或 'history'

      // Vite 插件配置
      vitePlugins: [
        // Vue I18n 插件配置，用于国际化支持
        [
          "@intlify/unplugin-vue-i18n/vite",
          {
            ssr: ctx.modeName === "ssr", // 是否启用 SSR 模式
            include: [fileURLToPath(new URL("./src/i18n", import.meta.url))], // 多语言资源文件路径
          },
        ],
        // Vite 检查器插件，用于 ESLint 检查
        [
          "vite-plugin-checker",
          {
            eslint: {
              lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"', // ESLint 检查命令
            },
          },
          { server: false },
        ],
      ],
    },

    // 开发服务器配置
    devServer: {
      open: true, // 启动开发服务器时自动打开浏览器窗口
    },

    // Quasar 框架配置
    framework: {
      config: {}, // 全局配置项

      // iconSet: 'material-icons', // 使用的 Quasar 图标集
      // lang: 'en-US', // Quasar 语言包配置

      // Quasar 插件配置
      plugins: [],
    },

    // 动画配置
    // animations: 'all', // 包含所有动画
    animations: [], // 不使用内置动画

    // 服务器端渲染配置
    ssr: {
      prodPort: 3000, // 生产服务器的默认端口（如果运行时未指定其他端口）
      middlewares: [
        "render", // 保持中间件顺序，'render' 应该作为最后一个
      ],
      pwa: false, // 禁用 PWA 支持
    },

    // 渐进式 Web 应用 (PWA) 配置
    pwa: {
      workboxMode: "GenerateSW", // Workbox 模式：'GenerateSW' 或 'InjectManifest'
    },

    // Cordova 配置项
    cordova: {
      // noIosLegacyBuildFlag: true, // 仅在明确需要时取消注释
    },

    // Capacitor 配置
    capacitor: {
      hideSplashscreen: true, // 隐藏启动屏幕
    },

    // Electron 桌面应用配置
    electron: {
      preloadScripts: ["electron-preload"], // Electron 预加载脚本路径
      inspectPort: 5858, // 开发模式下用于调试的端口
      bundler: "packager", // 打包工具选择：'packager' 或 'builder'

      packager: {
        // Electron Packager 配置选项
      },

      builder: {
        appId: "quasar-project", // Electron Builder 的应用 ID
      },
    },

    // 浏览器扩展 (BEX) 配置
    bex: {
      contentScripts: [
        "my-content-script", // 内容脚本配置
      ],
    },
  };
});
