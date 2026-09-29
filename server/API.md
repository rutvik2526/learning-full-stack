# Task API

Base URL:

http://localhost:5000

## 1. Health Check

### GET /health

Checks whether the server is running.

### Response

Status: `200 OK`

```json
{
  "status": "ok",
  "message": "Server is running"
}