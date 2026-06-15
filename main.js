/* ==================== STRUCTURAL VIEWPORT DETECTOR ACTIVATION ==================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if(navToggle){
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if(navClose){
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* ==================== DRAWER RETRACTION MECHANICS ==================== */
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================== ACCORDION DISPLACEMENT MATRIX CONTROLLER ==================== */
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
    let itemClass = this.parentNode.className;
    
    for(let i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content';
        // Reset bar widths inside collapsed layouts to trigger fluid entrance updates later
        let progressBars = skillsContent[i].querySelectorAll('.skills__bar-fill');
        progressBars.forEach(bar => bar.style.width = '0%');
    }
    
    if(itemClass === 'skills__content'){
        this.parentNode.className = 'skills__content skills__open';
        // Trigger style transitions for progress indicators inside opened cards
        triggerSkillProgress(this.parentNode);
    }
}

function triggerSkillProgress(activeNode) {
    const bars = activeNode.querySelectorAll('.skills__bar-fill');
    bars.forEach(bar => {
        // Parse original absolute target attribute values from custom configurations safely
        const targetWidth = bar.parentElement.previousElementSibling.querySelector('.skills__number').textContent;
        bar.style.width = targetWidth;
    });
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

// Boot execution mapping for primary active nodes visible immediately on viewport completion
document.addEventListener('DOMContentLoaded', () => {
    const primaryOpenNode = document.querySelector('.skills__content.skills__open');
    if(primaryOpenNode) {
        triggerSkillProgress(primaryOpenNode);
    }
});

/* ==================== RUNTIME VIEWPORT SECTION TRACKING INTERSECTIONS ==================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 60;
        let sectionId = current.getAttribute('id');

        const targetedAnchor = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
        if(targetedAnchor) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                targetedAnchor.classList.add('active-link');
            } else {
                targetedAnchor.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/* ==================== SHADOW HEADER MECHANICS ==================== */
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* ==================== LOCALSTORAGE PERSISTENT SYSTEM DESIGN SWITCHER ==================== */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'fa-sun';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'fa-moon' : 'fa-sun';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'fa-moon' ? 'add' : 'remove'](iconTheme);
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});