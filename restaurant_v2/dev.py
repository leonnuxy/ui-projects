#!/usr/bin/env python3
"""
Development server and build script for the restaurant website.
Provides commands for building and serving the site locally.
"""

import http.server
import socketserver
import webbrowser
import sys
import os
from pathlib import Path
import subprocess

def build():
    """Build the site from sections."""
    try:
        result = subprocess.run([sys.executable, 'build.py'], 
                              capture_output=True, text=True, check=True)
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Build failed: {e.stderr}")
        return False

def serve(port=8000):
    """Serve the built site locally."""
    if not Path('index_built.html').exists():
        print("⚠️  Built site not found. Building first...")
        if not build():
            return
    
    try:
        handler = http.server.SimpleHTTPRequestHandler
        with socketserver.TCPServer(("", port), handler) as httpd:
            print(f"🚀 Serving at http://localhost:{port}")
            print(f"📱 View the site: http://localhost:{port}/index_built.html")
            print("⏹️  Press Ctrl+C to stop the server")
            
            # Try to open browser
            try:
                webbrowser.open(f'http://localhost:{port}/index_built.html')
            except:
                pass
                
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Server stopped")
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"❌ Port {port} is already in use. Try a different port:")
            print(f"   python dev.py serve --port 8001")
        else:
            print(f"❌ Error starting server: {e}")

def watch():
    """Watch sections for changes and rebuild automatically."""
    print("👀 Watching sections for changes...")
    print("⚠️  This is a simple implementation - for production use a proper file watcher")
    
    sections_dir = Path('sections')
    last_modified = {}
    
    # Initial build
    build()
    
    try:
        while True:
            changed = False
            for section_file in sections_dir.glob('*.html'):
                current_modified = section_file.stat().st_mtime
                if section_file not in last_modified or last_modified[section_file] != current_modified:
                    print(f"🔄 {section_file.name} changed, rebuilding...")
                    last_modified[section_file] = current_modified
                    changed = True
            
            if changed:
                build()
            
            import time
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n👋 Stopped watching")

def usage():
    """Print usage information."""
    print("""
🏗️  Restaurant Website Development Tool

Usage:
    python dev.py build                 # Build the site from sections
    python dev.py serve [--port 8000]  # Serve the site locally
    python dev.py watch                 # Watch for changes and rebuild
    python dev.py help                  # Show this help

Commands:
    build   - Combine all section files into index_built.html
    serve   - Start a local development server
    watch   - Watch sections for changes and auto-rebuild
    help    - Show this usage information
""")

if __name__ == "__main__":
    # Change to script directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    if len(sys.argv) < 2:
        usage()
        sys.exit(1)
    
    command = sys.argv[1].lower()
    
    if command == 'build':
        build()
    elif command == 'serve':
        port = 8000
        if '--port' in sys.argv:
            try:
                port_idx = sys.argv.index('--port') + 1
                port = int(sys.argv[port_idx])
            except (IndexError, ValueError):
                print("❌ Invalid port number")
                sys.exit(1)
        serve(port)
    elif command == 'watch':
        watch()
    elif command in ['help', '-h', '--help']:
        usage()
    else:
        print(f"❌ Unknown command: {command}")
        usage()
        sys.exit(1)
