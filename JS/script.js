const mobileMenuButton = document.getElementById("mobile-menu-button");
const primaryNavigation = document.getElementById("primary-navigation");
const navigationLinks = document.querySelectorAll(".navigation-link");
const talkButton = document.getElementById("talk-button");

mobileMenuButton.addEventListener("click", () => {
    const isOpen = primaryNavigation.classList.toggle("mobile-open");

    mobileMenuButton.setAttribute("aria-expanded", isOpen);

    mobileMenuButton.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
        
});

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigationLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        primaryNavigation.classList.remove("mobile-open");

        mobileMenuButton.setAttribute("aria-expanded", "false");

        mobileMenuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

talkButton.addEventListener("click", () => {
    navigationLinks.forEach((link) => {
        link.classList.remove("active");
    });

    document.getElementById("navigation-contact").classList.add("active");
});

window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("main section[id]");
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            navigationLinks.forEach((link) => {
                link.classList.remove("active");
            });

            const activeLink = document.querySelector(
                `.navigation-link[href="#${sectionId}"]`
            );

            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
});