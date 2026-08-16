const body = document.body;

const loadingScreen = document.getElementById("loading-screen");

const introScreen = document.getElementById("intro-screen");
const introHeading = document.getElementById("intro-heading");
const introEnterButton = document.getElementById("intro-enter-button");
const introBlobContainer = document.getElementById("intro-blob-container");

const mobileMenuButton = document.getElementById("mobile-menu-button");
const primaryNavigation = document.getElementById("primary-navigation");

const navigationLinks = document.querySelectorAll(".navigation-link");
const sections = document.querySelectorAll("main section[id]");

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-stagger"
);

const imageRevealElements = document.querySelectorAll(
    ".project-image-placeholder"
);

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


let introMouseX = window.innerWidth / 2;
let introMouseY = window.innerHeight / 2;

let introHeadingX = 0;
let introHeadingY = 0;

let introHeadingHover = false;

const introBlobs = [];
const introBlobCount = 8;


function hideLoadingScreen() {

    setTimeout(() => {

        loadingScreen.classList.add("loaded");

        body.classList.remove("loading");

    }, 1500);
}


window.addEventListener("load", hideLoadingScreen);


function createIntroBlobs() {

    if (prefersReducedMotion) {
        return;
    }

    for (let i = 0; i < introBlobCount; i++) {

        const element = document.createElement("div");

        element.classList.add("intro-blob");

        introBlobContainer.appendChild(element);

        introBlobs.push({

            element: element,

            x: introMouseX,
            y: introMouseY,

            offsetX: (Math.random() - 0.5) * 260,
            offsetY: (Math.random() - 0.5) * 260,

            speed: 0.015 + Math.random() * 0.025,

            movementX: 15 + Math.random() * 40,
            movementY: 15 + Math.random() * 40,

            frequencyX: 0.0005 + Math.random() * 0.0008,
            frequencyY: 0.0005 + Math.random() * 0.0008,

            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2

        });
    }
}


window.addEventListener("mousemove", (event) => {

    introMouseX = event.clientX;
    introMouseY = event.clientY;

});


function animateIntro(time) {

    if (
        introScreen &&
        !introScreen.classList.contains("hidden")
    ) {

        introBlobs.forEach((blob) => {

            const randomX =
                Math.sin(
                    time * blob.frequencyX + blob.phaseX
                ) * blob.movementX;

            const randomY =
                Math.cos(
                    time * blob.frequencyY + blob.phaseY
                ) * blob.movementY;

            const targetX =
                introMouseX +
                blob.offsetX +
                randomX;

            const targetY =
                introMouseY +
                blob.offsetY +
                randomY;

            blob.x +=
                (targetX - blob.x) *
                blob.speed;

            blob.y +=
                (targetY - blob.y) *
                blob.speed;

            blob.element.style.transform =
                `translate(${blob.x}px, ${blob.y}px)`;

        });


        if (introHeadingHover) {

            const headingRect =
                introHeading.getBoundingClientRect();

            const headingCenterX =
                headingRect.left +
                headingRect.width / 2;

            const headingCenterY =
                headingRect.top +
                headingRect.height / 2;

            const distanceX =
                introMouseX - headingCenterX;

            const distanceY =
                introMouseY - headingCenterY;

            const magneticStrength = 0.08;

            const targetHeadingX =
                distanceX * magneticStrength;

            const targetHeadingY =
                distanceY * magneticStrength;

            introHeadingX +=
                (targetHeadingX - introHeadingX) *
                0.12;

            introHeadingY +=
                (targetHeadingY - introHeadingY) *
                0.12;

        } else {

            introHeadingX +=
                (0 - introHeadingX) *
                0.12;

            introHeadingY +=
                (0 - introHeadingY) *
                0.12;
        }


        introHeading.style.transform =
            `translate(${introHeadingX}px, ${introHeadingY}px)`;
    }


    requestAnimationFrame(animateIntro);
}


if (introHeading && introScreen) {

    introHeading.addEventListener("mouseenter", () => {

        introHeadingHover = true;

        introHeading.classList.add("is-hovering");

        introScreen.classList.add("interacting");

    });


    introHeading.addEventListener("mouseleave", () => {

        introHeadingHover = false;

        introHeading.classList.remove("is-hovering");

        introScreen.classList.remove("interacting");

    });

}


function enterPortfolio() {

    if (!introScreen) {
        return;
    }

    introScreen.classList.add("hidden");

    body.classList.remove("intro-active");

}


if (introEnterButton) {

    introEnterButton.addEventListener(
        "click",
        enterPortfolio
    );

}


window.addEventListener("keydown", (event) => {

    if (
        event.key === "Enter" &&
        introScreen &&
        !introScreen.classList.contains("hidden")
    ) {

        enterPortfolio();

    }

});


createIntroBlobs();

requestAnimationFrame(animateIntro);


if (mobileMenuButton && primaryNavigation) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen =
            primaryNavigation.classList.toggle("mobile-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        mobileMenuButton.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    navigationLinks.forEach((link) => {

        link.addEventListener("click", () => {

            primaryNavigation.classList.remove(
                "mobile-open"
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuButton.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 850) {

            primaryNavigation.classList.remove(
                "mobile-open"
            );

            mobileMenuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuButton.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

}


if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}


if (
    imageRevealElements.length > 0 &&
    !prefersReducedMotion
) {

    const imageRevealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "image-visible"
                    );

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.2
        }
    );


    imageRevealElements.forEach((image) => {

        imageRevealObserver.observe(image);

    });

} else {

    imageRevealElements.forEach((image) => {

        image.classList.add("image-visible");

    });

}


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        const sectionId =
            section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navigationLinks.forEach((link) => {

                link.classList.remove("active");

            });


            const activeLink =
                document.querySelector(
                    `.navigation-link[href="#${sectionId}"]`
                );


            if (activeLink) {

                activeLink.classList.add("active");

            }

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


updateActiveNavigation();