let selProvince = document.getElementById('selProvince')
let selCity = document.getElementById('selCity')

const SERVER_BASE_URL = 'https://huhuiyu.top/teach-service'

//数据联动的数据获取(
//获取省份信息

//记住省份城市列表
let provinceLists = []
let cityLists = []

function queryProvince() {
  let promise = axios({
    url: SERVER_BASE_URL + '/linkinfo/queryAllProvince',
    method: 'post',
    data: Qs.stringify({})
  })

  promise
    .then((response) => {
      let data = response.data
      let provinceList = data.resultData.list
      provinceLists = provinceList
      // console.log('查询省份信息的结果', data)
      selProvince.innerHTML = ''
      for (let i = 0; i < provinceList.length; i++) {
        let option = document.createElement('option')
        option.append(data.resultData.list[i].province)
        option.setAttribute('value', provinceList[i].pid)
        selProvince.appendChild(option)
        option = document.createElement('option')
      }
      //设置默认选中中间项
      let index = parseInt(provinceList.length / 2)
      selProvince.selectedIndex = index
      //立即查询设置省份
      queryCity()
    })
    .catch((error) => {
      console.error(error)
    })
}

queryProvince()

//城市信息查询
function queryCity() {
  let pid = selProvince.value
  console.log('省份id' + pid)
  let promise = axios({
    url: SERVER_BASE_URL + '/linkinfo/queryCityByProvince',
    method: 'post',
    data: Qs.stringify({ 'tbCity.pid': pid })
  })

  promise
    .then((response) => {
      let data = response.data
      let cityList = data.resultData.list
      cityLists = cityLists
      selCity.innerHTML = ''
      for (let i = 0; cityList.length; i++) {
        let c = cityList[i]
        let option = document.createElement('option')
        option.setAttribute('vaule', c.cid)
        option.append(c.city)
        selCity.appendChild(option)
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

//联动的核心i就是a的数据变化触发的数据变化
selProvince.addEventListener('change', queryCity)

//获取选中信息的部分
let btnShow = document.getElementById('btnShow')
let spShow = document.getElementById('spShow')

btnShow.addEventListener('click', function () {
  //索引
  let pindex = selProvince.selectedIndex //选中索引值
  let cindex = selCity.selectedIndex
  //值
  let pid = selProvince.value
  let cid = selCity.value
  console.log('选中的信息', pindex, cindex, pid, cid)
  let p = provinceLists[pindex]
  let c = cityLists[cindex]
  console.log('详细信息', p.province, c.city)
})
