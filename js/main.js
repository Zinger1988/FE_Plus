var getList = document.querySelector('#getList'),
    resultList = [];

getList.addEventListener('click', function () {
    startReq('json/data1.json');
    startReq('json/data2.json');
})

function startReq(url) {

    var promise = new Promise(function (resolve, reject) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) {
                return;
            }

            if (xhr.status != 200) {
                reject();
            } else {
                resolve(xhr.responseText);
            }
        }

        xhr.send();

    })

    promise
        .then(function (response) {
            resultList = resultList.concat(JSON.parse(response));
        }, function () {
            console.log('Server is not responding');
        })
}


