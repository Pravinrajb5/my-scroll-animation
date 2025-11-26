// app.js

document.addEventListener("DOMContentLoaded", () => {
  const video = document.querySelector(".hero-video");
  const heroSection = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-content");

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Wait until video metadata is loaded so we know .duration
  video.addEventListener("loadedmetadata", () => {
    setupScrollVideoScrollTrigger(video, heroSection, heroContent);
    revealSectionsOnScroll();
  });

  // Fallback if metadata doesn't fire properly on some browsers
  if (video.readyState >= 1) {
    setupScrollVideoScrollTrigger(video, heroSection, heroContent);
    revealSectionsOnScroll();
  }
});

function setupScrollVideoScrollTrigger(video, heroSection, heroContent) {
  const videoDuration = video.duration || 5; // fallback duration

  // Pin the hero section and scrub the video time based on scroll
  ScrollTrigger.create({
    trigger: heroSection,
    start: "top top",
    end: "+=4000", // scroll distance to control scrub length
    scrub: true,
    pin: true,
    onUpdate: (self) => {
      // self.progress is 0 → 1 across the scroll distance
      const scrollProgress = self.progress;
      const currentTime = scrollProgress * videoDuration;
      video.currentTime = currentTime;
    }
  });

  // Animate the hero text out as user scrolls
  gsap.to(heroContent, {
    y: -80,
    opacity: 0,
    scrollTrigger: {
      trigger: heroSection,
      start: "top top",
      end: "center top",
      scrub: true
    }
  });
}

function revealSectionsOnScroll() {
  // Simple fade-up for each content section
  const sections = gsap.utils.toArray(".section");

  sections.forEach((section) => {
    gsap.from(section.querySelector(".section-inner"), {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  });
}
