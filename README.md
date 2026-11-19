# CSE134B Homework 5

Personal portfolio and Homework 5 exercises for Haolong Chen.

- Repository: https://github.com/hac098-cloud/CSE134B-HW5
- Main site: https://animated-axolotl-b2c8d8.netlify.app/
- Web Component: [Cat Fact Explorer on the home page](https://animated-axolotl-b2c8d8.netlify.app/#cat-fact-explorer), implemented in `cat-fact-panel.js` and embedded in `index.html`.
- Static site generator exercise: [`ssg-exercise/`](ssg-exercise/). Build and preview the Home page (`/`) and About page (`/about/`) there; the deployed Homework 5 site remains the root portfolio.

## Design note

A visitor to this portfolio wants to learn about my projects and explore an interactive example. In the Cat Fact Explorer, activating **Get a live cat fact** starts a `fetch()` request to the Cat Facts API. The component announces that it is loading, checks the HTTP response and the returned `fact` field, then places the fact in the page with `textContent` and announces success. If the request or response fails, it announces the failure and leaves the visitor able to retry or browse sample facts without reloading. The separate display control toggles the component's observed `compact` attribute and saves the choice in `localStorage`.

## Local portfolio test

Serve the repository root through a local web server (do not open the HTML file directly), then open `index.html`. Test the live-data control, the compact/expanded preference across a page reload, and the theme toggle.

## Submission links

Upload [`links.txt`](links.txt) to Gradescope. It lists the repository, the deployed portfolio, and the component page in that order. The component is on the home page, so the last two URLs are the same.

```text
https://github.com/hac098-cloud/CSE134B-HW5
https://animated-axolotl-b2c8d8.netlify.app/
https://animated-axolotl-b2c8d8.netlify.app/
```
