window.addEventListener('load', main);
//console.log = function() {};

async function main() {
    var xhr = await new XMLHttpRequest();

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
    about(jsonData['about']);
    social(jsonData['social']);
    basicInfo(jsonData['basic_info']);
    skills(jsonData['skills']);
    experience(jsonData['experience']);
}

function about(aboutData) {
    document.querySelector('#profileImg').src = aboutData.profileImage;
    document.querySelector('#name').innerText = aboutData.name;
    document.querySelector('#subLine').innerText = aboutData.developerType;
    let aboutdatahtml = '';
    for (const i in aboutData.about) {
        aboutdatahtml += `<p>${aboutData.about[i]}</p>`;

    }
    document.getElementById('about-desc').innerHTML = aboutdatahtml;


}

function social(socialData) {
    let socialIconHtml = '';
    for (const key in socialData) {
        if (Object.hasOwnProperty.call(socialData, key)) {
            const element = socialData[key];
            socialIconHtml += `<a class="btn btn-default btn-round btn-lg btn-icon" href="${element.url}" rel="tooltip" title="${element.tooltip}">
            <i class="${element.icon}"></i>
        </a>`;
        }
    }
    document.querySelector('.button-container').innerHTML = '';
    document.querySelector('.button-container').innerHTML = socialIconHtml;
}

function basicInfo(basicInfodata) {
    let basicInfoTemplate = '';
    for (const key in basicInfodata) {
        if (Object.hasOwnProperty.call(basicInfodata, key)) {
            // const element = basicInfodata[key];
            basicInfoTemplate += `<div class="row mt-3">
                                    <div class="col-sm-4"><strong class="text-uppercase">${key}:</strong></div>
                                    <div class="col-sm-8">${basicInfodata[key]}</div>
                                </div>`;
        }
    }
    document.getElementById('basic-info').innerHTML = basicInfoTemplate;
}


//adding skills info

function skills(skillsData) {
    let skillshtml = `<div class="row">`;;
    let i = 0;
    for (const key in skillsData) {
        if (Object.hasOwnProperty.call(skillsData, key)) {

            if (i % 2 != 0) {
                skillshtml += `<div class="col-md-6">
                <div class="progress-container progress-primary"><span class="progress-badge">${key}</span>
                    <div class="progress">
                        <div class="progress-bar progress-bar-primary aos-init aos-animate" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ${skillsData[key]};"></div><span class="progress-value">${skillsData[key]}</span>
                    </div>
                </div>
            </div>`;
            } else {
                skillshtml += `<div class="col-md-6">
                <div class="progress-container progress-primary"><span class="progress-badge">${key}</span>
                    <div class="progress">
                        <div class="progress-bar progress-bar-primary aos-init aos-animate" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ${skillsData[key]};"></div><span class="progress-value">${skillsData[key]}</span>
                    </div>
                </div>
            </div>`;
            }


        }

        i++;
    }
    skillshtml += `</div>`;
    document.getElementById('skills-info').innerHTML = skillshtml;
}

function experience(experienceData) {
    for (const key in experienceData) {
        if (Object.hasOwnProperty.call(experienceData, key)) {
            const element = experienceData[key];
            console.log(element);

        }
    }

}