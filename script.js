const buttonContainer = document.querySelector('.skills__btn--container');
const skillButton = document.querySelectorAll('.btn__content');
const btnSend = document.querySelector('.btn__send');
const skillsContent = document.querySelectorAll('.skills__content');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const overlay = document.querySelector('.overlay');
const serviceID = 'service_vgy4sjp';
const templateID = 'template_lzpn5zw';

const header = document.querySelector('.header');
// Navigation bar
const nav = document.querySelector('.nav');

// Modals
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Email function
btnSend.addEventListener('click', function () {
  var params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };
  if (
    document.getElementById('name').value == '' ||
    document.getElementById('email').value == '' ||
    document.getElementById('message').value == ''
  ) {
    alert('All fields requires values');
  } else {
    emailjs
      .send(serviceID, templateID, params)
      .then(res => {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('message').value = '';

        alert('Your message has been sent.');
      })
      .catch(err => console.error(err));
  }
});

// Smooth scrolling
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Sticky Navigation Bar
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Navigation links fade animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));
// Skill section, switching classes
buttonContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.btn__content');
  // Guard clause for clicking outside the button
  if (!clicked) return;

  skillButton.forEach(t => t.classList.remove('btn__active'));
  skillsContent.forEach(t => t.classList.remove('skills__active'));
  // Add class to clicked button
  clicked.classList.add('btn__active');
  document
    .querySelector(`.skills__content--${clicked.dataset.tab}`)
    .classList.add('skills__active');
});

//Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace lazy image with the original
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgTargets.forEach(img => imgObserver.observe(img));
