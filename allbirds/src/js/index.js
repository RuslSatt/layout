import '../scss/project-allbirds.scss';
import '../index.html'


const iconMenu = document.querySelector('.icon-menu');
const menu = document.querySelector('.menu');

iconMenu.addEventListener('click', function (e) {
    iconMenu.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
})

const linksLeft = document.querySelectorAll('[data-num = link]');

linksLeft.forEach(linkLeft => {
    linkLeft.addEventListener('click', function (e) {
        if (iconMenu.classList.contains('active')) {
            iconMenu.classList.remove('active');
            menu.classList.remove('active');
            document.body.classList.remove('lock');
        }
    })
})

