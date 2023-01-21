/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/


// Create Nav Element

let navLiElementCounter = 0;
function createNavElement(sectionName) {
    const navLiElement = document.createElement('li');
    const anchorTag = document.createElement('a');
    navLiElementCounter++;
    anchorTag.setAttribute('id', 'anchor' + navLiElementCounter);
    anchorTag.classList.add('menu__link');
    anchorTag.textContent = sectionName;
    navLiElement.appendChild(anchorTag);
    anchorTag.style.cursor = 'pointer';
    return navLiElement;
}

// Navigation Bar sections

const sections = document.getElementsByTagName('section');
const navBarList = document.getElementById('navbar__list');
const myfragNavList = document.createDocumentFragment();
let activeAnchor;

function buildNavBar(sections) {
    for (let section of sections) {
        const sectionName = section.getAttribute('data-nav');
        const sectionId = section.getAttribute('id');
        myfragNavList.appendChild(createNavElement(sectionName, sectionId));
    }
    navBarList.appendChild(myfragNavList);
    const activeAnch = document.getElementById('anchor1');
    activeAnch.classList.add('menu__link--active');
    activeAnchor = activeAnch;
}

let activeSection = document.querySelector('.your-active-class');

function activateSection(inactiveSection) {
    if (inactiveSection !== activeSection) {
        
        inactiveSection.classList.add('your-active-class');
        activeSection.classList.remove('your-active-class');
        activeSection = inactiveSection;

        let anchorId = inactiveSection.getAttribute('id');
        anchorId = anchorId.replace('section', 'anchor');
        const anchor = document.getElementById(anchorId);

        anchor.classList.add('menu__link--active');
        activeAnchor.classList.remove('menu__link--active');
        activeAnchor = anchor;
    }
}



// NavBar Function
buildNavBar(sections);
// Jump to select section 
navBarList.addEventListener('click', (e) => {
    if (e.target.nodeName === 'A') {
        const sectionNo = document.querySelector(`[data-nav = '${e.target.textContent}']`);
        const sectionPosstion = sectionNo.getBoundingClientRect().top;
        const startPosstion = window.pageYOffset;
        activateSection(sectionNo);

        window.scrollTo({
            top: sectionPosstion + startPosstion,
            behavior: 'smooth'
        });
    }
});
// Scroll to the top of the page 
const upArrow = document.getElementById('up-arrow');
upArrow.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
});
