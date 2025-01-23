---
title: 局域网视频串流 + 前端调用摄像头应用实例
description: 局域网视频串流 + 前端调用摄像头应用实例
date: 2023/12/18
image: https://s2.loli.net/2023/12/18/D3rZ2BtpuP5wdlM.png
published: true
tags: [Frontend]
---

> 当下个人持有多个跨端设备已经成为日常，继实现音频串流、键鼠穿越以及试用大厂的多端同步应用之后，我结合iriun webcam在前端实现了一个简易的视频串流并在前端调用的实例。

**本文章所用前端代码地址：[camera-test](https://gitee.com/cxy2003/camera-test)**

**项目主页：[https://cxy2003.gitee.io/camera-test](https://cxy2003.gitee.io/camera-test)
(首次打开貌似有按钮加载不完全的bug，刷新一下就好)**

# 起步

## 设备清单(设备名作打码处理)：

| 设备名       | 平台    | 系统版本    |
| ------------ | ------- | ----------- |
| LAPTOP-xxxx  | windows | windows 11  |
| K30Pro Redmi | Android | MIUI 14.0.4 |

## 软件清单

| 软件名                   | 版本   |
| ------------------------ | ------ |
| iriun webcam for android | v2.8   |
| iriun webcam for windows | v2.8.1 |
| vscode                   | 1.85.0 |

## 前端依赖清单

```json
  "dependencies": {
    "vue": "^3.3.11"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.5.2",
    "typescript": "^5.2.2",
    "vite": "^5.0.8",
    "vue-tsc": "^1.8.25"
  }
```

初始化项目参考以下命令：

```sh
$ cd <your root>
$ npm create vite@latest <your repo> -t vue-ts
```

上述命令表示切换到你的目录并以vue-ts-vite模板初始化一个项目。

# riun webcam

分别安装pc和android软件并处于同一局域网中，串流成功效果如下：
![image.png](https://s2.loli.net/2023/12/18/7s4LX2hJWmeaTYF.png)
️

# 前端代码

```ts
<script setup lang="ts">
import {onMounted, ref} from 'vue';

let videoStream: MediaStream | null = null;
let angleIndex = 0;

const videoElement =  ref<HTMLVideoElement | null>(null);
const angles = ["0deg", "90deg", "180deg", "270deg"];
type videoAngle = typeof angles[number];
const angle = ref<videoAngle>("0deg");
const devices = ref<({id:string, label:string} | undefined )[] >([{id: "", label: ""}]);

const constraints:MediaStreamConstraints = {
  video: {
    width: {
      min: 1280,
      ideal: 1920,
      max: 2560,
    },
    height: {
      min: 720,
      ideal: 1080,
      max: 1440,
    },
  }
};


function rotateCamera(){
  if ( angleIndex < 3 ){
    angleIndex++;
  }else{
    angleIndex = 0;
  }
  angle.value = angles[angleIndex];
}
async function changeCamera(id?:string){
  if(!id) return;

  if( videoElement.value ){
    const constraintsCopy = {
      video:Object.assign({
              deviceId: id
        },constraints.video)};
    //停止视频流
    closeCamera();

    //重新获取视频流
    videoStream = await navigator.mediaDevices.getUserMedia(constraintsCopy)
    console.log(videoStream);

    videoElement.value.srcObject = videoStream;
  }
}

onMounted(async ()=>{
    devices.value = (await navigator.mediaDevices.enumerateDevices()).map((device)=>{
      if(device.kind === "videoinput"){
        return {
          label:device.label,
          id:device.deviceId
        }
      }
    }).filter(Boolean);
    playCamera();
})
function closeCamera(){
  if ( videoElement.value ){
    videoStream?.getVideoTracks().map(track => {
      track.stop();
      videoStream?.removeTrack(track);});
    videoStream = null;
    videoElement.value.srcObject = null;
  }
}
async function playCamera(){
  if ( videoElement.value ){
    if (videoElement.value.srcObject){
      videoElement.value.play();
    } else {
    videoStream = await navigator.mediaDevices.getUserMedia(constraints);

    videoElement.value.srcObject = videoStream;
  }
  }
}

</script>

<template>
  <h3>首次打开请授予摄像头权限后刷新网页</h3>
  <div class="wrapper">
    <video autoplay id="camera" ref="videoElement"></video>
    <div class="controls">
      <button type="button" @click="playCamera">play</button>
      <button type="button" @click="videoElement?.pause()">stop</button>
      <button type="button" @click="rotateCamera">rotate</button>
      <button type="button" @click="closeCamera">close</button>
    </div>
    <div  class="devices">
      <button v-for="device in devices" @click="changeCamera(device?.id)">{{ device?.label }}</button>
    </div>
  </div>
  <div class="copyright">©2023 copyright Zayn</div>
</template>

<style scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.devices{
  display: flex;
  width: 90vw;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap:2px;
  row-gap: 2px;
}
.devices button{
  width:10rem;
  height:3rem;
  background-color: cadetblue;
  color: smokegray;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.controls{
  display:flex;
  justify-content:center;
  align-items:start;
  margin-top:1rem;
  column-gap:1rem;
}
.controls button{
  width:5rem;
  background-color: cadetblue;
  color: smokegray;
}
#camera {
  width: 80vw;
  height: 60vh;
  border: 2px solid black;
  transform: rotate(v-bind(angle));
  translate: 10vw;
}
.copyright{
  position: absolute;
  left:50%;
  translate: -50%;
}
@media screen and (min-width: 768px){
  #camera{
    translate: 0;
    width:50vw;
  }
  .wrapper{
    flex-direction: row;
    column-gap: 20px;
  }

  .devices{
    flex-direction: column;
    row-gap: 20px;
    justify-content: start;
    align-items: start;
  }

  .devices button:hover{
    background-color: smokegray;
    color: white;
  }

  .controls{
    margin-top: 0;
    flex-direction: column;
    row-gap: 10px;
    justify-content:start;
    align-items:start;
  }
  .copyright{
    bottom: 1rem;
  }

}

</style>
```

## 前端效果：

![image.png](https://s2.loli.net/2023/12/18/D3rZ2BtpuP5wdlM.png)

# 参考文章

- [如何使用JavaScript访问设备摄像头](https://cloud.tencent.com/developer/article/1641490)
- [iriun webcam](https://iriun.com/)
