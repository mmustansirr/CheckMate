#!/bin/bash

# Build script for Render.com deployment
echo "Starting build process..."

# Check Python version
echo "Python version:"
python --version

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies with specific versions for compatibility
echo "Installing dependencies..."
pip install --no-cache-dir -r requirements.txt

echo "Build completed successfully!"
