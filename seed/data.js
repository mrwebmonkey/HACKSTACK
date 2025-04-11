// seed/data.js

module.exports = [
    {
      category: {
        title: "Web Development",
        description: "Projects related to modern web development.",
        image_link: "/images/web_img.avif",
      },
      projects: [
        {
          title: "Portfolio Website",
          description: "Create a personal portfolio to showcase your skills.",
          tools: ['HTML', 'CSS', 'JavaScript'],
          difficulty: 'Easy',
          estimate_time: '2-3 days',
          file_structure: `
  /portfolio
    ├── index.html
    ├── css/
    │   └── styles.css
    ├── js/
    │   └── script.js
    └── images/
          `,
          scope: 'A simple portfolio website to showcase projects and contact info.',
          code: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header>
    <h1>Hello, I'm [Your Name]</h1>
    <p>Frontend Developer | Designer | Coder</p>
  </header>

  <section id="about">
    <h2>About Me</h2>
    <p>This is a short paragraph about you, your background, and what you do.</p>
  </section>

  <section id="projects">
    <h2>Projects</h2>
    <ul>
      <li>Project 1 - Description</li>
      <li>Project 2 - Description</li>
      <li>Project 3 - Description</li>
    </ul>
  </section>

  <section id="contact">
    <h2>Contact</h2>
    <p>Email: your.email@example.com</p>
    <p>LinkedIn: linkedin.com/in/yourprofile</p>
  </section>

  <footer>
    <p>&copy; 2025 Your Name</p>
  </footer>
</body>
</html>
          `,
          count: 0,
        },
        {
          title: "Task Tracker App",
          description: "Build a basic CRUD app to manage daily tasks.",
          tools: ['Node.js', 'Express', 'MongoDB', 'EJS'],
          difficulty: 'Intermediate',
          estimate_time: '4-5 days',
          file_structure: `
  /task-tracker
    ├── app.js
    ├── views/
    │   └── index.ejs
    ├── routes/
    │   └── tasks.js
    ├── public/
    │   └── style.css
    └── models/
        └── Task.js
          `,
          scope: 'A CRUD app to manage tasks with MongoDB as backend.',
          code: `const express = require('express'); const app = express(); app.listen(3000);`,
          count: 1,
        },
      ]
    },
];
