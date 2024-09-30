# Cassowary

![Cassowary screenshot](./cassowary-screenshot.png 'Cassowary')

## Main Features

- Stamina tracker
- Character and Weapon levelling material trackers
- Notes for to-do or etc
- Backup and Restore data to/from JSON file
- etc

## What this does not/is not

- This doesn't sync directly to the game. You need to 'sync' manually (put the inventory item counts by yourself).
- etc

## Found bugs? Have ideas?

Please create [issues](/issues).

## Disclaimer

This is just an unofficial project. This has no relation whatsoever to the official Wuthering Waves and KURO GAMES. Game data are from Wuthering Waves game.

## Under The Hood

### Folder Structure

#### data

This folder contains data: database scheme, form scheme, and game data.

#### components

Contains page components.

#### composables

Contains reusable function/logic.

#### pages

Contains vue pages and important for app routing.

#### services

Contains business logic.

#### stores

Contains [Pinia](https://pinia.vuejs.org/introduction.html) store. Main logic for data storage.

### Development Setup

This app is powered by [Nuxt Framework](https://nuxt.com/docs/getting-started/introduction).

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

### Development Server

Start the development server on `http://localhost:8104`:

```bash
# pnpm
pnpm run dev
```
