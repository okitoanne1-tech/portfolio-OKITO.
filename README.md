# Portfolio — Anne Okito

Site statique (HTML / CSS / JS) : aucune installation, aucun build.

## Modifier le contenu
- **Textes, projets, parcours** → `index.html` (chaque section est commentée).
- **Couleurs, polices** → variables en haut de `style.css` (`:root`).
- **Photo** → remplace `assets/portrait.svg` par `assets/portrait.jpg`, puis change le `src` dans `index.html` (cherche `portrait`).
- **Images de projets** → dans chaque `<article class="project">`, remplace le bloc `.project__visual` par `<img src="assets/mon-projet.jpg" alt="…">`.
- **Email / WhatsApp / réseaux** → cherche `VOTRE-EMAIL`, `243XXXXXXXXX` dans `index.html`.

## Publier
1. Crée un dépôt GitHub et pousse ces fichiers (ou glisse-dépose via l'interface web GitHub).
2. Sur vercel.com → *Add New → Project* → importe le dépôt → *Deploy* (Framework : « Other », rien à configurer).
3. Chaque modification poussée sur GitHub redéploie le site automatiquement.

## Tester en local
`python3 -m http.server 8000` puis ouvre http://localhost:8000
