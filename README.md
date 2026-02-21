# m1-s1-2025 project

## Démarrage avec Docker (front + back)

### 1) Construire les images
```bash
docker compose build
```

### 2) Lancer les deux services
```bash
docker compose up -d
```

- Front: http://localhost:5173
- Back: http://localhost:3000

### 3) Voir les logs avec préfixes `[front]` et `[back]`
```bash
./scripts/docker-logs.sh
```

Exemple de sortie:
```text
[front] : ...
[back] : ...
```

### Commandes utiles

Arrêter les services:
```bash
docker compose down
```

Relancer avec rebuild:
```bash
docker compose up -d --build
```
