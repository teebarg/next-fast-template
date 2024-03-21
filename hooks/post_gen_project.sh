#!/bin/bash

echo "Installing dependencies..."
cd {{ cookiecutter.project_slug }}
conda create -n {{ cookiecutter.project_slug }} python=3.11
conda activate {{ cookiecutter.project_slug }}

cd backend
pip install -r requirements.txt

cd ../frontend
npm install