const fs = require('fs');
const path = require('path');

/**
 * Validates and discovers projects in the workspace
 */
class ProjectValidator {
    constructor(rootDir = './') {
        this.rootDir = rootDir;
        this.requiredFiles = ['index.html'];
        this.optionalFiles = ['README.md', 'package.json'];
    }

    /**
     * Discovers all potential project directories
     */
    discoverProjects() {
        const projects = [];
        const items = fs.readdirSync(this.rootDir, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory() && !this.isSystemDirectory(item.name)) {
                const projectPath = path.join(this.rootDir, item.name);
                const projectInfo = this.validateProject(projectPath, item.name);
                
                if (projectInfo.isValid) {
                    projects.push(projectInfo);
                }
            }
        }

        return projects;
    }

    /**
     * Validates a single project directory
     */
    validateProject(projectPath, projectName) {
        const result = {
            name: projectName,
            path: projectPath,
            isValid: false,
            files: [],
            missingFiles: [],
            hasReadme: false,
            hasPackageJson: false,
            errors: []
        };

        try {
            const files = fs.readdirSync(projectPath);
            result.files = files;

            // Check for required files
            for (const requiredFile of this.requiredFiles) {
                if (files.includes(requiredFile)) {
                    result.isValid = true;
                } else {
                    result.missingFiles.push(requiredFile);
                }
            }

            // Check for optional files
            result.hasReadme = files.includes('README.md');
            result.hasPackageJson = files.includes('package.json');

            // Validate index.html content
            if (files.includes('index.html')) {
                this.validateIndexHtml(path.join(projectPath, 'index.html'), result);
            }

        } catch (error) {
            result.errors.push(`Error reading directory: ${error.message}`);
        }

        return result;
    }

    /**
     * Validates the content of an index.html file
     */
    validateIndexHtml(indexPath, result) {
        try {
            const content = fs.readFileSync(indexPath, 'utf-8');
            
            // Basic HTML validation
            if (!content.includes('<!DOCTYPE html>')) {
                result.errors.push('Missing DOCTYPE declaration');
            }
            
            if (!content.includes('<title>')) {
                result.errors.push('Missing title tag');
            }
            
            if (!content.includes('<meta name="viewport"')) {
                result.errors.push('Missing viewport meta tag (not mobile-friendly)');
            }

            // Extract title
            const titleMatch = content.match(/<title>(.*?)<\/title>/i);
            if (titleMatch) {
                result.title = titleMatch[1];
            }

        } catch (error) {
            result.errors.push(`Error reading index.html: ${error.message}`);
        }
    }

    /**
     * Checks if a directory should be ignored
     */
    isSystemDirectory(dirName) {
        const systemDirs = [
            '.git', '.github', 'node_modules', '.vscode', '.idea',
            'dist', 'build', 'temp', 'tmp', '.cache'
        ];
        return systemDirs.includes(dirName) || dirName.startsWith('.');
    }

    /**
     * Generates a project configuration for projects.js
     */
    generateProjectConfig(projects) {
        const configs = projects.map(project => {
            return {
                id: project.name,
                title: project.title || this.formatTitle(project.name),
                description: `A ${project.name} project - add description in projects.js`,
                image: `https://via.placeholder.com/400x300?text=${encodeURIComponent(project.title || project.name)}`,
                technologies: this.detectTechnologies(project),
                liveUrl: `./${project.name}/index.html`,
                githubUrl: '#',
                featured: false,
                category: 'Web Application'
            };
        });

        return configs;
    }

    /**
     * Detects technologies used in a project
     */
    detectTechnologies(project) {
        const technologies = ['HTML5']; // All projects have HTML
        
        if (project.files.includes('style.css') || project.files.some(f => f.endsWith('.css'))) {
            technologies.push('CSS3');
        }
        
        if (project.files.includes('script.js') || project.files.some(f => f.endsWith('.js'))) {
            technologies.push('JavaScript');
        }
        
        if (project.hasPackageJson) {
            technologies.push('Node.js');
        }

        return technologies;
    }

    /**
     * Formats a directory name into a readable title
     */
    formatTitle(name) {
        return name
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Runs the validation and prints results
     */
    run() {
        console.log('🔍 Discovering projects...\n');
        
        const projects = this.discoverProjects();
        
        if (projects.length === 0) {
            console.log('❌ No valid projects found.');
            console.log('Make sure your project directories contain an index.html file.\n');
            return;
        }

        console.log(`✅ Found ${projects.length} valid project(s):\n`);
        
        projects.forEach(project => {
            console.log(`📁 ${project.name}`);
            console.log(`   Path: ${project.path}`);
            console.log(`   Title: ${project.title || 'Not specified'}`);
            console.log(`   Files: ${project.files.length} files`);
            console.log(`   Technologies: ${this.detectTechnologies(project).join(', ')}`);
            
            if (project.errors.length > 0) {
                console.log(`   ⚠️  Warnings: ${project.errors.join(', ')}`);
            }
            
            console.log('');
        });

        // Generate project configuration
        console.log('📝 Generated project configuration:');
        console.log('Add this to your projects.js file:\n');
        
        const configs = this.generateProjectConfig(projects);
        console.log('const projects = [');
        configs.forEach((config, index) => {
            console.log('    {');
            Object.entries(config).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    console.log(`        ${key}: [${value.map(v => `'${v}'`).join(', ')}],`);
                } else if (typeof value === 'string') {
                    console.log(`        ${key}: '${value}',`);
                } else {
                    console.log(`        ${key}: ${value},`);
                }
            });
            console.log('    }' + (index < configs.length - 1 ? ',' : ''));
        });
        console.log('];');
    }
}

// Run if called directly
if (require.main === module) {
    const validator = new ProjectValidator();
    validator.run();
}

module.exports = ProjectValidator;
