<img src="showcase/logo.png" width=100>

## Tetris

试玩一下：https://cxphoe.github.io/Tetris/docs/

> 俄罗斯方块

游戏由原生javascript实现。界面模仿自 [chvin/react-tetris](https://github.com/chvin/react-tetris)，与以下图片类似：

<img src="https://camo.githubusercontent.com/8980082e6edae22933d63d58e02af96e7056fb89/68747470733a2f2f696d672e616c6963646e2e636f6d2f7470732f544231416737434e5858585858616f5858585858585858585858582d3332302d3438332e676966">

此项目的所有功能都是由原生js实现。

## Features

- [x] 数据保存： 用localStorage对象保存游戏记录
- [x] 游戏按键模拟
- [x] 平滑的移动：通过 ActionController 限制了原生 keydown 的触发频率
- [ ] 移动端目前只测试通过iphone
- [x] 响应式：自适应高度，宽度
- [x] level: 一共有6个不同的级别，可以在初始时设置。每消除20行提升一个级别
- [ ] 音效
- [ ] 多种语言

## 整体结构

<img src="showcase/game.png">

- 游戏主体用 `canvas` 元素表示，由 `area` 控制。所有方块（包括 area 中的方块，方块组合）都是直接画出来的。
- `game` 的主要逻辑是在循环的 `setTimeout` 不断地调用 `draw` 在 `area` 中画出相应的元素。 `game.draw` 调用由 `GameScene` 的实例提供的 `draw`。整个游戏过程中通过切换场景，可以实现不同功能的 `draw`。
- `game` 的数据更新由 `game.update` 实现。也由不同的场景提供。
- 所有 `keyboard` 操作都是 `ActionController` 能根据设置实现有规律性的触发。`window` 的 `key` 事件触发频率是先递增，后固定，不符合游戏的操作。

## Develop

### 安装

	npm install

### 运行

	npm start 浏览自动打开 http://127.0.0.1:8080/

### 打包编译
	
	npm run build

在build文件夹下生成结果。