const dynamicText = document.querySelector("h2 span");
const words = [
  "a UX Designer.",
  "a cat dad.",
  "a Buckeye.",
  "a pickle hater.",
  "a Cavs fan.",
  "goofy-footed.",
  "from Cleveland.",
  "double-jointed.",
  "introverted.",
  "a keyboard wizard.",
  "Vietnamese.",
  "constantly iterating.",
  "an amateur fisher.",
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentWord = words[wordIndex];
  const currentChar = currentWord.substring(0, charIndex);
  dynamicText.textContent = currentChar;

  if (!isDeleting && charIndex < currentWord.length) {
    //If condition is true, type next character
    charIndex++;
    setTimeout(typeEffect, 150);
  } else if (isDeleting && charIndex > 0) {
    //If condition is true, remove previous character
    charIndex--;
    setTimeout(typeEffect, 100);
  } else {
    //If word is deleted, switch to next word
    isDeleting = !isDeleting;
    wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
    setTimeout(typeEffect, 1200);
  }
};

typeEffect();

document.querySelectorAll(".grid-item").forEach((item) => {
  const image = item.querySelector(".hoverable");
  const title = image.getAttribute("data-title");
  const description = image.getAttribute("data-description");
  const overlay = item.querySelector(".overlay");
  const overlayTitle = overlay.querySelector(".title");
  const overlayDescription = overlay.querySelector(".description");

  image.addEventListener("mouseover", function () {
    overlayTitle.textContent = title;
    overlayDescription.textContent = description;
    overlay.style.opacity = 1;
  });

  image.addEventListener("mouseout", function () {
    overlay.style.opacity = 0;
  });
});
