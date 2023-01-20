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
    education(jsonData['education']);
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
    let fsocialIconHtml = '';
    for (const key in socialData) {
        if (Object.hasOwnProperty.call(socialData, key)) {
            const element = socialData[key];
            socialIconHtml += `<a class="btn btn-default btn-round btn-lg btn-icon" href="${element.url}" rel="tooltip" title="${element.tooltip}">
            <i class="${element.icon}"></i>
        </a>`;
        }
    }

    document.querySelector('.button-container').innerHTML = socialIconHtml;
    document.querySelector('#f-social-icon').innerHTML = socialIconHtml;
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


    // contect form basic info
    let footerBasicInfoTemplate = `<div class="card-body">
                                <p class="mb-0"><strong>Address </strong></p>
                                <p class="pb-2">${basicInfodata['address']}</p>
                                <p class="mb-0"><strong>Phone</strong></p>
                                <p class="pb-2">${basicInfodata['phone']}</p>
                                <p class="mb-0"><strong>Email</strong></p>
                                <p>${basicInfodata["email"] }</p>
                            </div>`;
    document.getElementById('basic-info-footer').innerHTML = footerBasicInfoTemplate;
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
    let latestExperienceData = experienceData.reverse();
    let experiencehtml = '';
    for (let i = 0; i < latestExperienceData.length; i++) {
        experiencehtml += `<div class="card">
        <div class="row">
            <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                <div class="card-body cc-experience-header">
                    <p>${latestExperienceData[i].from} - ${latestExperienceData[i].to}</p>
                    <div class="h5">${latestExperienceData[i].cname}</div>
                </div>
            </div>
            <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                <div class="card-body">
                    <div class="h5">${latestExperienceData[i].developerType}</div>
                    <p>${latestExperienceData[i].description}</p>
                </div>
            </div>
        </div>
    </div>`;
    }
    document.getElementById('experienceData').innerHTML = experiencehtml;

}

function education(educationData) {
    let educationDataReverse = educationData.reverse();
    let educationhtml = '';
    for (let index = 0; index < educationDataReverse.length; index++) {
        educationhtml += `<div class="card">
        <div class="row">
            <div class="col-md-3 bg-primary aos-init aos-animate" data-aos="fade-right" data-aos-offset="50" data-aos-duration="500">
                <div class="card-body cc-education-header">
                    <p>${educationDataReverse[index].from} - ${educationDataReverse[index].to}</p>
                    <div class="h5">${educationDataReverse[index].branch}</div>
                </div>
            </div>
            <div class="col-md-9 aos-init aos-animate" data-aos="fade-left" data-aos-offset="50" data-aos-duration="500">
                <div class="card-body">
                    <div class="h5">${educationDataReverse[index].branch}</div>
                    <p class="category">${educationDataReverse[index].name}</p>
                    <p>${educationDataReverse[index].description}</p>
                </div>
            </div>
        </div>
    </div>`;

    }
    document.getElementById('educationData').innerHTML = educationhtml;
}