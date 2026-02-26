# Sillon — Discaire vinyle en ligne

Projet M1 Web Application Development (2025-2026).  
Objectif : transformer la base "bibliothèque de livres" en un site de discaire vinyle.

## Stack

- Backend : TypeScript, NestJS, TypeORM, SQLite
- Frontend : TypeScript, React, Vite, Ant Design, TanStack Router

## Démarrage avec Docker (front + back)

### 1) Construire les images

```bash
docker compose build
```

### 2) Lancer les services

```bash
docker compose up -d
```

- Front : http://localhost:5173
- Back : http://localhost:3000

### 3) Logs préfixés

```bash
./scripts/docker-logs.sh
```

## Démarrage local (hors Docker)

### Pré-requis

- Node.js 20.19+ (ou 22.12+)

### Backend

```bash
cd nest-api
npm install
npm run start:dev
```

### Frontend

```bash
cd react-app
npm install
npm run dev
```

## Variable d'environnement frontend

Créer un fichier `.env` dans `react-app/` (voir `.env.example`) :

```env
VITE_API_URL=http://localhost:3000
```
