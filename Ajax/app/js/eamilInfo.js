let tbData = document.getElementById('tbDataf')

function queryEmail() {
  ajax.send('/email/message/queryAll',
    {}, function (data) {
      if (data.success) {
        console.log(data);
      }
    }, 'POST')
}

queryEmail()
let = page = {
  pageNumber: 1,
  pageSize: 10
}

function callEmail() {
  ajax.send('/email/message/reply', {
    tbEmailMessage: {
      emid: 4,
      reply: 'test'
    }
  }, function (data) {
    if (data.success) {
      console.log(data);
    }
  }, 'POST')
}


callEmail()
