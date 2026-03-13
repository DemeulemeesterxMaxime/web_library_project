# Sillon — Discaire vinyle en ligne

Projet M1 Web Application Development (2025-2026).
Groupe : Julien Debril, Amira Hidaoui, Maxime Demeulemeester, Maxence Gibaru.
Deadline : 13 mars 2026.

---

## Stack

| Côté      | Technologies                                                    |
| --------- | --------------------------------------------------------------- |
| Back-end  | TypeScript · NestJS · TypeORM · SQLite · API REST               |
| Front-end | TypeScript · React · Vite · Ant Design · @tanstack/react-router |

---

## Fonctionnalités

### Vinyles

- Lister, créer, modifier et supprimer des vinyles
- Chaque vinyle est associé à un artiste et possède une année de sortie + photo de pochette
- Recherche de métadonnées via l'intégration Spotify (titre + artiste → pochette automatique)

### Artistes

- Lister, créer, modifier et supprimer des artistes
- Page de détail listant tous les vinyles de l'artiste

### Clients

- Lister, créer, modifier et supprimer des clients
- Page de détail avec l'historique des achats du client

### Ventes

- Enregistrer l'achat d'un vinyle par un client (date, client, vinyle)
- Filtrage des ventes par client ou par vinyle

### Collections

- Chaque client peut gérer une ou plusieurs collections de vinyles
- **Visibilité publique** : seuls les vinyles déjà achetés par n'importe quel client peuvent être ajoutés
- **Visibilité privée** : seuls les vinyles achetés par le propriétaire de la collection peuvent être ajoutés
- Bascule public/privé depuis la page de détail de la collection

---

## Démarrage avec Docker (recommandé)

### 1. Variables d'environnement Spotify

Pour activer la recherche de métadonnées Spotify, créer un fichier `nest-api/.env` :

```env
SPOTIFY_CLIENT_ID=votre_client_id
SPOTIFY_CLIENT_SECRET=votre_client_secret
```

Obtenir ces clés sur [developer.spotify.com](https://developer.spotify.com/dashboard) → créer une app → copier `Client ID` et `Client Secret`, pour l'URI demander elle ne sert a rien donc on peut mettre ce que l'on veut.

Avec Docker, ces variables sont chargées par `docker-compose.yml` via :

- `env_file: ./nest-api/.env` pour le service `back`

> Il ne faut **pas** mettre `SPOTIFY_CLIENT_ID` ou `SPOTIFY_CLIENT_SECRET` dans le `Dockerfile`.
> Les secrets doivent rester dans `nest-api/.env` et ne jamais être hardcodés dans une image.

> Sans ces variables, l'application fonctionne normalement ; la fonctionnalité de recherche Spotify sera désactivée.

### 2. Construire les images

```bash
docker compose build
```

### 3. Lancer les services

```bash
docker compose up -d
```

- Frontend : http://localhost:5173
- Backend : http://localhost:3000

### 4. Résumé de la configuration Docker

- `react-app/Dockerfile` : utilise uniquement `VITE_API_URL` comme argument de build
- `nest-api/Dockerfile` : ne contient **aucune** clé Spotify
- `docker-compose.yml` : injecte les variables Spotify dans le conteneur back avec `env_file`

Exemple de configuration utile côté Docker :

```yaml
back:
	env_file:
		- ./nest-api/.env
```

### 5. Consulter les logs

```bash
./scripts/docker-logs.sh
```

---

## Démarrage local (hors Docker)

### Pré-requis

- Node.js ≥ 20.19 (ou ≥ 22.12)

### Backend

Créer `nest-api/.env` si vous voulez utiliser Spotify en local :

```env
SPOTIFY_CLIENT_ID=votre_client_id
SPOTIFY_CLIENT_SECRET=votre_client_secret
```

```bash
cd nest-api
npm install
npm run start:dev
```

### Frontend

Créer `react-app/.env` :

```env
VITE_API_URL=http://localhost:3000
```

```bash
cd react-app
npm install
npm run dev
```

---

## Variables d'environnement

| Fichier          | Variable                | Description                                     |
| ---------------- | ----------------------- | ----------------------------------------------- |
| `react-app/.env` | `VITE_API_URL`          | URL du backend (défaut `http://localhost:3000`) |
| `nest-api/.env`  | `SPOTIFY_CLIENT_ID`     | Client ID de l'app Spotify Developer            |
| `nest-api/.env`  | `SPOTIFY_CLIENT_SECRET` | Client Secret de l'app Spotify Developer        |

---

## Qui a fait quoi

| Fonctionnalité                                      | Développeur(s)                        |
| --------------------------------------------------- | ------------------------------------- |
| Mise en place de la stack (NestJS + React + Docker) | Maxence Gibaru                        |
| Module Vinyles (CRUD back + front)                  | Maxime Demeulemeester                 |
| Module Artistes (CRUD back + front)                 | Amira Hidaoui                         |
| Module Clients (CRUD back + front)                  | Amira Hidaoui                         |
| Module Ventes (CRUD back + front)                   | Maxime Demeulemeester                 |
| Module Collections (CRUD + visibilité)              | Julien Debril                         |
| Intégration Spotify                                 | Maxence Gibaru                        |
| Direction artistique (thème underground / néon)     | Julien Debril                         |
| Tests et corrections de bugs                        | Julien Debril · Maxime Demeulemeester |
