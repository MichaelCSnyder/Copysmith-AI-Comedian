# Copysmith-AI-Comedian

## Instructions

1. Fork and clone repo
2. Add a valid OpenAI API key to the `.env` file in the root directory
    - My code appears to expire relatively quickly
3. In the terminal, run `docker compose -f docker-compose.dev.yml up --build`
4. After containers are spun up, navigate to localhost:8080

## Notes

-   Due to time constraints, I didn't have time to implement a more sleek design
-   For the same reason, I wasn't able to containerize a local RDB instance or something similar
    -   As a result, I had to expose my DB credentials to you fellas within the `.env` file. Obviously this is bad practice but I had to make due.
