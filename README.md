# Frontend Projects Hub

A curated collection of frontend projects and web applications, designed to showcase modern web development skills and serve as a central portfolio hub.

## 🌟 Live Demo

Visit the live hub: [Frontend Projects Hub](https://your-username.github.io/ui-projects)

## 🚀 Features

- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Project Showcase**: Organized display of all frontend projects
- **GitHub Pages Ready**: Configured for easy deployment as a GitHub Pages site
- **Modular Structure**: Each project lives in its own subfolder
- **Auto-Discovery**: Smart project detection and categorization
- **Responsive Layout**: Works perfectly on all devices

## 📁 Project Structure

```
ui-projects/
├── index.html              # Main hub page
├── projects.js             # Project configuration and logic
├── README.md              # This file
├── restaurant/            # Restaurant website project
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── ...
└── [future-projects]/     # Add your projects here
    ├── index.html
    └── ...
```

## 🛠️ Adding New Projects

1. **Create a new folder** for your project in the root directory
2. **Add your project files** (ensure there's an `index.html` file)
3. **Update the projects array** in `projects.js`:

```javascript
const projects = [
    // ...existing projects,
    {
        id: 'your-project-name',
        title: 'Your Project Title',
        description: 'Brief description of your project',
        image: 'path/to/project/image.jpg',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        liveUrl: './your-project-folder/index.html',
        githubUrl: '#',
        featured: true,
        category: 'Web Application'
    }
];
```

## 🎨 Current Projects

### 🍽️ Restaurant Website
- **Path**: `./restaurant/`
- **Tech Stack**: HTML5, CSS3, JavaScript, Tailwind CSS
- **Features**: Responsive design, modular components, interactive elements
- **Live Demo**: [View Project](./restaurant/index.html)

## 🚀 Deployment

### GitHub Pages Setup

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save

3. **Access your site**:
   Your hub will be available at: `https://your-username.github.io/ui-projects`

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/ui-projects.git

# Navigate to the project
cd ui-projects

# Serve locally (using any static server)
python -m http.server 8000
# or
npx serve .
# or
live-server .
```

## 🎯 Customization

### Updating the Hub
- Modify `index.html` for layout changes
- Update `projects.js` for project data
- Customize colors and styling in the CSS section

### Project Categories
Projects are automatically categorized. Current categories:
- Web Applications
- E-commerce
- Restaurant & Hospitality
- Portfolio Sites
- Landing Pages
- Interactive Demos

## 📱 Responsive Design

The hub is fully responsive and tested on:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-project`)
3. Add your project in a new subfolder
4. Update the projects configuration
5. Commit your changes (`git commit -am 'Add new project'`)
6. Push to the branch (`git push origin feature/new-project`)
7. Create a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Portfolio**: [Your Portfolio URL]
- **GitHub**: [@your-username](https://github.com/your-username)
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn Profile]

---

⭐ **Star this repository** if you find it helpful!