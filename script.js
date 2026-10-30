
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Membuka dan menutup menu navigasi
menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    const isOpen = navLinks.classList.contains("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Menutup menu setelah salah satu link diklik
document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});
