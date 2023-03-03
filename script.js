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

  emailjs
    .send(serviceID, templateID, params)
    .then(res => {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
      console.log(res);
      alert('Your message has been sent.');
    })
    .catch(err => console.error(err));
});

// Smooth scrolling
document.querySelector('.nav__links').addEventListener('click', function (e) {
  //console.log(e.target);
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Sticky Navigation Bar
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

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
