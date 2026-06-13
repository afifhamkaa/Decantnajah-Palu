document.addEventListener("DOMContentLoaded", () => {
  const checkBox = document.querySelector("#button-menu");
  const listMenu = document.querySelector("nav ul");
  const navLinks = document.querySelectorAll("nav ul li a");

  if (checkBox instanceof HTMLInputElement) {
    checkBox.addEventListener("change", () => {
      checkBox.checked
        ? listMenu.classList.add("show")
        : listMenu.classList.remove("show");
    });
  }

  // Close menu on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (checkBox instanceof HTMLInputElement) {
        checkBox.checked = false;
        listMenu.classList.remove("show");
      }
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
});
