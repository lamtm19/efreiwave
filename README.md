# Efrei Wave

Application web de découverte musicale construite avec React, TypeScript et Vite. Elle interroge l'API iTunes pour rechercher des albums, parcourir les artistes, écouter des extraits de 30 secondes et sauvegarder ses titres préférés.

---

## Prérequis

- **Node.js 24+** (vérifie avec `node -v`)
- npm 10+ (inclus avec Node 24)

---

## Installation et lancement

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement (http://localhost:5173)
npm run dev

# Compiler pour la production (sortie dans dist/)
npm run build
```

---

## Variables d'environnement

Crée un fichier `.env` à la racine du projet :

```env
VITE_API_BASE_URL=https://itunes.apple.com
```

> **Pourquoi le préfixe `VITE_` ?**
> Vite n'expose pas les variables d'environnement au code client par défaut pour éviter de fuiter des secrets (clés API, mots de passe). Seules les variables dont le nom commence par `VITE_` sont injectées dans le bundle JavaScript. Les autres restent côté serveur, inaccessibles au navigateur.

---

## Arborescence `src/`

```
src/
├── components/         # Composants réutilisables
│   ├── AlbumCard.tsx   # Carte d'album (cover, titre, artiste, badge)
│   ├── AlbumGrid.tsx   # Grille responsive d'AlbumCards
│   ├── Footer.tsx      # Pied de page (année)
│   ├── GenreFilter.tsx # Sélecteur de genre (extrait des albums chargés)
│   ├── Header.tsx      # Barre de navigation avec liens actifs
│   ├── Layout.tsx      # Gabarit global (Header + Outlet + PlayerBar + Footer)
│   ├── PlayerBar.tsx   # Barre de lecture fixe en bas de page
│   ├── SearchBar.tsx   # Champ de recherche avec bouton ✕ et soumission
│   └── SortSelect.tsx  # Sélecteur de tri (titre, artiste, année, popularité)
├── context/
│   ├── PlayerContext.tsx   # Contexte + hook usePlayer (sans composant)
│   └── PlayerProvider.tsx  # Fournisseur du contexte (état audio + liked)
├── pages/
│   ├── AlbumPage.tsx   # Détail d'un album : cover, pistes, ▶/❤️
│   ├── ArtistPage.tsx  # Albums d'un artiste
│   ├── Home.tsx        # Page d'accueil : recherche, filtres, grille
│   ├── NotFound.tsx    # Page 404
│   └── Profile.tsx     # Liste des titres likés (persistés en localStorage)
├── services/
│   └── api.ts          # Fonctions d'appel à l'API iTunes (search, getAlbum, getArtist)
├── styles/
│   └── base.css        # Feuille de style unique
├── types/
│   ├── album.ts        # Type Album
│   └── track.ts        # Type Track
├── utils/
│   └── format.ts       # formatDuration (ms → "m:ss")
└── main.tsx            # Point d'entrée : router + providers
```

---

## Limites connues

- **API iTunes** : environ 20 requêtes/minute par IP ; au-delà, les réponses peuvent être vides ou en erreur.
- **`previewUrl`** : certains titres n'ont pas d'extrait disponible (champ `null`) — le bouton ▶ est présent mais rien ne se lit.
- **Recherche** : l'API ne supporte pas la recherche par genre directement ; le filtre genre est appliqué côté client sur les résultats déjà chargés.
- **Pas d'authentification** : le profil est local (localStorage), non synchronisé entre appareils.

---

## Utilisation de l'IA

Ce projet a été développé de bout en bout avec l'assistant **Claude Sonnet 4.6** (`claude-sonnet-4-6`) via Claude Code.

Tous les échanges (prompts utilisateur + réponses assistant) sont tracés verbatim dans [`prompt.md`](../prompt.md) à la racine du dépôt, conformément à la demande formulée à l'échange 1.
