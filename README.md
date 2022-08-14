# tracker_koa
User actions tracker

## Dependencies

- node: ~16.15.0
- npm: >=8.5.5

## Setup
Make sure to install the dependencies

```bash
npm install
cp .env.example .env
```

Change `DATABASE_URL` in `.env` or just run mongo in container

```bash
sudo docker-compose up
```

## Development

Start backend on http://localhost:8001 and frontend on http://localhost:8000

```bash
npm run dev
```