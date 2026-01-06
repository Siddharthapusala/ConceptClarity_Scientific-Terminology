@echo off
cd /d "C:\Users\Pusala Siddhartha\OneDrive\Desktop\ConceptClarity-infosys_project\backend"
"C:\Program Files\PostgreSQL\18\pgAdmin 4\python\python.exe" -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000