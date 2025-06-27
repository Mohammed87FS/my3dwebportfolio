export const mobileWelcome = `
<div class="mobile-welcome">
  <h1>Welcome!</h1>
  <p>I'm Mohammed Alhamadani, a Creative Computing student passionate about web development and 3D design.</p>
  <div class="welcome-features">
    <div class="feature">Student at FH St. Pölten</div>
    <div class="feature">Web Developer</div>
    <div class="feature">3D Designer</div>
  </div>
</div>
`;

export const mobileAbout = `
<div class="mobile-content">
  <h1>About Me</h1>
  <div class="info-grid">
    <div class="info-card">
      <h3>Personal</h3>
      <p><strong>Name:</strong> Mohammed Alhamadani</p>
      <p><strong>Study:</strong> Creative Computing</p>
      <p><strong>Location:</strong> FH St. Pölten</p>
    </div>
    
    <div class="info-card">
      <h3>🌍 Languages</h3>
      <ul>
        <li>German</li>
        <li>English</li>
        <li>Arabic</li>
      </ul>
    </div>
    
    <div class="info-card">
      <h3>Interests</h3>
      <ul>
        <li>Technology</li>
        <li>Mathematics</li>
        <li>Art & Design</li>
        <li>Music</li>
        <li>Board Games</li>
      </ul>
    </div>
  </div>
</div>
`;

export const mobileSkills = `
<div class="mobile-content">
  <h1>My Skills</h1>
  <div class="skills-container">
    
    <div class="skill-category">
      <h3>Frontend Development</h3>
      <div class="skill-tags">
        <span class="skill-tag">JavaScript</span>
        <span class="skill-tag">Vue.js</span>
        <span class="skill-tag">React</span>
        <span class="skill-tag">SvelteKit</span>
        <span class="skill-tag">Three.js</span>
        <span class="skill-tag">HTML/CSS</span>
      </div>
    </div>
    
    <div class="skill-category">
      <h3>Backend Development</h3>
      <div class="skill-tags">
        <span class="skill-tag">Node.js</span>
        <span class="skill-tag">PHP</span>
        <span class="skill-tag">Laravel</span>
        <span class="skill-tag">Python</span>
        <span class="skill-tag">Java</span>
      </div>
    </div>
    
    <div class="skill-category">
      <h3>Design & Tools</h3>
      <div class="skill-tags">
        <span class="skill-tag">UI/UX Design</span>
        <span class="skill-tag">3D Modeling</span>
        <span class="skill-tag">Git</span>
        <span class="skill-tag">Figma</span>
      </div>
    </div>
    
    <div class="skill-category">
      <h3>🔬 Other Technologies</h3>
      <div class="skill-tags">
        <span class="skill-tag">Machine Learning</span>
        <span class="skill-tag">WebGL</span>
        <span class="skill-tag">REST APIs</span>
        <span class="skill-tag">Agile</span>
      </div>
    </div>
    
  </div>
</div>
`;

export const mobileProjects = `
<div class="mobile-content">
  <h1>My Projects</h1>
  <div class="projects-grid">
    
    <div class="project-card" data-project="fortress">
      <div class="project-header">
        <h3>🏰 Code Fortress</h3>
        <span class="project-type">Learning Platform</span>
      </div>
      <p>Interactive coding learning platform with gamification elements.</p>
      <div class="project-tech">
        <span class="tech-tag">Vue.js</span>
        <span class="tech-tag">Node.js</span>
      </div>
    </div>
    
    <div class="project-card" data-project="commerce">
      <div class="project-header">
        <h3>🛒 E-Commerce</h3>
        <span class="project-type">Web Application</span>
      </div>
      <p>Full-stack e-commerce solution with modern design and functionality.</p>
      <div class="project-tech">
        <span class="tech-tag">React</span>
        <span class="tech-tag">Laravel</span>
      </div>
    </div>
    
    <div class="project-card" data-project="gym">
      <div class="project-header">
        <h3>💪 MyGymBro</h3>
        <span class="project-type">Fitness App</span>
      </div>
      <p>Personal trainer and workout tracking application.</p>
      <div class="project-tech">
        <span class="tech-tag">React Native</span>
        <span class="tech-tag">Firebase</span>
      </div>
    </div>
    
    <div class="project-card" data-project="math">
      <div class="project-header">
        <h3>🧮 Mathemello</h3>
        <span class="project-type">Educational Tool</span>
      </div>
      <p>Interactive mathematics learning platform for students.</p>
      <div class="project-tech">
        <span class="tech-tag">JavaScript</span>
        <span class="tech-tag">Three.js</span>
      </div>
    </div>
    
    <div class="project-card" data-project="disconnect">
      <div class="project-header">
        <h3>🔌 Disconnect</h3>
        <span class="project-type">Social App</span>
      </div>
      <p>Digital wellness app promoting healthy technology usage.</p>
      <div class="project-tech">
        <span class="tech-tag">Vue.js</span>
        <span class="tech-tag">PWA</span>
      </div>
    </div>
    
    <div class="project-card" data-project="rosetta">
      <div class="project-header">
        <h3>🗿 Rosetta</h3>
        <span class="project-type">Language Tool</span>
      </div>
      <p>Modern language learning platform with AI integration.</p>
      <div class="project-tech">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">ML</span>
      </div>
    </div>
    
  </div>
</div>
`;

export const mobileProjectDetails = {
  fortress: `
    <div class="project-detail">
      <button class="back-btn" onclick="showProjects()">← Back to Projects</button>
      <h1>🏰 Code Fortress</h1>
      <div class="project-images">
        <img src="/for1.gif" alt="Code Fortress Demo" />
      </div>
      <p>An interactive learning platform that gamifies coding education. Features include progress tracking, coding challenges, and community features.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>Interactive coding challenges</li>
        <li>Progress tracking system</li>
        <li>Community features</li>
        <li>Real-time code execution</li>
      </ul>
      <div class="project-tech">
        <span class="tech-tag">Vue.js</span>
        <span class="tech-tag">Node.js</span>
        <span class="tech-tag">Socket.io</span>
      </div>
    </div>
  `,

  commerce: `
    <div class="project-detail">
      <button class="back-btn" onclick="showProjects()">← Back to Projects</button>
      <h1>🛒 E-Commerce Platform</h1>
      <div class="project-images">
        <img src="/commerce.jpg" alt="E-Commerce Platform" />
      </div>
      <p>A comprehensive e-commerce solution with modern design, secure payments, and admin dashboard.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>Product catalog management</li>
        <li>Secure payment processing</li>
        <li>Order tracking system</li>
        <li>Admin dashboard</li>
      </ul>
      <div class="project-tech">
        <span class="tech-tag">React</span>
        <span class="tech-tag">Laravel</span>
        <span class="tech-tag">MySQL</span>
      </div>
    </div>
  `,

  gym: `
    <div class="project-detail">
      <button class="back-btn" onclick="showProjects()">← Back to Projects</button>
      <h1>💪 MyGymBro</h1>
      <div class="project-images">
        <img src="/mygym.png" alt="MyGymBro App" />
      </div>
      <p>Personal fitness companion app with workout tracking, progress monitoring, and personalized training plans.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>Workout tracking</li>
        <li>Progress analytics</li>
        <li>Custom training plans</li>
        <li>Social features</li>
      </ul>
      <div class="project-tech">
        <span class="tech-tag">React Native</span>
        <span class="tech-tag">Firebase</span>
        <span class="tech-tag">Chart.js</span>
      </div>
    </div>
  `,

  math: `
    <div class="project-detail">
      <button class="back-btn" onclick="showProjects()">← Back to Projects</button>
      <h1>🧮 Mathemello</h1>
      <div class="project-images">
        <img src="/mathemello.png" alt="Mathemello Platform" />
      </div>
      <p>Interactive mathematics learning platform making complex concepts accessible through visualization and gamification.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>3D mathematical visualizations</li>
        <li>Interactive problem solving</li>
        <li>Progress tracking</li>
        <li>Adaptive learning system</li>
      </ul>
      <div class="project-tech">
        <span class="tech-tag">JavaScript</span>
        <span class="tech-tag">Three.js</span>
        <span class="tech-tag">Node.js</span>
      </div>
    </div>
  `,

  disconnect: `
    <div class="project-detail">
      <button class="back-btn" onclick="showProjects()">← Back to Projects</button>
      <h1>🔌 Disconnect</h1>
      <div class="project-images">
        <img src="/disconnect.png" alt="Disconnect App" />
      </div>
      <p>Digital wellness application promoting healthy technology usage habits through mindful design and usage tracking.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>Screen time tracking</li>
        <li>Mindfulness reminders</li>
        <li>App usage analytics</li>
        <li>Digital detox challenges</li>
      </ul>
      <div class="project-tech">
        <span class="tech-tag">Vue.js</span>
        <span class="tech-tag">PWA</span>
        <span class="tech-tag">Service Workers</span>
      </div>
    </div>
  `,

  rosetta: `
    <div class="project-detail">
      <button class="back-btn" onclick="showProjects()">← Back to Projects</button>
      <h1>🗿 Rosetta</h1>
      <div class="project-images">
        <img src="/rosetta.png" alt="Rosetta Language Platform" />
      </div>
      <p>Modern language learning platform leveraging AI for personalized learning experiences and natural conversation practice.</p>
      <h3>Key Features:</h3>
      <ul>
        <li>AI-powered conversations</li>
        <li>Personalized learning paths</li>
        <li>Speech recognition</li>
        <li>Cultural context integration</li>
      </ul>
      <div class="project-tech">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">Machine Learning</span>
        <span class="tech-tag">React</span>
      </div>
    </div>
  `,
};
