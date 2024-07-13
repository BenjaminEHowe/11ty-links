# Eleventy (11ty) Links

[![Eleventy Badge](https://img.shields.io/badge/Eleventy-222?logo=eleventy&logoColor=fff&style=flat)](https://www.11ty.dev/)
[![Cloudflare Pages Badge](https://img.shields.io/badge/Cloudflare%20Pages-F38020?logo=cloudflarepages&logoColor=fff&style=flat)](https://pages.cloudflare.com/)
[![GitHub Actions Badge](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=flat)](https://github.com/features/actions)

This repository contains a self-hosted [Linktree](https://linktr.ee/)-style website.
It is deployed to https://11ty-links.pages.dev/.
We [deploy using GitHub Actions](/.github/workflows/deploy-cloudflare.yaml) as opposed to the [native Cloudflare Pages git integration](https://developers.cloudflare.com/pages/get-started/git-integration/) so that the build settings are captured within the `git` repository, and so that we can use the same container images for local development.

To create your own version of this website:
- [ ] Create a new Cloudflare Pages project. Select the option to create using direct upload, but do not upload any files yet (we will upload files automatically using GitHub Actions).
- [ ] Navigate to the list of your Workers & Pages projects, and select the newly created project. Under settings, set the following environment variables:
  - `RESEND_KEY`: an API key for [Resend](https://resend.com/).
  - `EMAIL_FROM`: the email address that contact form submissions should be sent from (the sending domain will need to be [registered with and verified by Resend](https://resend.com/docs/dashboard/domains/introduction)).
  - `EMAIL_TO`: the email address that contact form submissions should be sent to.
- [ ] Create a new GitHub repository [using this one as a template](https://github.com/new?template_name=11ty-links&template_owner=BenjaminEHowe).
- [ ] [Set GitHub Actions secrets and variables for this repository](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository):
  - Secrets:
    - `CLOUDFLARE_ACCOUNT_ID`: your [Cloudflare account ID](https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/).
    - `CLOUDFLARE_API_TOKEN`: a [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with permission `Account.Cloudflare Pages` (`Edit` level).
  - Variables:
    - `CLOUDFLARE_PAGES_PROJECT_NAME`: the name of the Cloudflare Pages project that you created earlier.
- [ ] Customise [the list of links](/11ty-src/_data/links.json) as appropriate.
- [ ] Customise [the text on the home page](/11ty-src/index.md) as appropriate.
- [ ] (optional) Customise [the CSS](/11ty-src/assets/css/bundle.css) to change the colours etc.
- [ ] (optional) Delete [the lipsum file](/11ty-src/lipsum.md).

## Local Development

The easiest way to develop locally is using [Docker Desktop](https://www.docker.com/products/docker-desktop/) (other container engines are available).

- Windows (cmd): `docker run -it --rm -v %cd%:/app -w /app -p 127.0.0.1:8080:8080 node:20.15.1 sh -c "cd /app && npm install && npx @11ty/eleventy --serve"`
- macOS & Linux (bash): `docker run -it --rm -v "$PWD":/app -w /app -p 127.0.0.1:8080:8080 node:20.15.1 sh -c "cd /app && npm install && npx @11ty/eleventy --serve"`

Once the development server is running, the website will be available at http://localhost:8080/.
