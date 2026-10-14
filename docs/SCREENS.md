# Captures d'écran à réaliser

Fais ces 5 captures manuellement depuis le navigateur une fois l'application déployée (ou en `npm run dev`). Sauvegarde-les dans ce dossier `docs/`.

---

## 1. Accueil — `home.png`

**URL :** `/`

**État à atteindre :**
- Lance une recherche (ex : "Taylor Swift" ou "Daft Punk")
- Attends que la grille d'albums s'affiche (minimum 6 cartes visibles)
- Laisse les filtres par défaut

**Ce qui doit être visible :** header, barre de recherche + filtres alignés, compteur de résultats, grille d'albums avec covers.

---

## 2. Page album — `album.png`

**URL :** `/album/:id` (clique sur n'importe quelle carte)

**État à atteindre :**
- Ouvre la page d'un album depuis la grille
- Attends le chargement complet de la tracklist

**Ce qui doit être visible :** cover à gauche, titre + artiste + année à droite, liste de pistes avec boutons ▶ et ❤️, PlayerBar en bas si un titre a été lancé.

---

## 3. Page artiste — `artist.png`

**URL :** `/artist/:id` (clique sur le nom de l'artiste dans la page album)

**État à atteindre :**
- Depuis une page album, clique sur le lien de l'artiste
- Attends le chargement des albums

**Ce qui doit être visible :** nom de l'artiste en grand, grille de ses albums.

---

## 4. Profil — `profile.png`

**URL :** `/profile`

**État à atteindre :**
- Like au moins 3 titres depuis des pages album (bouton ❤️)
- Va sur `/profile`

**Ce qui doit être visible :** liste des titres likés avec bouton ▶, titre, artiste, durée. Si la liste est vide, la page doit afficher "Aucun titre liké pour l'instant."

---

## 5. Page 404 — `404.png`

**URL :** `/une-route-qui-nexiste-pas`

**État à atteindre :**
- Tape manuellement une URL inexistante dans la barre d'adresse

**Ce qui doit être visible :** message "Page introuvable" centré, lien "Retour à l'accueil".
