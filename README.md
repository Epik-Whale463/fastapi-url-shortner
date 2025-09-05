# URL Shortener

A full-stack URL shortener application built with FastAPI backend and Next.js frontend, deployed on Google Cloud.

## 🚀 Live Demo

- **Frontend**: [http://34.60.234.84:3000/](http://34.60.234.84:3000/)
- **Backend API**: [http://34.60.234.84:8000/](http://34.60.234.84:8000/)
- **API Documentation**: [http://34.60.234.84:8000/docs](http://34.60.234.84:8000/docs)

## 🛠 Tech Stack

### Backend

- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI web server
- **SQLite** - Database (can be easily switched to PostgreSQL)

### Frontend

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript/JavaScript** - Type-safe development

### DevOps & Deployment

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Google Cloud Compute Engine** - Cloud hosting
- **GitHub** - Version control and CI/CD

## ✨ Features

- **Custom Short Codes**: Users can specify their own 6-letter short codes
- **Random Generation**: Automatic generation if no custom code provided
- **Uniqueness Validation**: Ensures no duplicate short codes
- **Modern UI**: Clean, responsive design with yellow/red accent colors
- **RESTful API**: Well-documented API endpoints
- **Containerized**: Easy deployment with Docker
- **Testing**: Automated tests with pytest
- **Type Safety**: Full type annotations and validation

## Project Structure

```text
├── app/
│   ├── __init__.py
│   ├── main.py            # FastAPI app entry point
│   ├── models.py          # SQLAlchemy models
│   ├── schemas.py         # Pydantic schemas for request/response
│   ├── crud.py            # DB operations (CRUD logic)
│   ├── database.py        # DB connection/session management
│   ├── api/
│   │   ├── __init__.py
│   │   └── routes.py      # API route definitions
│   └── utils.py           # Utility functions (e.g., code generation)
├── tests/
│   ├── __init__.py
│   └── test_main.py       # Unit/integration tests
├── alembic/               # (Optional) For DB migrations
├── requirements.txt
├── README.md
└── .env                   # Environment variables (DB URL, secrets)
```

## Postman API Testing

### Shorten URL Endpoint

- **URL:** `http://34.60.234.84:8000/shorten_url`
- **Method:** `POST`
- **Request Body (raw JSON):**

    ```json
    {
        "original_url": "https://www.youtube.com/watch?v=AACOcpA8i-U&list=RDAACOcpA8i-U&start_radio=1",
        "short_code": "CUSTOM" 
    }
    ``` text
    *Note: `short_code` is optional. If not provided, a random 6-letter code will be generated.*

- **Sample Response:**

    ```json
    {
        "id": 1,
        "original_url": "https://www.youtube.com/watch?v=AACOcpA8i-U&list=RDAACOcpA8i-U&start_radio=1",
        "short_code": "CUSTOM",
        "created_at": "2025-09-05T10:51:28.828673"
    }
    ```

### URL Redirection

- **Test redirection:**  
    Visit: `http://34.60.234.84:8000/CUSTOM` (redirects to original URL)

## 🏗 Local Development

### Prerequisites

- Docker and Docker Compose
- Git

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Epik-Whale463/fastapi-url-shortner.git
   cd fastapi-url-shortner
   ```

2. **Build and run with Docker:**

   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`

### Running Tests

```bash
# Install dependencies
pip install pytest

# Run tests
python -m pytest
```

## 🌐 Deployment

The application is deployed on Google Cloud Compute Engine using Docker containers.

### Deployment Steps

1. Create a Google Cloud VM instance
2. Install Docker and Docker Compose
3. Clone the repository
4. Configure firewall rules for ports 3000 and 8000
5. Run with `docker-compose up --build`
