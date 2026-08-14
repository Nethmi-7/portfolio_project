// Fetch the dynamic data from data.json
fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // 1. Fill in Intro Section
    document.getElementById('user-name').textContent = data.name;
    document.getElementById('user-tagline').textContent = data.title;
    document.getElementById('user-summary').textContent = data.bio;

    // 2. Fill in About Section
    document.getElementById('about-text').textContent = data.about;

    // 3. Render Skills as List Items
    const skillsList = document.getElementById('skills-list');
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.className = 'skill-tag';
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    // 4. Render Project Cards
    const projectsList = document.getElementById('projects-list');
    data.projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <span class="tech-tag">${project.tech}</span>
        <div class="project-links">
          <a href="${project.link}" target="_blank" rel="noopener noreferrer">View Project &rarr;</a>
        </div>
      `;
      projectsList.appendChild(card);
    });

    // 5. Populate Contact Links
    const contactInfo = document.getElementById('contact-info');
    contactInfo.innerHTML = `
      <a href="mailto:${data.socials.email}" class="contact-link">Email</a>
      <a href="${data.socials.github}" target="_blank" rel="noopener noreferrer" class="contact-link">GitHub</a>
      <a href="${data.socials.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link">LinkedIn</a>
    `;

    // 6. Update Footer
    document.getElementById('footer-name').textContent = data.name;
    document.getElementById('footer-year').textContent = new Date().getFullYear();
  })
  .catch(error => {
    console.error('Error loading data.json:', error);
  });