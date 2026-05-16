# The Impossible Dota Quiz — MERN Edition

A trivia game of 20 trick-based Dota 2 riddles, inspired by *The Impossible Quiz*.
Three lives, three skips, every question a twist. Built on the **MERN** stack
(MongoDB · Express · React · Node).

## What MERN adds over the original

The original was a single static HTML file. This version moves the game onto a
real stack:

- **MongoDB** — stores the question bank and a persistent leaderboard
- **Express + Node** — REST API; answer keys never reach the browser, so
  correctness is validated **server-side**
- **React (Vite)** — the UI rebuilt as components with proper game state

## Project layout

```
dota-impossible-quiz/
├── server/          Express API + Mongoose models
│   └── src/
│       ├── models/  Question, Score
│       ├── routes/  /api/questions, /api/scores
│       ├── data/    seed question bank
│       └── seed.js  populates MongoDB
├── client/          React + Vite single-page app
│   └── src/
│       ├── components/           screens, HUD, leaderboard
│       └── components/questions/ one component per question kind
└── legacy/          the original standalone HTML game (kept for reference)
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance (local `mongodb://127.0.0.1:27017`, or MongoDB Atlas)

## Setup

```bash
# from the repo root — installs both workspaces
npm install

# configure the server
cp server/.env.example server/.env
# edit server/.env if your MongoDB URI differs

# seed the question bank into MongoDB
npm run seed
```

## Running (two terminals)

```bash
npm run server   # Express API on http://localhost:5000
npm run client   # Vite dev server on http://localhost:5173
```

Open <http://localhost:5173>. The Vite dev server proxies `/api` to the
Express server.

## API

| Method | Endpoint                          | Purpose                          |
|--------|-----------------------------------|----------------------------------|
| GET    | `/api/health`                     | health check                     |
| GET    | `/api/questions`                  | question bank (answer keys removed) |
| POST   | `/api/questions/:number/answer`   | validate an answer               |
| GET    | `/api/scores/top?limit=10`        | leaderboard                      |
| POST   | `/api/scores`                     | record a finished run            |

## Production build

```bash
npm run build    # outputs client/dist
```

Serve `client/dist` from any static host and deploy `server/` to a Node host
(Render, Railway, Fly.io) with a MongoDB Atlas connection string. Set
`VITE_API_BASE` at build time if the API is on a different origin.

## License

MIT
