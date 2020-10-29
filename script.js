let siteElements = {
    header: document.querySelector('.introduction'),
    nav: document.querySelector('.nav'),
    skills: document.querySelector('.skill-details'),
    philosophy: document.querySelector('.philosophy'),
    myWork: document.querySelector('.my-work'),
    about: document.querySelector('.about'),
    contact: document.querySelector('.contact'),
}

let siteSectionLinks = [[siteElements.header, '#header-nav'], [siteElements.skills, '#skills-nav'], [siteElements.myWork,'#myWork-nav'], [siteElements.about, '#about-nav'], [siteElements.contact, '#contact-nav']]

let siteActions = {
    loadHeight: function() {
        for(let element in siteElements) {
            siteElements[element].style.height = `${document.documentElement.clientHeight}px`;
        }
    }
}

siteActions.loadHeight();

document.querySelector('#header-nav').onclick = function(event) {
    window.scrollBy(0, siteElements.header.getBoundingClientRect().top);
}
document.querySelector('#skills-nav').onclick = function(event) {
    window.scrollBy(0, siteElements.skills.getBoundingClientRect().top);
}
document.querySelector('#myWork-nav').onclick = function(event) {
    window.scrollBy(0, siteElements.myWork.getBoundingClientRect().top);
}
document.querySelector('#about-nav').onclick = function(event) {
    window.scrollBy(0, siteElements.about.getBoundingClientRect().top);
}
document.querySelector('#contact-nav').onclick = function(event) {
    window.scrollBy(0, siteElements.contact.getBoundingClientRect().top);
}

function drawSvg(onSiteElement, pathId, direction) {
    let path = document.querySelector(`${pathId}`);
    let pathLength = path.getTotalLength();
    // Creates a path with a stroke and empty space the length of the path
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    // Offsets path so that it starts with empty part of stroke
    path.style.strokeDashoffset = pathLength;
    
    let siteElementTop = onSiteElement.getBoundingClientRect().top * -1;
    // Will determine how far the path is offset, 0 will be completely empty 1 will be filled
    let scrollPercentage;
    
    // conditions so that drawing starts while the top half of the siteElement is scrolling into view
    if(siteElementTop + (onSiteElement.scrollHeight/2) < onSiteElement.scrollHeight) {
        scrollPercentage = (siteElementTop + (onSiteElement.scrollHeight/2) < 0 ? 0: (siteElementTop + (onSiteElement.scrollHeight/2)) / (onSiteElement.scrollHeight / 2)) * direction;
    } else if (siteElementTop + (onSiteElement.scrollHeight/2) >= onSiteElement.scrollHeight) {
        scrollPercentage = 0;
    }
    let drawLength = pathLength * scrollPercentage;
    path.style.strokeDashoffset = pathLength - drawLength;

}

function linkHighlight(siteSectionLink) {

    if(Math.abs(siteSectionLink[0].getBoundingClientRect().top) < siteSectionLink[0].scrollHeight/2) {
        document.querySelector(siteSectionLink[1]).classList.add('nav-link-on');
    } else {
        
        document.querySelector(siteSectionLink[1]).classList.remove('nav-link-on');
        
    }

}

window.addEventListener("resize", () => {
    siteActions.loadHeight()
    let element = document.querySelector('#greeting');
    document.querySelector('#bg-header-horizontal').style.width = document.querySelector('#greeting').clientWidth;
    document.querySelector('#bg-header-horizontal').style.left = `${element.offsetLeft}px`;
    console.log(document.querySelector('#bg-header-horizontal').style.width, document.querySelector('#greeting').clientWidth);


});

window.addEventListener("scroll", () => {
    document.body.style.setProperty("--scroll", window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    drawSvg(siteElements.header, `#bg-header-horizontal-path`, 1);
    for(i=0; i<=2; i++) {
        drawSvg(siteElements.skills, `#circle-path${i}`, 1);
        drawSvg(siteElements.skills, `#sm-circle-path${i}`, -1);
    }
    for(let siteSectionLink of siteSectionLinks) {
        linkHighlight(siteSectionLink);
    }
});

window.addEventListener("load", () => {
    document.querySelector('#greeting').style.setProperty('--greeting-width', '5px');
    let element = document.querySelector('#greeting');
    document.querySelector('#bg-header-horizontal').style.width = document.querySelector('#greeting').clientWidth;
    document.querySelector('#bg-header-horizontal').style.left = `${element.offsetLeft}px`;
    console.log(document.querySelector('#bg-header-horizontal').style.width, document.querySelector('#greeting').clientWidth);
});

















