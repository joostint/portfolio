document.addEventListener("DOMContentLoaded", function () {
  const dynamicText = document.querySelector("h2 span");

  if (!dynamicText) {
    console.error("Could not find h2 span element");
    return;
  }

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

  // Grid item hover effects and expansion animation
  document.querySelectorAll(".grid-item").forEach((item, index) => {
    const image = item.querySelector(".hoverable");
    const title = image?.getAttribute("data-title");
    const description = image?.getAttribute("data-description");
    const overlay = item.querySelector(".overlay");
    const overlayTitle = overlay?.querySelector("h3");
    const overlayDescription = overlay?.querySelector("p");
    const link = item.querySelector("a");

    // Project color mapping
    const projectColors = ["dieup", "noir", "rca", "wander"];
    const projectClass = projectColors[index];

    if (image && overlay && overlayTitle && overlayDescription) {
      image.addEventListener("mouseover", function () {
        overlayTitle.textContent = title;
        overlayDescription.textContent = description;
        overlay.style.opacity = 1;
      });

      image.addEventListener("mouseout", function () {
        overlay.style.opacity = 0;
      });
    }

    // Expansion animation on click
    if (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Get the position of the clicked item
        const rect = item.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Create expansion overlay
        const expansionOverlay = document.createElement("div");
        expansionOverlay.className = `expansion-overlay ${projectClass}`;
        expansionOverlay.style.left = centerX + "px";
        expansionOverlay.style.top = centerY + "px";
        expansionOverlay.style.transform = "translate(-50%, -50%)";

        document.body.appendChild(expansionOverlay);

        // Trigger animation
        setTimeout(() => {
          expansionOverlay.classList.add("active");
        }, 10);

        // Navigate after animation
        setTimeout(() => {
          window.location.href = link.href;
        }, 800);
      });
    }
  });
});
