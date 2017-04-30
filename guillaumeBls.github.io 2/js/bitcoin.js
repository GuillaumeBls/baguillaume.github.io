var submit = document.querySelector('.submit-hash');
var error = document.querySelector('.error');

submit.addEventListener('click', function() {
    var hash = document.querySelector('.input-hash').value;
    if (hash != '') {
        request(hash);
    }else{
    	error.innerHTML = 'Enter Hash';
        document.querySelector(bc_infos).style.display = 'none';
    }

})

function request(hash) {
    var url_requested = 'https://api.blockcypher.com/v1/btc/main/blocks/' + hash;
    var bc_number = '.bitcoin-number';
    var bc_time = '.bitcoin-time';
    var bc_hash = '.bitcoin-hash';
    var bc_infos = '.container-bitcoin-infos';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = this.responseText;
            var jsonPretty = (JSON.parse(myObj));
            error.innerHTML = '';
            document.querySelector(bc_number).innerHTML = jsonPretty.height;
            document.querySelector(bc_time).innerHTML = jsonPretty.time;
            document.querySelector(bc_hash).innerHTML = jsonPretty.hash;
            document.querySelector(bc_infos).style.display = 'block';
        } else if (this.readyState == 4 && this.status == 404) {
            error.innerHTML = 'Wrong Hash';
            document.querySelector(bc_infos).style.display = 'none';
        }
    };


    xmlhttp.open("GET", url_requested, true);
    xmlhttp.send();

}
