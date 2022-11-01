"use strict";
const nav = document.querySelector(".nav");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
const footer = document.querySelector("#footer-container");
const signUpContainer = document.querySelector("#section--sign-up");

const header = document.querySelector(".main__header");

const modalBtn = document.querySelectorAll(".btn--show-modal");
const closeModalBtn = document.querySelector(".btn--close-modal");
const LearnMoreBtn = document.querySelector(".btn");
const operationBtn = document.querySelector(".operation__btns");

// fixed NavBar
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
};
const scrollObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${-navHeight}px`,
});
scrollObserver.observe(header);

//Smooth scrolling to sections
nav.addEventListener("click", function (e) {
  e.preventDefault();
  scroll(e);
});
function scroll(e) {
  if (e.target.classList.contains("nav__list--link")) {
    const id = e.target.getAttribute("href");
    if (!id) return;
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
}
LearnMoreBtn.addEventListener("click", function (e) {
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

// reveal sections on scroll
const sectionsAll = [section1, section2, section3, signUpContainer, footer];

const watchSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("reveal");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(watchSection, {
  root: null,
  threshold: 0,
  rootMargin: "20px",
});
sectionsAll.forEach((sec) => sectionObserver.observe(sec));

// fadeOut on hover on nav elements

function handleHover(e) {
  if (e.target.classList.contains("nav__list--link")) {
    const el = e.target;
    const element = el.closest(".nav");
    const logo = element.querySelector(".nav__logo--image");
    if (!element) return;
    const siblings = element.querySelectorAll(".nav__list--link");
    siblings.forEach((sibling) => {
      if (sibling !== el) {
        sibling.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//opening/closing modal/account opening
function openModal() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

modalBtn.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

closeModalBtn.addEventListener("click", closeModal);

window.document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

//operations sections
operationBtn.addEventListener("click", function (e) {
  const clickedBtn = e.target.closest(".operation__btn");
  if (!clickedBtn) return;
  const tabNum = clickedBtn.dataset.tab;
  const btns = document.querySelectorAll(".operation__btn");
  btns.forEach((btn) => {
    btn.classList.remove("active");
    document
      .querySelectorAll(".operation")
      .forEach((tab) => tab.classList.add("hidden"));
  });
  clickedBtn.classList.add("active");
  document.querySelector(`.operation--${tabNum}`).classList.remove("hidden");
});

// slider
const slides = document.querySelectorAll(".slide");
const slideLefttBtn = document.querySelector(".slider__btn--left");
const slideRighttBtn = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

const slider = function () {
  const maxSlide = slides.length - 1;
  let curSlide = 0;

  function activeDot() {
    document.querySelectorAll(".dot").forEach((dot) => {
      dot.classList.remove("dot--active");
      if (curSlide === +dot.dataset.tab) dot.classList.add("dot--active");
    });
  }

  function init() {
    const dotsMarkup = `<div class = "dot"></div>`;
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${i * 100}%)`;
      dotsContainer.insertAdjacentHTML("afterbegin", dotsMarkup);
      document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.setAttribute("data-tab", `${i}`);
      });
      activeDot();
    });
  }
  init();

  function goToSlide(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    activeDot();
  }
  function goToRight() {
    if (curSlide < maxSlide) {
      curSlide += 1;
    } else curSlide = 0;
    goToSlide(curSlide);
  }
  function goToLeft() {
    if (curSlide > 0) {
      curSlide -= 1;
    } else curSlide = maxSlide;
    goToSlide(curSlide);
  }

  slideRighttBtn.addEventListener("click", goToRight);

  slideLefttBtn.addEventListener("click", goToLeft);

  window.document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") goToRight();
    if (e.key === "ArrowLeft") goToLeft();
  });

  dotsContainer.addEventListener("click", function (e) {
    const dotNumber = +e.target.dataset.tab;
    if (!dotNumber) return;
    curSlide = dotNumber;
    goToSlide(dotNumber);
  });
};
slider();
