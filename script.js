let siteElements = {
    header: document.querySelector('.introduction'),
    skills: document.querySelector('.skill-details'),
    myWork: document.querySelector('.my-work'),
    about: document.querySelector('.about'),
    contact: document.querySelector('.contact'),
}

let siteSectionLinks = [[siteElements.header, '#header-nav'], 
                        [siteElements.skills, '#skills-nav'], 
                        [siteElements.myWork,'#myWork-nav'], 
                        [siteElements.about, '#about-nav'], 
                        [siteElements.contact, '#contact-nav'],
                        [siteElements.header, '#header-nav-mb'], 
                        [siteElements.skills, '#skills-nav-mb'], 
                        [siteElements.myWork,'#myWork-nav-mb'], 
                        [siteElements.about, '#about-nav-mb'], 
                        [siteElements.contact, '#contact-nav-mb']];

let siteActions = {
    loadDocumentHeight: function() {
        for(let referenceElement in siteElements) {
            siteElements[referenceElement].style.height = `${document.documentElement.clientHeight}px`;
        }
    }
}

let mobileMenuBtn = document.querySelector('.nav-mobile-btn');
let menuExpanded = false;
mobileMenuBtn.addEventListener('click', () => {
    if(!menuExpanded) {
        mobileMenuBtn.classList.add('expand');
        menuExpanded = true;
    } else {
        mobileMenuBtn.classList.remove('expand');
        menuExpanded = false;
    }
});

siteActions.loadDocumentHeight();

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
document.querySelector('#header-nav-mb').onclick = function(event) {
    window.scrollBy(0, siteElements.header.getBoundingClientRect().top);
}
document.querySelector('#skills-nav-mb').onclick = function(event) {
    window.scrollBy(0, siteElements.skills.getBoundingClientRect().top);
}
document.querySelector('#myWork-nav-mb').onclick = function(event) {
    window.scrollBy(0, siteElements.myWork.getBoundingClientRect().top);
}
document.querySelector('#about-nav-mb').onclick = function(event) {
    window.scrollBy(0, siteElements.about.getBoundingClientRect().top);
}
document.querySelector('#contact-nav-mb').onclick = function(event) {
    window.scrollBy(0, siteElements.contact.getBoundingClientRect().top);
}

function drawSvg(onSiteElement, pathId, direction) {
    let path = document.querySelector(`${pathId}`);
    let pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;
    let siteElementTop = onSiteElement.getBoundingClientRect().top * -1;
    let scrollPercentage;
    if(siteElementTop + (onSiteElement.scrollHeight/2) < onSiteElement.scrollHeight) {
        scrollPercentage = (siteElementTop + (onSiteElement.scrollHeight/2) < 0 ? 0: (siteElementTop + (onSiteElement.scrollHeight/2)) / (onSiteElement.scrollHeight / 2)) * direction;
    } else if (siteElementTop + (onSiteElement.scrollHeight/2) >= onSiteElement.scrollHeight) {
        scrollPercentage = 0;
    }
    let drawLength = pathLength * scrollPercentage;
    path.style.strokeDashoffset = pathLength - drawLength;
}

function linkHighlight(siteSectionLink) {
    let elementIsHalfwayInWindow = Math.abs(siteSectionLink[0].getBoundingClientRect().top) < siteSectionLink[0].scrollHeight/2;
    if(elementIsHalfwayInWindow) {
        document.querySelector(siteSectionLink[1]).classList.add('nav-link-on');
    } else {
        document.querySelector(siteSectionLink[1]).classList.remove('nav-link-on');
    }
}
 
window.addEventListener("resize", () => {
    siteActions.loadDocumentHeight()
    referenceSizeAndPosition('#bg-header-horizontal2', '.intro', 
    (document.querySelector('.intro').getBoundingClientRect().top - document.querySelector('.intro').getBoundingClientRect().bottom)-30);  
    referenceSizeAndPosition('#bg-skills-horizontal', '.skill-details', -100);
    referenceSizeAndPosition('#bg-skills-horizontal2', '.skill-details', (document.querySelector('.skill-details').getBoundingClientRect().top - document.querySelector('.skill-details').getBoundingClientRect().bottom) + 100);
    referenceSizeAndPosition('#bg-nav-vertical', '.nav-links', 0, -(document.querySelector('.nav-links').getBoundingClientRect().right), 0.01);
});

function referenceSizeAndPosition(svgId, referenceId, fromTop=0, fromLeft=0, widthPercent=1, heightPercent=1) {

    let referenceElement = document.querySelector(referenceId);
    let svg = document.querySelector(svgId);

    svg.style.height = referenceElement.clientHeight * heightPercent;
    svg.style.width = referenceElement.clientWidth * widthPercent;
    svg.style.left = `${referenceElement.offsetLeft - fromLeft}px`;
    svg.style.top = `${referenceElement.offsetTop - fromTop}px`

}

window.addEventListener("scroll", () => {
    document.body.style.setProperty("--scroll", window.pageYOffset / (document.body.offsetHeight - window.innerHeight));
    drawSvg(siteElements.header, `#bg-header-horizontal-path2`, 1);
    drawSvg(siteElements.skills, `#bg-skills-horizontal-path`, 1);
    drawSvg(siteElements.skills, `#bg-skills-horizontal-path2`, 1);
    drawSvg(siteElements.myWork, `#bg-work-vertical-path`, 1);
    drawSvg(siteElements.about, `#bg-about-horizontal-path`, 1);
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
    referenceSizeAndPosition('#bg-header-horizontal2', '.intro', (document.querySelector('.intro').getBoundingClientRect().top - document.querySelector('.intro').getBoundingClientRect().bottom)-30);  
    referenceSizeAndPosition('#bg-skills-horizontal', '.skill-details', -100);
    referenceSizeAndPosition('#bg-skills-horizontal2', '.skill-details', (document.querySelector('.skill-details').getBoundingClientRect().top - document.querySelector('.skill-details').getBoundingClientRect().bottom) + 100);
    referenceSizeAndPosition('#bg-nav-vertical', '.nav-links', 0, -(document.querySelector('.nav-links').getBoundingClientRect().right), 0.01);
});

document.querySelector('#submit').onclick = function (event) {
    document.querySelector('.contact form').remove();
    document.querySelector('.on-submit').style.opacity = "100%";
    document.querySelector('.on-submit h2').style.visibility = "visible";
    document.querySelector('.on-submit').classList.remove('on-submit-hidden')
}
















