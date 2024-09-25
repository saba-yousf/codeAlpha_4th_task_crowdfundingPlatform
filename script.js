// Initialize an array to hold projects
let projects = [];

// Function to render projects on the page
function renderProjects() {
    const projectContainer = document.getElementById('projects');
    projectContainer.innerHTML = ''; // Clear previous content

    projects.forEach((project, index) => {
        // Create project element
        const projectElement = document.createElement('div');
        projectElement.classList.add('project');
        
        // Display project details
        projectElement.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Funding Goal:</strong> $${project.goal}</p>
            <p><strong>Amount Raised:</strong> $${project.raised}</p>
            
            <!-- Contribution section -->
            <input type="number" placeholder="Amount to contribute" id="contribution-${index}">
            <button onclick="contribute(${index})">Contribute</button>
            
            <!-- Project updates section -->
            <h4>Updates</h4>
            <ul id="updates-${index}">
                ${project.updates.map(update => `<li>${update}</li>`).join('')}
            </ul>
            
            <!-- Update form -->
            <input type="text" placeholder="Add a project update" id="update-${index}">
            <button onclick="addUpdate(${index})">Add Update</button>
        `;

        projectContainer.appendChild(projectElement);
    });
}

// Function to create a new project
document.getElementById('projectForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page

    // Get form values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const goal = parseFloat(document.getElementById('goal').value);

    // Create a new project object
    const newProject = {
        title: title,
        description: description,
        goal: goal,
        raised: 0, // Initial amount raised
        updates: [] // Array to store project updates
    };

    // Add the project to the projects array
    projects.push(newProject);

    // Reset the form
    document.getElementById('projectForm').reset();

    // Render the projects again
    renderProjects();
});

// Function to contribute to a project
function contribute(index) {
    const contributionInput = document.getElementById(`contribution-${index}`);
    const contributionAmount = parseFloat(contributionInput.value);

    if (contributionAmount > 0) {
        projects[index].raised += contributionAmount; // Update raised amount
        renderProjects(); // Re-render projects
    }
}

// Function to add a project update
function addUpdate(index) {
    const updateInput = document.getElementById(`update-${index}`);
    const updateText = updateInput.value;

    if (updateText) {
        projects[index].updates.push(updateText); // Add update to project
        renderProjects(); // Re-render projects
    }
}
