let videos = [
  'https://klcxy.top/myoss/common/queryOssUrl?tbOssInfo.oiid=1109&tbOssInfo.obid=3',
  'https://klcxy.top/myoss/common/queryOssUrl?tbOssInfo.oiid=1110&tbOssInfo.obid=3'
];
let audios = [
  'https://klcxy.top/myoss/common/queryOssUrl?tbOssInfo.oiid=1111&tbOssInfo.obid=3',
  'https://klcxy.top/myoss/common/queryOssUrl?tbOssInfo.oiid=12&tbOssInfo.obid=1',
  './music/music.mp3',
  './music/Lock Me Up_The Cab_128K.mp3'
];
let images = [
  'https://klcxy.top/myoss/common/queryOssUrl?tbOssInfo.oiid=3&tbOssInfo.obid=1',
  'https://klcxy.top/myoss/common/queryOssUrl?tbOssInfo.oiid=98&tbOssInfo.obid=3',
  'https://klcxy.top/myoss/common/queryOssUrl?tbOssInfo.oiid=631&tbOssInfo.obid=1'
];

let btnVideo = document.getElementById('btnVideo');
let btnPause = document.getElementById('btnPause');
let myvideo = document.getElementById('myvideo');
let indexv = 0;
btnVideo.addEventListener('click', function () {
  //取模算法，一定会是0到取模值-1的结果
  // 所以用来在获取数组元素下标中堪称完美
  indexv = (indexv + 1) % videos.length;
  /* 
    setAttribute用于修改元素的属性值
    视频(媒体)标签的src属性决定了指向的媒体文件
    所有修改属性就能切换媒体文件
  */
  myvideo.setAttribute('src', videos[indexv]);
  myvideo.currentTime = 0;
  myvideo.play();
});
let vplay = false;
btnPause.addEventListener('click', function () {
  vplay = !vplay;
  vplay ? myvideo.pause() : myvideo.play();
});

//切换图片
let btnImg = document.getElementById('btnImg');
let myimg = document.getElementById('myimg');
let indexm = 0;
btnImg.addEventListener('click', function () {
  indexm = (indexm + 1) % images.length;
  myimg.setAttribute('src', images[indexm]);
  console.log('开始加载');
});

//切换音乐
let btnAudio = document.getElementById('btnAudio');
let myaudio = document.getElementById('myaudio');
let inedexa = 0;

btnAudio.addEventListener('click', function () {
  inedexa = parseInt(Math.random() * audios.length);
  myaudio.setAttribute('src', audios[inedexa]);
  myaudio.play();
});

//通过复选框是否勾选来控制音频是否播放
let chkAudio = document.getElementById('chkAudio');
chkAudio.addEventListener('change', function () {
  //复选框的选中状态
  console.log('复选框的选中状态:', chkAudio.checked);
  chkAudio.checked ? myaudio.play() : myaudio.pause();
});

//图片'load'
// 音频loadeddata
myimg.addEventListener('load', function (event) {
  console.log('数据加载完毕', event);
});
