# Rapport de test visuel — TresoPharm (environnement de test)

- **Application :** https://pharma-v1.netlify.app/ (environnement de développement / test, données fictives)
- **Date du test :** jeudi 19 novembre 2026
- **Méthode :** Playwright piloté par script (Chromium headless, fenêtre 1440 × 900), une session neuve par rôle. Le MCP Playwright n'était pas chargé dans la session, d'où le passage par script : pas de fenêtre visible.
- **Mode :** lecture seule. Aucun bouton d'écriture (Enregistrer, Valider, Supprimer, Régler, Annuler une opération, Désactiver…) n'a été cliqué. Seuls ont été utilisés : navigation, onglets, pagination, tri, ouverture de fiches « Voir / Détail » refermées avec « Fermer » ou Échap.
- **Captures :** dossier `.playwright-mcp/`, nommées `<role>-<numéro>-<vue>.png` (fiches ouvertes : suffixe `-detail`, accueil après connexion : `-00-accueil`).

## 1. Résumé

| Élément | Valeur |
|---|---|
| Rôles testés | 6 / 6 (connexion réussie pour tous) |
| Vues du menu visitées | 41 (gérant 23, factures 5, ventes 4, caissière 1 : 3, caissière 2 : 3, responsable caisse : 3) |
| Accès directs par URL hors menu | 97 essais, **97 bloqués** (redirection vers `#/dashboard`) |
| Erreurs console (niveau error) | 0 |
| Appels réseau en échec (4xx / 5xx) | 0 |
| Anomalies **Critiques** | 0 |
| Anomalies **Majeures** | 5 (1 constatée, 4 à confirmer) |
| Anomalies **Mineures** | 6 (3 constatées, 3 à confirmer) |

Les points « à confirmer » sont des écarts observés dont je ne peux pas dire, sans les règles métier, s'ils sont voulus.

## 2. Matrice rôles × vues

✅ OK · ⚠️ anomalie (voir le chapitre du rôle) · ❌ erreur ou inaccessible · — vue absente du menu (accès direct par URL bloqué)

| Vue | Gérant | Factures | Ventes | Caissière 1 | Caissière 2 | Resp. caisse |
|---|---|---|---|---|---|---|
| `#/dashboard` Tableau de bord | ⚠️ m1 | ✅ | ⚠️ m3 | ✅ | ✅ | ✅ |
| `#/factures/fournisseurs` Fournisseurs | ✅ | ✅ | — | — | — | — |
| `#/factures/liste` Suivi des factures | ✅ | ✅ | — | — | — | — |
| `#/factures/situation` Situation fournisseurs | ✅ | ✅ | — | — | — | — |
| `#/factures/reglements` Règlements | ✅ | ✅ | — | — | — | — |
| `#/ventes/journal` Journal des ventes | ✅ | — | ⚠️ P1 | — | — | — |
| `#/analyse/recap-annuel` Récap des ventes | ⚠️ m4 | — | ⚠️ m4 | — | — | — |
| `#/analyse/recap-achats` Récap des achats | ✅ | — | ✅ | — | — | — |
| `#/caisses/comptes` Comptes | ✅ | — | — | — | — | — |
| `#/caisses/ajustements` Autres opérations | ✅ | — | — | — | — | — |
| `#/caisses/journalhebdomadaire` Journal hebdo | ✅ (obs. m6) | — | — | — | — | — |
| `#/caisses/rapprochement-bancaire` Rapp. bancaire | ✅ | — | — | — | — | — |
| `#/caisses/joursferies` Jours fériés | ✅ | — | — | — | — | — |
| `#/caisses/recapmensuel` Récap mensuel | ✅ | — | — | — | — | — |
| `#/caisses/recapannuel` Récap annuel | ✅ | — | — | — | — | — |
| `#/caisses/marge` Marge | ✅ | — | — | — | — | — |
| `#/caisses/asc` Autorisations (ASC) | ✅ | — | — | ⚠️ M1, P2 | ⚠️ M1, P2 | ✅ |
| `#/caisses/virements` Versements banques | ✅ | — | — | — | — | — |
| `#/caisses/remises-cheques` Remises chèques | ✅ | — | — | — | — | — |
| `#/caisses/virements-cheques` Virements reçus | ⚠️ m4 | — | — | — | — | — |
| `#/caisses/point` Point de caisse | ✅ | — | — | ⚠️ M2, m2 | ⚠️ M2 | ⚠️ P3 |
| `#/admin/utilisateurs` Utilisateurs | ✅ | — | — | — | — | — |
| `#/caisses/plancomptables` Plan de trésorerie | ✅ | — | — | — | — | — |

Anomalie transversale m5 (curseur « | » dans le titre d'accueil) : tous les tableaux de bord.

## 3. Détail par rôle

### Points communs à tous les rôles

- Page de connexion : la fenêtre **« Installer TresoPharm »** s'affiche à chaque ouverture (fermée avec « Plus tard »). Le bouton « Se connecter » reste désactivé tant que les champs sont vides.
- Après chaque connexion, la fenêtre **« Environnement de développement / test »** s'affiche (fermée avec « J'ai compris »). Le badge « ENVIRONNEMENT DE DÉVELOPPEMENT / TEST » reste visible dans l'en-tête.
- Tous les rôles arrivent sur `#/dashboard`, avec un tableau de bord adapté au rôle.
- Temps de chargement des vues : de 1,1 s à 6,8 s. Les plus lentes (4 à 7 s) : Point de caisse (gérant 6,8 s), Journal hebdo (5,6 s), Situation fournisseurs (5,5 s), Récap mensuel (4,8 s), Suivi des factures (4,4–4,7 s). Aucune vue ne reste bloquée en chargement au-delà de 15 s.

### 3.1 Pharmacien gérant — `gerant@pharmacie-test.ci` (Kouassi N'Guessan)

**Menu observé (23 entrées) :** Tableau de bord · *Suivi factures* : Fournisseurs, Suivi des factures, Situation fournisseurs, Règlements · *Analyse d'activité* : Journal des ventes, Récap des ventes, Récap des achats · *Caisses & trésorerie* : Comptes, Autres opérations, Journal hebdo, Rapp. bancaire, Jours fériés, Récap mensuel, Récap annuel, Marge, Autorisations (ASC), Versements banques, Remises chèques, Virements reçus, Point de caisse · Utilisateurs · Plan de trésorerie.

**Vues testées :** les 23, captures `gerant-01-dashboard.png` à `gerant-23-caisses-plancomptables.png`. Pagination testée et fonctionnelle (page 2 affichée) sur : tableau de bord, Fournisseurs, Suivi des factures, Situation, Règlements, Journal des ventes, ASC, Versements, Remises chèques, Virements reçus, Point de caisse, Plan de trésorerie. Fiches « Voir / Détail » ouvertes et refermées sans problème sur : Fournisseurs, Suivi des factures, Règlements, Journal des ventes, Comptes, Autres opérations, Rapp. bancaire, ASC, Versements, Remises chèques, Virements reçus, Point de caisse, Utilisateurs.

**Cohérences vérifiées (OK) :**
- Suivi des factures : total TTC 244 758 423 − réglé 211 682 093 = 33 076 330 FCFA, identique au « Montant dû fournisseurs » du tableau de bord.
- Solde comptes bancaires 191 156 408 + solde caisses 1 059 570 = 192 215 978 FCFA, identique au « Solde cumulé » de la vue Comptes.

**Anomalies :**

- **m1 — Mineure, à confirmer — Tableau de bord : deux nombres différents de factures « en retard » sur la même page.**
  - Reproduire : se connecter en gérant, rester sur `#/dashboard`.
  - Attendu : un seul chiffre de factures en retard, ou des libellés qui distinguent les deux notions.
  - Obtenu : la carte « Factures en retard » affiche **20**, le filtre de la liste « Factures en attente de règlement » affiche **En retard (27)**. De même, « Factures en attente » 23 + « Factures partielles » 1 = 24, alors que la liste annonce **46** factures en attente de règlement. L'écart vient probablement des prévisions, comptées dans la liste (la fenêtre du Journal hebdo affiche aussi « 27 en retard », prévisions comprises), mais rien ne l'indique à l'écran.
  - Capture : `gerant-01-dashboard.png`.
- **m4 — Mineure — Libellés incohérents entre menu et titre de page.**
  - `#/caisses/virements-cheques` : menu « Virements reçus », titre de page **« Virements reçu »** (faute d'accord). Capture `gerant-20-caisses-virements-cheques.png`.
  - `#/analyse/recap-annuel` : menu « Récap des ventes », titre **« Récap journal de vente »**. Capture `gerant-07-analyse-recap-annuel.png`.
- **m6 — Observation, à confirmer — Journal hebdo : une fenêtre s'ouvre automatiquement.** À l'ouverture de `#/caisses/journalhebdomadaire`, la fenêtre « Factures et prévisions à traiter » (27 en retard, 1 jour J, total estimé 39 173 507 FCFA) recouvre la grille. Elle se ferme avec « J'ai compris » ou Échap. Si c'est voulu, ce n'est pas une anomalie, mais elle réapparaît à chaque visite. Capture : `gerant-11-caisses-journalhebdomadaire.png`.

**Visible pour ce rôle :** tous les boutons de création, modification, suppression, désactivation, règlement et annulation (« + Nouveau fournisseur », « Régler une facture », « + Nouvelle entrée », « Saisir », « + ASC directe », « + Demande ASC (caissière) », « Annuler » sur les ASC et les règlements, « + Nouvel utilisateur »…). Montants et colonnes complets.

### 3.2 Chargée suivi factures — `factures@pharmacie-test.ci` (Adjoua Kouamé)

**Menu observé (5 entrées) :** Tableau de bord · *Suivi factures* : Fournisseurs, Suivi des factures, Situation fournisseurs, Règlements.

**Vues testées :** les 5, captures `factures-01-dashboard.png` à `factures-05-factures-reglements.png`. Pagination et fiches de détail fonctionnelles.

**Anomalies :** aucune propre à ce rôle. Les chiffres sont identiques à ceux du gérant (16 fournisseurs, 200 factures, 100 règlements, mêmes totaux).

**Visible pour ce rôle :** création, modification et suppression de fournisseurs, interrupteurs « Désactiver <fournisseur> », « + Nouvelle facture », « Régler une facture », « Régler », « Reporter », « Vérifier / modifier », « + Enregistrer un règlement », « Annuler » sur les règlements. Cohérent avec le rôle.

**Accès direct par URL :** les 18 vues hors menu (ventes, analyses, caisses, utilisateurs, plan de trésorerie) redirigent vers `#/dashboard` : bloqué.

### 3.3 Chargé suivi ventes — `ventes@pharmacie-test.ci` (Yao Konan)

**Menu observé (4 entrées) :** Tableau de bord, Journal des ventes, Récap des ventes, Récap des achats (sans groupe repliable).

**Vues testées :** les 4, captures `ventes-01-dashboard.png` à `ventes-04-analyse-recap-achats.png`, fiche `ventes-02-ventes-journal-detail.png`.

**Anomalies :**

- **m3 — Mineure, à confirmer — Tableau de bord : la répartition du mois ne correspond pas au CA du mois.**
  - Reproduire : se connecter en chargé ventes, rester sur `#/dashboard`.
  - Attendu : Espèces + Mobile money + Crédit assurance + Crédit particulier = CA TTC du mois, ou une explication de l'écart.
  - Obtenu : 2 339 417 + 394 690 + 237 456 + 7 565 = **2 979 128 FCFA**, alors que « CA TTC du mois » = **2 861 587 FCFA** (écart de 117 541 FCFA). Les recouvrements sont peut-être inclus dans la répartition.
  - Capture : `ventes-01-dashboard.png`.
- **P1 — Majeure, à confirmer — Le chargé suivi ventes ne peut pas saisir de ventes.** Voir le chapitre 4.
- m4 (titre « Récap journal de vente ») s'applique aussi : `ventes-03-analyse-recap-annuel.png`.

**Accès direct par URL :** les 19 vues hors menu sont bloquées.

### 3.4 Caissière 1 — `caissiere1@pharmacie-test.ci` (Aya Kouadio)

**Menu observé (3 entrées) :** Tableau de bord, Autorisations (ASC), Point de caisse.

**Vues testées :** les 3, captures `caissiere1-01-dashboard.png`, `caissiere1-02-caisses-asc.png` (+ `-detail`), `caissiere1-03-caisses-point.png` (+ `-detail`). Le tableau de bord affiche fond de caisse 50 000 FCFA, point du jour « À faire », 0 ASC en attente, avec le message « Aucune ASC en attente pour le moment ». La liste des ASC ne montre que les ASC de cette caissière (filtrage correct).

**Anomalies :**

- **M1 — Majeure, constatée — ASC : les compteurs et le nombre total d'éléments sont faux pour les caissières.**
  - Reproduire : se connecter en caissière 1, ouvrir `#/caisses/asc`, lire les cartes et le pied de tableau. Comparer avec la caissière 2 et le gérant.
  - Attendu : les compteurs de la caissière sont inférieurs ou égaux à ceux de toute la pharmacie, vus par le gérant.
  - Obtenu :

    | Compte | Total ASC | Validées | Refusées | Total montant | Pied de tableau |
    |---|---|---|---|---|---|
    | Caissière 1 | 100 | 92 | 8 | 1 660 000 FCFA | 1–15 sur 100 |
    | Caissière 2 | 100 | 93 | **7** | 1 728 000 FCFA | 1–15 sur 100 |
    | Responsable / Gérant (toute la pharmacie) | 100 | 97 | **3** | 2 438 500 FCFA | 1–15 sur 100 |

    Chaque caissière a 100 ASC, et la pharmacie entière aussi. La caissière 2 a 7 refus, contre 3 pour toute la pharmacie. Les chiffres sont contradictoires.
  - Piste, à confirmer : le total plafonne à un nombre rond. On trouve aussi 100 règlements, 200 factures, 200 journaux de ventes et 200 points de caisse par caissière, alors que les numéros d'ASC dépassent 599. Le serveur semble ne renvoyer que les 100 ou 200 derniers éléments, et les compteurs sont calculés sur cette portion. Les listes plus longues (365 versements, 611 virements reçus, 1 296 remises chèques) ne sont pas concernées.
  - Captures : `caissiere1-02-caisses-asc.png`, `caissiere2-02-caisses-asc.png`, `responsable-02-caisses-asc.png`, `gerant-17-caisses-asc.png`.
- **M2 — Majeure, à confirmer — La caissière peut modifier ou supprimer un point de caisse déjà validé.**
  - Reproduire : `#/caisses/point`, ouvrir un point ancien (par exemple vendredi 2 octobre 2026).
  - Attendu : un point au statut « Validé » est verrouillé pour la caissière.
  - Obtenu : la fiche affiche « Statut : Validé » avec les boutons crayon (modifier) et corbeille (supprimer). Ces deux boutons sont aussi présents sur chaque ligne de la liste. Non cliqués (lecture seule), donc impossible de savoir si le serveur refuserait l'action.
  - Captures : `caissiere1-03-caisses-point.png`, `caissiere1-03-caisses-point-detail.png`.
- **m2 — Mineure, à confirmer — Point de caisse du 2 octobre 2026 : total espèces différent du montant compté.**
  - Obtenu, dans la fiche : montant compté 367 810 FCFA (égal au total du billetage), ASC 0 FCFA, mais « Total espèce/jour » **368 645 FCFA** (écart de 835 FCFA). Sur les autres lignes vues, total = compté + ASC (par exemple 457 800 + 30 000 = 487 800).
  - Capture : `caissiere1-03-caisses-point-detail.png`.
- **P2 — Majeure, à confirmer — Pas de bouton de demande d'ASC pour la caissière.** Voir le chapitre 4.

**Visible pour ce rôle :** ASC : « Voir », « Imprimer », « Réimprimer », sans bouton de création ni de validation. Point de caisse : « + Nouveau point de caisse », « Voir », « Modifier », « Supprimer ».

**Accès direct par URL :** les 20 vues hors menu sont bloquées, dont `#/admin/utilisateurs`.

### 3.5 Caissière 2 — `caissiere2@pharmacie-test.ci` (Affoué Yao)

**Menu observé (3 entrées) :** Tableau de bord, Autorisations (ASC), Point de caisse.

**Vues testées :** les 3, captures `caissiere2-01-dashboard.png` à `caissiere2-03-caisses-point.png` (+ fiches `-detail`). La liste des ASC ne montre que les siennes (filtrage correct).

**Anomalies :** M1 (compteurs ASC, voir 3.4), M2 (boutons Modifier et Supprimer sur des points passés), P2 (pas de demande d'ASC). Mêmes constats que la caissière 1.

**Accès direct par URL :** les 20 vues hors menu sont bloquées.

### 3.6 Responsable caisse — `responsable@pharmacie-test.ci` (Amenan Koffi)

**Menu observé (3 entrées) :** Tableau de bord, Autorisations (ASC), Point de caisse. C'est le même menu que les caissières.

**Vues testées :** les 3, captures `responsable-01-dashboard.png`, `responsable-02-caisses-asc.png` (+ `-detail`), `responsable-03-caisses-point.png`. Le tableau de bord « Supervision caisse » affiche solde caisses 1 059 570 FCFA, 2 fonds de caisse actifs, 0 point du jour, 0 écart, 0 ASC en attente. La liste des ASC couvre toute la pharmacie (les deux caissières et les ASC directes du gérant).

**Anomalies :**

- **P3 — Majeure, à confirmer — La responsable ne voit pas les points de caisse des caissières.** Voir le chapitre 4.
- Validation et refus d'ASC : **non vérifiables**, car aucune ASC n'est en attente. La fiche d'une ASC refusée s'affiche correctement (motif du refus, historique) : `responsable-02-caisses-asc-detail.png`.

**Accès direct par URL :** les 20 vues hors menu sont bloquées.

## 4. Anomalies de permissions

**Accès direct par URL :** aucune anomalie. Sur 97 essais (chaque vue du gérant absente du menu de chacun des 5 autres rôles), l'application redirige toujours vers `#/dashboard`, sans erreur console ni réseau. Ce blocage a lieu côté navigateur : je n'ai pas testé si l'API refuse les mêmes données appelées directement (voir le chapitre 6).

**Boutons visibles ou masqués, à confirmer avec les règles métier :**

| Réf. | Rôle | Vue | Constat | Gravité si confirmé |
|---|---|---|---|---|
| M2 | Caissières 1 et 2 | Point de caisse | « Modifier » et « Supprimer » visibles sur des points au statut **Validé**, y compris dans la fiche. | Majeure |
| P1 | Chargé suivi ventes | Journal des ventes | Seul « Voir » est présent. Pas de « + Nouvelle entrée » ni de « Saisir », alors que le gérant les a. Le rôle « suivi ventes » ne peut donc pas tenir le journal. `ventes-02-ventes-journal.png` | Majeure |
| P2 | Caissières 1 et 2 | ASC | Pas de bouton pour demander une ASC, alors que le gérant voit « + Demande ASC (caissière) ». Les demandes existantes ont toutes « Amenan Koffi » (responsable) ou le gérant comme demandeur. `caissiere1-02-caisses-asc.png` | Majeure |
| P3 | Responsable caisse | Point de caisse | La vue est titrée « Vos points de caisse » et reste vide (« Aucun point de caisse enregistré »), alors que les caissières en ont 200 chacune et que le gérant en voit le détail par caissière. La responsable a en revanche « + Nouveau point de caisse ». `responsable-03-caisses-point.png` | Majeure |

**Masquage correct observé :** les caissières et la responsable n'ont ni « Annuler » ni « + ASC directe » sur les ASC (réservés au gérant). La chargée factures n'a aucune vue de caisse ni d'utilisateurs. Les caissières ne voient que leurs propres ASC et leurs propres points.

## 5. Erreurs console et réseau récurrentes

- **Console (niveau error) :** aucune, sur les 41 vues, les 97 accès directs et les 6 pages de connexion.
- **Réseau :** aucun appel en échec (4xx, 5xx ou requête interrompue hors annulation normale).
- **Lenteurs (non bloquantes) :** chargements de 4 à 7 s sur Point de caisse, Journal hebdo, Situation fournisseurs, Récap mensuel et Suivi des factures. Pendant ce temps, des blocs gris de chargement s'affichent, puis les données arrivent.
- **m5 — Mineure, constatée — Curseur dans le titre d'accueil (tous les rôles).** Le titre animé « Bienvenue, <nom> » contient le caractère « | » du curseur clignotant. Il fait partie du texte du titre, donc un lecteur d'écran lit « Bienvenue, Kouassi N'Guessan barre verticale ». Pendant l'animation, le titre est aussi lu tronqué (« Bienvenu| »). Captures : `*-01-dashboard.png`.

## 6. Ce qui n'a pas pu être vérifié

- **Toutes les actions d'écriture**, volontairement non testées : création, modification, suppression, règlement, validation ou refus d'ASC, désactivation, saisie de point de caisse, téléchargement ou impression de PDF. On ne sait donc pas si le serveur refuse les actions des boutons signalés en M2, P1, P2 et P3.
- **Les droits côté API :** le blocage par URL est constaté dans l'interface, pas en appelant directement le serveur avec le jeton d'un rôle limité.
- **La validation et le refus d'ASC par la responsable :** aucune ASC n'était en attente.
- **La déconnexion par le menu utilisateur :** chaque rôle a été testé dans une session de navigateur neuve, la déconnexion n'a donc pas été exercée.
- **Les filtres de date, les listes déroulantes et la recherche :** non manipulés, seuls la pagination, les onglets et l'ouverture des fiches ont été testés. Aucun en-tête de colonne triable n'a été détecté.
- **L'affichage mobile ou tablette :** test fait uniquement en 1440 × 900.
- **La cause du plafond à 100 ou 200 éléments (M1) :** c'est une hypothèse, tirée des nombres ronds et de la contradiction des compteurs, pas une vérification du code ni de l'API.
- **Le suivi en direct :** le test a tourné en script sans fenêtre, car les outils du MCP Playwright n'étaient pas chargés dans la session.
