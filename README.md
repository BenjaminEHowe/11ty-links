# 11ty Links

[![11ty Badge](https://img.shields.io/badge/Eleventy-222?logo=eleventy&logoColor=fff&style=flat)](https://www.11ty.dev/)

This repository contains a self-hosted [Linktree](https://linktr.ee/)-style website.

## Local Development

The easiest way to develop locally is using [Docker Desktop](https://www.docker.com/products/docker-desktop/) (other container engines are available).

- Windows (cmd): `docker run -it --rm -v %cd%:/app -w /app -p 127.0.0.1:8080:8080 node:20.15.1 sh -c "cd /app && npm install && npx @11ty/eleventy --serve"`
- macOS & Linux (bash): `docker run -it --rm -v "$PWD":/app -w /app -p 127.0.0.1:8080:8080 node:20.15.1 sh -c "cd /app && npm install && npx @11ty/eleventy --serve"`

Once the development server is running, the website will be available at http://localhost:8080/.
