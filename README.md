# 11ty Links

[![11ty Badge](https://img.shields.io/badge/Eleventy-222?logo=eleventy&logoColor=fff&style=flat)](https://www.11ty.dev/)
[![Cloudflare Pages Badge](https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflarepages&logoColor=fff&style=flat)](https://pages.cloudflare.com/)
[![GitHub Actions Badge](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=flat)](https://github.com/features/actions)

This repository contains a self-hosted [Linktree](https://linktr.ee/)-style website.
It is deployed to https://11ty-links.pages.dev/.
We deploy using GitHub Actions as opposed to the [native Cloudflare Pages git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) so that the build settings are captured within the `git` repository, and so that we can use the same container images for local development.

## Local Development

The easiest way to develop locally is using [Docker Desktop](https://www.docker.com/products/docker-desktop/) (other container engines are available).

- Windows (cmd): `docker run -it --rm -v %cd%:/app -w /app -p 127.0.0.1:8080:8080 node:20.15.1 sh -c "cd /app && npm install && npx @11ty/eleventy --serve"`
- macOS & Linux (bash): `docker run -it --rm -v "$PWD":/app -w /app -p 127.0.0.1:8080:8080 node:20.15.1 sh -c "cd /app && npm install && npx @11ty/eleventy --serve"`

Once the development server is running, the website will be available at http://localhost:8080/.

## Cloudflare Pages environment variables

The contact form requires a few environemnt variables to be populated:
- `EMAIL_FROM` -- the email address that contact form submissions should be sent from
- `EMAIL_TO` -- the email address that contact form submissions should be sent to
- `RESEND_KEY` -- an API key for [Resend](https://resend.com/)
