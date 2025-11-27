/* ========================================
           SCROLL SPY WITH INTERSECTION OBSERVER
           ========================================
           
           This script handles two main features:
           1. Smooth scrolling when clicking navbar links
           2. Highlighting the active navbar link based on scroll position
        */

// ===== GET ALL REQUIRED ELEMENTS =====
const sections = document.querySelectorAll("section"); // All sections on the page
const navLinks = document.querySelectorAll(".nav-link"); // All navigation links

/* ===== FEATURE 1: SMOOTH SCROLL ON CLICK =====
           When a navbar link is clicked, smoothly scroll to that section
        */
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor jump behavior

    // Get the target section ID from the href attribute
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Scroll to the target section smoothly
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth", // Smooth scrolling animation
        block: "start", // Align to the top of the viewport
      });
    }
  });
});

/* ===== FEATURE 2: ACTIVE LINK HIGHLIGHTING WITH INTERSECTION OBSERVER =====
           
           Intersection Observer is a modern API that watches when elements
           enter or leave the viewport. It's more efficient than scroll event listeners.
           
           How it works:
           1. We create an observer that watches all sections
           2. When a section enters the viewport (is visible), we highlight its nav link
           3. When a section leaves the viewport, we remove the highlight
        */

// Configuration for Intersection Observer
const observerOptions = {
  root: null, // Use the viewport as the container
  rootMargin: "-70% 0px -70% 0px", // Trigger when section is in the middle 70% of viewport
  threshold: 0, // Trigger as soon as any part of the section is visible

  /* 
               WHY THIS CONFIGURATION
               - root: null means we're watching relative to the viewport
               - rootMargin: This creates a "zone" in the middle of the screen
                 When a section enters this middle zone, it becomes "active"
                 This prevents sections at the top/bottom edges from being active
               - threshold: 0 means trigger immediately when visible
            */
};

// Function to remove 'active' class from all nav links
function removeAllActiveClasses() {
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });
}

// Function to add 'active' class to the correct nav link
function setActiveLink(sectionId) {
  // Find the nav link that corresponds to this section
  const activeLink = document.querySelector(
    `.nav-link[data-target="${sectionId}"]`
  );

  if (activeLink) {
    removeAllActiveClasses(); // First, remove all active states
    activeLink.classList.add("active"); // Then, add active to current link
  }
}

// Create the Intersection Observer
const observer = new IntersectionObserver((entries) => {
  /* 
               CALLBACK FUNCTION
               This runs every time a section enters or leaves the viewport
               'entries' is an array of all sections being observed
            */

  entries.forEach((entry) => {
    // Check if the section is intersecting (visible in the viewport zone)
    if (entry.isIntersecting) {
      // Get the ID of the visible section
      const sectionId = entry.target.getAttribute("id");

      // Update the active nav link to match this section
      setActiveLink(sectionId);
    }
  });
}, observerOptions);

// Start observing all sections
sections.forEach((section) => {
  observer.observe(section);
});

/* ===== INITIAL STATE =====
           Set the first nav link (Home) as active when page loads
        */
if (navLinks.length > 0) {
  navLinks[0].classList.add("active");
}

/* ===== ADDITIONAL FEATURE: SMOOTH SCROLL FOR LOGO CLICK =====
           When clicking the logo, scroll back to home section
        */
const logo = document.querySelector(".logo");
logo.addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector("#home").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
