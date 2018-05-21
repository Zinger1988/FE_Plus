var getList = document.querySelector('#getList'),
    flag = true;

getList.addEventListener('click', function () {
    resultList = [];
    startReq('json/data1.json', 'json/data2.json');
})

function startReq(url1, url2) {
    httpRequest(url1)
        .then(
            function () {
                return httpRequest(url2)
            }, function () {
                console.log('error')
            }
        )
        .then(
            function () {
                localStorage.setItem('resultList', JSON.stringify(resultList));
                condition();
            }, function () {
                console.log('error')
            }
        );
}

function httpRequest(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (xhr.status == 200) {
                resultList = resultList.concat(JSON.parse(xhr.response))
                resolve();
            } else {
                reject();
            }
        };
        xhr.onerror = function () {
            reject();
        };
        xhr.send();
    });
}

function condition() {
    if (localStorage['resultList'] && flag) {
        render();
    }
}

function render() {
    var renderList = JSON.parse(localStorage.getItem('resultList'));
    renderList.forEach(function (item) {
        newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = item;
        document.body.appendChild(newDiv);
    })
    flag = !flag;
}

window.onload = function () {
    if (localStorage['resultList']) {
        render();
    }
}



