let Img = document.getElementById('Img');
let Btn = document.getElementById('Btn');
let Name = document.getElementById('Name');

//图片数组
let images = [
  '/images/1.jpg',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
  '/images/7.png'
];

//姓名数组
let names = ['小二','张三', '李四', '王五', '赵六', '孙七', '吴八'];
  //随机次数
  let loopcount = 0;
  //计时器
  let timer;
  function randInfo() {
    timer = setInterval(function () {
      loopcount++;
      if (loopcount > 20) {
        clearInterval(timer);
        loopcount = 0;
        return;
      }
      //随机挑选一个图片的索引
      let index = parseInt(Math.random() * images.length);
      Img.setAttribute('src', images[index]);
      Name.innerHTML=names[index];
    },200);
  }

  Btn.onclick = function () {
  randInfo();  
  };
  
  

