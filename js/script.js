window.addEventListener('load', main);
//console.log = function() {};

function main() {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            var jsonData = JSON.parse(this.responseText);
            // console.log(jsonData);
            printJsonData(jsonData);
            document.querySelector('.loader').style.display = "none";
            document.querySelector('body').style.overflowY = "scroll";
        }
    });

    xhr.open("GET", "aboutme.json");

    xhr.send();
}
// get json data and call to its respective function
function printJsonData(jsonData) {
    for (const elem in jsonData) {
        switch (elem) {
            case "about":
                about(jsonData[elem]);
            case "social":
                social(jsonData[elem]);
        }
        console.log(elem);
    }
}

function about(aboutData) {
    document.querySelector('#profileImg').src = aboutData.profileImage;
    document.querySelector('#name').innerText = aboutData.name;
    document.querySelector('#subLine').innerText = aboutData.developerType;
    console.log(aboutData);
}

function social(socialData) {

    let socialIconHtml = '';
    for (const key in socialData) {
        if (Object.hasOwnProperty.call(socialData, key)) {
            const element = socialData[key];
            socialIconHtml += `<a class="btn btn-default btn-round btn-lg btn-icon" 
                href="${socialData[key].url}" 
                rel="tooltip" title="${socialData[key].tooltip}">
                <i class="${socialData[key].icon}"></i>
            </a>`;
        }
    }
    document.querySelector('.button-container').innerHTML = socialIconHtml;
    console.log(socialIconHtml);
}


(function() {
    var _z = console;
    Object.defineProperty(window, "console", {
        get: function() {
            if (_z._commandLineAPI) {
                throw "Sorry, Can't execute scripts!";
            }
            return _z;
        },
        set: function(val) {
            _z = val;
        }
    });

})();