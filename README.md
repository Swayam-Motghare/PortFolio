# Swayam Motghare — Personal Portfolio

A personal portfolio website built to showcase my frontend development skills, projects, experiments, and approach to building modern web experiences.

The website focuses on clean design, responsive layouts, subtle interactions, animations, and maintaining understandable code.

## Overview

This portfolio is not only a showcase project but also a learning project.

While building it, I focused on understanding how each part works instead of simply assembling code. I designed the structure and logic myself and used AI primarily as a development consultant to review ideas, identify problems, explain concepts, and refine existing implementations.

## Features

- Responsive portfolio layout
- Interactive intro screen
- Magnetic heading interaction
- Mouse-following organic blob effect
- Mobile and tablet friendly intro experience
- Loading screen
- Responsive navigation
- Mobile navigation menu
- Active navigation based on scroll position
- Smooth scrolling
- Scroll reveal animations
- Project showcase section
- Project preview images
- Skills and technology section
- Contact section
- GitHub and LinkedIn links
- Downloadable CV
- Reduced-motion support
- Responsive design for desktop, tablet, and mobile

## Technologies

### Frontend

- HTML5
- CSS3
- JavaScript

### Libraries / Tools

- Font Awesome
- Google Fonts
- Git
- GitHub

## Project Structure

```text
Portfolio/
│
├── assets/
│   ├── SnakeGame/
│   │   ├── Images/
│   │   ├── script.js
│   │   ├── snake-index.html
│   │   └── style.css
│   │
│   └── Swayam-Motghare-CV.pdf
│
├── CSS/
│   └── style.css
│
├── Images/
│   ├── backgroudimage.png
│   ├── favicon.png
│   ├── mobile-image.jpg
│   └── snake-game-ss.png
│
├── JS/
│   └── script.js
│
└── index.html
```
# Intro Screen

The portfolio starts with an interactive introduction screen.
The main heading uses a magnetic interaction. When the user moves the mouse over the heading, the heading moves slightly toward the cursor while several organic blobs follow the mouse with different speeds and movement patterns.
The blob movement is created using:
- Mouse coordinates
- requestAnimationFrame()
- Linear interpolation
- Math.sin()
- Math.cos()
- Random offsets
- Random movement speeds
- Random animation phases
The purpose of the effect is to create an interactive first impression without making the interface difficult to use.
Mobile and Tablet Behaviour
Since touch devices do not have a traditional mouse hover interaction, the blob effect behaves differently on smaller screens.
On mobile and tablet:
- The blobs remain visible.
- Their organic movement continues automatically.
- The interaction does not depend on hover.
- The interface remains usable without a mouse.
The interaction is therefore adapted to the input method instead of simply copying the desktop behaviour onto mobile.

# Responsive Design
The website is designed around different screen sizes rather than treating mobile as a smaller desktop layout.
Responsive behaviour includes:
- Desktop navigation
- Mobile navigation menu
- Responsive typography
- Responsive project layouts
- Responsive project previews
- Responsive hero section
- Mobile-specific hero image
- Mobile-friendly buttons
- Mobile/tablet intro behaviour
- Responsive footer
- Flexible grids

# Animations
The website uses CSS and JavaScript animations for subtle visual feedback.
Examples include:
- Loading progress animation
- Magnetic heading movement
- Organic blob movement
- Button hover animations
- Navigation underline animation
- Project image reveal
- Scroll reveal animations
- Staggered element animations
- Project card hover effects
Animations are intentionally kept subtle so they support the interface instead of distracting from the content.
Accessibility and User Experience
The project also considers usability rather than focusing only on visual effects.
Examples include:
- Semantic HTML structure
- Descriptive image alt text
- Navigation links connected to page sections
- Accessible mobile menu state using aria-expanded
- Keyboard support for entering the portfolio
- prefers-reduced-motion support
- Responsive layouts
- Clear interactive elements
- External links using appropriate security attributes

# Snake Game
The Snake Game is one of the featured projects in the portfolio.
It is a browser-based game created using:
- HTML
- CSS
- JavaScript
- DOM manipulation
- CSS animations
The portfolio displays a screenshot preview of the project and provides a link to open the actual game.

# Development Approach
I am building this portfolio with a learning-first development approach.
Instead of immediately generating code and copying it into the project, I try to:
1. Think about the feature myself.
2. Design the basic logic.
3. Identify what concepts and properties are required.
4. Implement the feature.
5. Test it in the browser.
6. Identify problems.
7. Ask for an opinion or review when necessary.
8. Understand why something works or does not work.
9. Refine the existing implementation instead of unnecessarily replacing it.
This approach allows me to understand the project instead of becoming dependent on generated code.

## AI-Assisted Development
AI was used during the development of this project, but not as a replacement for learning or development.
I use AI primarily as a development consultant and code-review assistant.

How AI was used
AI helped me with:
- Reviewing my ideas before implementation
- Checking whether an interaction was user-friendly
- Finding bugs and inconsistencies
- Explaining unfamiliar CSS and JavaScript concepts
- Suggesting conventional approaches when my implementation was unnecessarily complicated
- Reviewing responsive behaviour
- Refining existing code
- Improving UI composition
- Identifying accessibility considerations
- Explaining why a particular implementation works
- Suggesting improvements without replacing the entire project
  
## What I did not want AI to do
I did not want the entire portfolio to be generated from scratch by AI and blindly copied into the project.
The goal was to understand the code I was building.
For example, when implementing the magnetic intro interaction, I first developed the idea and understood the behaviour I wanted. AI was then used to help review and refine the implementation.
Similarly, when problems appeared with responsive layouts or project images, the existing implementation was investigated and refined instead of repeatedly replacing the entire system.
Why I use AI this way
AI can produce code very quickly, but generating code is not the same as understanding it.
My goal is to become capable of:
- Designing the logic myself
- Understanding the technologies I use
- Debugging my own code
- Making architectural decisions
- Knowing when an implementation is conventional or unnecessarily complicated
- Using AI to improve my work rather than depending on AI to create the work
The long-term goal is to be able to build and maintain projects independently while using AI as an additional engineering tool.
Learning Notes
While developing this project, I am keeping notes about the technologies and concepts used.

# Topics include:
- HTML semantic structure
- CSS layout systems
- Flexbox
- CSS Grid
- Responsive design
- CSS transitions
- CSS animations
- transform
- clip-path
- backdrop-filter
- JavaScript DOM manipulation
- Event listeners
- Mouse events
- Keyboard events
- requestAnimationFrame()
- IntersectionObserver
- Linear interpolation
- Trigonometric movement
- Randomized animation
- Accessibility
- Reduced-motion preferences
- Responsive interaction design
The purpose of these notes is to make sure I can reproduce and understand the techniques later without depending on this project or the original conversation.
Future Improvements

# Planned improvements may include:
- More projects
- More detailed project case studies
- Improved project interactions
- Additional frontend experiments
- More advanced animations
- Better performance optimization
- Further accessibility improvements
- AI-assisted features where they provide genuine value
- Continued responsive testing
  
## Author
- Swayam Motghare
- Frontend Developer
- GitHub:
https://github.com/Swayam-Motghare
- LinkedIn:
https://www.linkedin.com/in/swayammotghare2005/
- Email:
motghareswayam@gmail.com
# License
This project is a personal portfolio website.
The source code is available for learning and reference, but personal content, images, branding, and other assets should not be reused without permission.
