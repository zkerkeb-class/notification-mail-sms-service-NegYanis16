# Tests du Service de Notifications

Ce document décrit la structure des tests simples pour le service de notifications.

## 📁 Structure des Tests

```
tests-simples/
├── notifications.test.js    # Tests généraux des notifications
├── services.test.js         # Tests des services (email, SMS)
├── routes.test.js           # Tests des routes API
├── config.test.js           # Tests de configuration
└── middleware.test.js       # Tests des middlewares
```

## 🚀 Exécution des Tests

### Installation des dépendances
```bash
npm install
```

### Lancer tous les tests
```bash
npm test
```

### Lancer les tests en mode watch
```bash
npx jest --watch
```

### Lancer un fichier de test spécifique
```bash
npx jest tests-simples/notifications.test.js
```

## 📋 Description des Tests

### 1. **notifications.test.js**
- Validation des emails et numéros de téléphone
- Validation des messages et sujets
- Types de notifications et priorités
- Configuration des templates
- Gestion des erreurs
- Limites et quotas

### 2. **services.test.js**
- Tests du service d'email
- Configuration SMTP
- Templates d'emails
- Validation des données
- Gestion des erreurs SMTP
- Métriques et monitoring

### 3. **routes.test.js**
- Tests des routes d'email
- Structure des endpoints
- Validation des requêtes
- Gestion des erreurs
- Sécurité des routes
- Limitation de taux

### 4. **config.test.js**
- Configuration des emails
- Variables d'environnement
- Configuration des templates
- Options de sécurité
- Limites et timeouts
- Métriques et alertes

### 5. **middleware.test.js**
- Validation des données
- Limitation de taux
- Authentification et autorisation
- Gestion des erreurs
- Logging et monitoring
- Sécurité et performance

## 🎯 Philosophie des Tests

Ces tests suivent la même approche "simple" que les autres services :
- **Pas de dépendances externes** (base de données, services)
- **Tests basiques** de validation et structure
- **Vérifications d'import** des modules
- **Tests de logique métier** simple
- **Structure organisée** par fonctionnalité

## 🔧 Configuration Jest

Le fichier `jest.config.js` est configuré pour :
- Cibler uniquement les fichiers dans `tests-simples/`
- Utiliser l'environnement Node.js
- Désactiver la collecte de couverture
- Afficher les résultats de manière verbeuse
- Timeout de 10 secondes par test

## 📊 Résultats Attendus

Tous les tests devraient passer avec succès, validant :
- La structure du code
- Les validations de base
- Les configurations
- Les middlewares
- Les routes
- Les services

## 🚨 Dépannage

Si des tests échouent :
1. Vérifier que Jest est installé : `npm install jest`
2. Nettoyer le cache : `npx jest --clearCache`
3. Vérifier les chemins d'import dans les tests
4. S'assurer que tous les fichiers source existent 