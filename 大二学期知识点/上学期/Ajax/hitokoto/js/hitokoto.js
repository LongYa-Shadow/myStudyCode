let hitokoto_txt = document.getElementById('hitokoto_txt')
fetch('https://v1.hitokoto.cn')
  .then((response) => response.json())
  .then((data) => {
    hitokoto_txt.href = 'https://hitokoto.cn/?uuid=' + data.uuid
    hitokoto_txt.innerText = data.hitokoto
    console.log(data);
  })
