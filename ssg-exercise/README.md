# CSE 134B Homework 5 - Eleventy exercise

This exercise uses Eleventy to build two pages with one shared layout and footer.

The source pages are:

- `src/index.njk` -> Home at `/`
- `src/about.njk` -> About at `/about/`

The shared layout is `src/_includes/layout.njk`.

## Install

From this directory:

```sh
npm install
```

## Build

```sh
npm run build
```

The generated pages are written to `_site/`.

## Preview

```sh
npm start
```

Eleventy will print a local preview URL, normally `http://localhost:8080/`.
