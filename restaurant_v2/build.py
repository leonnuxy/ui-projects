#!/usr/bin/env python3
"""
Build script for assembling modular HTML sections into the main index.html file.
This script reads individual section files and combines them into a complete HTML document.
"""

import os
from pathlib import Path

def read_section(section_name):
    """Read a section file and return its content."""
    section_path = Path("sections") / f"{section_name}.html"
    if section_path.exists():
        with open(section_path, 'r', encoding='utf-8') as f:
            return f.read()
    else:
        print(f"Warning: Section file {section_path} not found")
        return ""

def build_index():
    """Build the complete index.html from sections."""
    
    # HTML template structure
    html_template = '''<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bistro Luxe - Fine Dining Experience</title>
    <link rel="icon" type="image/x-icon" href="data:image/x-icon;base64," />
    
    <!-- External Stylesheets -->
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script src="tailwind.config.js"></script>
    <style>
      .golden-gradient {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
      }
      .dark-gradient {
        background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #0f172a 100%);
      }
      .card-glass {
        background: rgba(37, 35, 29, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(251, 191, 36, 0.2);
      }
      .btn-gold {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        transition: all 0.3s ease;
      }
      .btn-gold:hover {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        transform: translateY(-2px);
        box-shadow: 0 10px 25px -5px rgba(251, 191, 36, 0.4);
      }
      .btn-outline-gold {
        border: 2px solid #fbbf24;
        background: transparent;
        transition: all 0.3s ease;
      }
      .btn-outline-gold:hover {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        color: #171612;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px -5px rgba(251, 191, 36, 0.4);
      }
      .text-shadow {
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }
      .hover-lift {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .hover-lift:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
      }
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px rgba(251, 191, 36, 0.3); }
        50% { box-shadow: 0 0 30px rgba(251, 191, 36, 0.6); }
      }
      .animate-glow {
        animation: glow 2s infinite;
      }
    </style>
  </head>
  <body class="dark-gradient min-h-screen font-body">
    <div class="layout-container flex h-full grow flex-col">
      <div class="flex flex-col">
        {header}
        {hero}
        {menu}
        {private_dining}
        {events}
        {about}
      </div>
    </div>
    
    <!-- CTA Section - Full Width at Bottom -->
    {cta}
    
    <!-- Main JavaScript Module -->
    <script src="script.js"></script>
  </body>
</html>'''

    # Read all sections
    sections = {
        'header': read_section('header'),
        'hero': read_section('hero'),
        'menu': read_section('menu'),
        'private_dining': read_section('private-dining'),
        'events': read_section('events'),
        'about': read_section('about'),
        'cta': read_section('cta')
    }
    
    # Build the complete HTML - use string replacement instead of format to avoid CSS issues
    complete_html = html_template
    for section_name, section_content in sections.items():
        complete_html = complete_html.replace(f'{{{section_name}}}', section_content)
    
    # Write to index.html
    with open('index_built.html', 'w', encoding='utf-8') as f:
        f.write(complete_html)
    
    print("✅ Successfully built index_built.html from modular sections!")
    print("📁 Sections included:")
    for section_name in sections.keys():
        print(f"   - {section_name}.html")

if __name__ == "__main__":
    # Change to the script's directory
    script_dir = Path(__file__).parent
    os.chdir(script_dir)
    
    build_index()
