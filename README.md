## Intro
Tetris 俄罗斯方块

界面模仿自 [react-tetris](https://github.com/chvin/react-tetris)，与以下图片类似：

<img src="https://camo.githubusercontent.com/8980082e6edae22933d63d58e02af96e7056fb89/68747470733a2f2f696d672e616c6963646e2e636f6d2f7470732f544231416737434e5858585858616f5858585858585858585858582d3332302d3438332e676966">

由于未学习 React、Redux，此项目的所有功能都是用原生js写的

## Browser
目前只支持 chrome

## Features
- 数据保存： 用localStorage对象保存游戏记录
- 游戏按键模拟
- 平滑的移动：通过 EventUtil 以及 EventController 限制了原生 keydown 的触发频率

## ToDo

1. level 功能
2. 音效
3. 响应式