# Rate Limiter using Node Express and node-redis client

The project implements a simple rate limiting algorithm, including a config portal that allows users to view and modify rate limiting configurations. It uses **Redis**.

## Features
- View and update **Bucket Size** and **Refill Rate** for the rate limiter.
- Store configuration in **Redis**.
- A config portal for managing configurations.
  ![image](https://github.com/user-attachments/assets/440d2793-8c2e-445b-9510-fdbc17ed472e)
- Supports Token Bucket algorithm for now (https://redis.io/glossary/rate-limiting/). More to come.



## Workflow

Each request takes a token. If enough tokens are available, user request is served. The below is a snapshot of the view rendered when the request is successful.
![image](https://github.com/user-attachments/assets/36a428c4-3256-4feb-8824-6c7edc64b1be)

Otherwise, they get the status of 429. The below is a snapshot of the view rendered when the rate limit is exceeded.
![image](https://github.com/user-attachments/assets/980ee1ff-7dab-4c8e-86e8-84ee5430e598)

## Setup Instructions

### Prerequisites

1. Install **Node.js** 
2. Install **Redis** 


### 1. Clone the repository

```bash
git clone https://github.com/MadHatter01/Rate-Limiter.git
cd Rate-Limiter
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up a `.env` file to configure environment variables like Redis host and port.
```bash
REDIS_HOST=localhost
REDIS_PORT=6379
PORT=3000
```

### 4.Run the config portal as well as the server.
```bash
node .\configPortal.js
node .\server.js
```











