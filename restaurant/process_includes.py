#!/usr/bin/env python3

import os
import re
import shutil

def process_includes(input_file, output_file):
    with open(input_file, 'r') as f:
        content = f.read()
    
    # Find all include directives
    include_pattern = r'<!--#include file="([^"]+)" -->'
    matches = re.finditer(include_pattern, content)
    
    for match in matches:
        include_directive = match.group(0)
        include_file = match.group(1)
        
        try:
            with open(include_file, 'r') as f:
                include_content = f.read()
            content = content.replace(include_directive, include_content)
        except FileNotFoundError:
            print(f"Warning: Included file '{include_file}' not found!")
    
    with open(output_file, 'w') as f:
        f.write(content)

# Process index.html
process_includes('index.html', 'index_processed.html')

print("Processing complete. Generated index_processed.html")
