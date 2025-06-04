#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

console.log('🚀 Frontend Projects Hub - Development Server');
console.log('============================================\n');

// Check if serve is available
function checkServe() {
    return new Promise((resolve) => {
        exec('npx serve --version', (error) => {
            resolve(!error);
        });
    });
}

// Check if live-server is available
function checkLiveServer() {
    return new Promise((resolve) => {
        exec('npx live-server --version', (error) => {
            resolve(!error);
        });
    });
}

// Start development server
async function startServer() {
    console.log('🔍 Checking available servers...\n');
    
    const hasServe = await checkServe();
    const hasLiveServer = await checkLiveServer();
    
    if (hasLiveServer) {
        console.log('✅ Starting live-server (with auto-reload)...');
        console.log('📱 Your hub will open automatically in the browser');
        console.log('🔄 Files will auto-reload when changed\n');
        
        exec('npx live-server --port=8080 --open=/index.html', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Error starting live-server:', error);
                fallbackToServe();
            }
        });
    } else if (hasServe) {
        console.log('✅ Starting serve...');
        console.log('🌐 Open http://localhost:3000 in your browser\n');
        
        exec('npx serve -s . -l 3000', (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Error starting serve:', error);
                fallbackToPython();
            }
        });
    } else {
        fallbackToPython();
    }
}

// Fallback to Python's built-in server
function fallbackToPython() {
    console.log('⚡ Using Python built-in server...');
    console.log('🌐 Open http://localhost:8000 in your browser\n');
    
    exec('python3 -m http.server 8000', (error, stdout, stderr) => {
        if (error) {
            exec('python -m http.server 8000', (error2, stdout2, stderr2) => {
                if (error2) {
                    console.error('❌ No suitable server found. Please install Node.js or Python.');
                    process.exit(1);
                }
            });
        }
    });
}

// Display project info
function displayProjectInfo() {
    console.log('📊 Project Information:');
    console.log('======================');
    
    try {
        const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
        console.log(`📦 Name: ${packageJson.name}`);
        console.log(`📝 Version: ${packageJson.version}`);
        console.log(`📄 Description: ${packageJson.description}`);
    } catch (error) {
        console.log('📦 Static frontend project (no package.json)');
    }
    
    console.log('📁 Structure:');
    try {
        const items = fs.readdirSync('./');
        const projects = items.filter(item => {
            try {
                const stat = fs.statSync(item);
                return stat.isDirectory() && 
                       !item.startsWith('.') && 
                       item !== 'node_modules' &&
                       item !== 'scripts' &&
                       fs.existsSync(path.join(item, 'index.html'));
            } catch {
                return false;
            }
        });
        
        console.log(`   📄 Hub: index.html`);
        projects.forEach(project => {
            console.log(`   📁 Project: ${project}/`);
        });
        
        if (projects.length === 0) {
            console.log('   ⚠️  No projects found - add project folders with index.html files');
        }
    } catch (error) {
        console.log('   ❌ Error reading project structure');
    }
    
    console.log('\n💡 Tips:');
    console.log('   • Add new projects in subfolders with index.html files');
    console.log('   • Update projects.js to register new projects');
    console.log('   • Run "npm run validate" to check project structure');
    console.log('   • Press Ctrl+C to stop the server\n');
}

// Main execution
displayProjectInfo();
startServer();

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down development server...');
    process.exit(0);
});
