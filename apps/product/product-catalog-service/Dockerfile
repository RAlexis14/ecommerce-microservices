# Dockerfile for product-catalog-service

FROM python:3.11-slim

WORKDIR /app

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 5001

CMD ["python", "run.py"]
