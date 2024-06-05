import { app, BrowserWindow } from "electron"; // 引入 Electron 中的 app 和 BrowserWindow 模块
import path from "node:path"; // 引入 Node.js 的 path 模块
import os from "node:os"; // 引入 Node.js 的 os 模块
import { fileURLToPath } from "node:url"; // 引入 Node.js 的 fileURLToPath 函数

const platform = process.platform || os.platform(); // 获取当前平台信息

const currentDir = fileURLToPath(new URL(".", import.meta.url)); // 获取当前目录路径

let mainWindow; // 定义主窗口变量

function createWindow() {
  // 创建一个新的浏览器窗口
  mainWindow = new BrowserWindow({
    icon: path.resolve(currentDir, "icons/icon.png"), // 设置任务栏图标路径
    width: 1000, // 设置窗口宽度
    height: 600, // 设置窗口高度
    useContentSize: true, // 使用页面的实际内容尺寸
    webPreferences: {
      contextIsolation: true, // 启用上下文隔离
      preload: path.resolve(
        currentDir,
        path.join(
          process.env.QUASAR_ELECTRON_PRELOAD_FOLDER,
          "electron-preload" + process.env.QUASAR_ELECTRON_PRELOAD_EXTENSION,
        ),
      ), // 预加载脚本路径
    },
  });

  if (process.env.DEV) {
    // 如果是开发环境，则加载开发服务器 URL
    mainWindow.loadURL(process.env.APP_URL);
  } else {
    // 如果是生产环境，则加载打包后的 HTML 文件
    mainWindow.loadFile("index.html");
  }

  if (process.env.DEBUGGING) {
    // 如果启用了调试模式，则打开开发者工具
    mainWindow.webContents.openDevTools();
  } else {
    // 否则，防止开发者工具被打开
    mainWindow.webContents.on("devtools-opened", () => {
      mainWindow.webContents.closeDevTools();
    });
  }

  // 当窗口关闭时，清空主窗口变量
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用
app.whenReady().then(createWindow);

// 当所有窗口关闭时退出应用（除 macOS 以外）
app.on("window-all-closed", () => {
  if (platform !== "darwin") {
    // macOS 平台通常会保持应用活跃状态，除非用户明确关闭
    app.quit();
  }
});

// 当应用在 macOS 上被激活（例如：点击Dock图标时），如果没有窗口，则重新创建一个窗口
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
