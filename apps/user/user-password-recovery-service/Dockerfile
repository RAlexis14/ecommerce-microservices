# Dockerfile

FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy application code1
COPY . .

# Expose Flask default port
EXPOSE 5000

# Run the Flask app
CMD ["python", "run.py"]
