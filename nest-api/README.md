# API NestJS — Sillon

API REST du projet **Sillon**, discaire vinyle en ligne.

## Lancer l'API en local

Créer un fichier `nest-api/.env` si vous souhaitez activer l'intégration Spotify :

```env
SPOTIFY_CLIENT_ID=votre_client_id
SPOTIFY_CLIENT_SECRET=votre_client_secret
```

Puis lancer l'API :

```bash
npm install
npm run start:dev
```

Par défaut, l'API est disponible sur `http://localhost:3000`.

## Docker

Avec Docker, les variables Spotify ne doivent pas être ajoutées au `Dockerfile`.
Elles sont injectées au runtime par `docker-compose.yml` via le fichier `nest-api/.env`.

Exemple :

```yaml
back:
  env_file:
    - ./nest-api/.env
```

## Scripts utiles

```bash
npm run build
npm run start
npm run start:dev
npm run start:prod
npm run lint
npm run test
npm run test:e2e
```
