# Service de Notifications (Email/SMS)

## 📋 Description

Microservice de notifications pour l'envoi d'emails et de SMS dans la plateforme éducative. Gère les templates, la validation, la sécurité et le monitoring des envois de notifications.

## 🏗️ Architecture

- **Type** : Microservice Node.js
- **Email** : Nodemailer avec support SMTP
- **SMS** : Intégration avec services SMS (Twilio, etc.)
- **Templates** : Système de templates HTML/text
- **API** : REST API Express.js
- **Validation** : Express-validator

## 🚀 Installation et Démarrage

### Prérequis
- Node.js 16+
- Serveur SMTP (Gmail, SendGrid, etc.)
- Compte SMS (optionnel)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone [url-du-repo]

# Installer les dépendances
cd notification-mail-sms-service-NegYanis16
npm install

# Configuration des variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres
```

### Variables d'environnement
```env
# Configuration SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre_email@gmail.com
SMTP_PASS=votre_mot_de_passe_app
SMTP_SECURE=false

# Configuration d'envoi
FROM_EMAIL=noreply@votreplateforme.com
FROM_NAME=Votre Plateforme Éducative

# Configuration SMS (optionnel)
TWILIO_ACCOUNT_SID=votre_account_sid
TWILIO_AUTH_TOKEN=votre_auth_token
TWILIO_PHONE_NUMBER=votre_numero_twilio

# Serveur
PORT=3003
NODE_ENV=development

# Limites et quotas
MAX_EMAILS_PER_HOUR=100
MAX_SMS_PER_HOUR=50
MAX_MESSAGE_LENGTH=1000
```

### Démarrage
```bash
# Mode développement
npm run dev

# Mode production
npm start

# Tests
npm test
```

## 📧 Fonctionnalités Email

### Types d'Emails
- **Emails de bienvenue** : Accueil nouveaux utilisateurs
- **Réinitialisation mot de passe** : Sécurisé avec tokens
- **Vérification de compte** : Confirmation email
- **Notifications** : Rappels, alertes, informations
- **Emails transactionnels** : Confirmations d'actions

### Templates
- **HTML Responsive** : Compatible tous appareils
- **Variables dynamiques** : Personnalisation par utilisateur
- **Thèmes** : Design cohérent avec la plateforme
- **Localisation** : Support multi-langues

### Configuration SMTP
- **Gmail** : Configuration OAuth2
- **SendGrid** : API key
- **Amazon SES** : AWS credentials
- **SMTP personnalisé** : Serveur interne

## 📱 Fonctionnalités SMS

### Types de SMS
- **Codes de vérification** : Authentification 2FA
- **Alertes** : Notifications urgentes
- **Rappels** : Rappels de quiz, événements
- **Statuts** : Confirmations d'actions

### Services SMS Supportés
- **Twilio** : International, fiable
- **Vonage** : Anciennement Nexmo
- **MessageBird** : Européen
- **SMS personnalisé** : API interne

## 🔌 API Endpoints

### Emails
- `POST /api/mail/send` - Envoi d'email simple
- `POST /api/mail/send-template` - Envoi avec template
- `POST /api/mail/send-bulk` - Envoi en masse
- `GET /api/mail/status/:id` - Statut d'envoi
- `GET /api/mail/history` - Historique des envois

### SMS
- `POST /api/sms/send` - Envoi de SMS
- `POST /api/sms/send-bulk` - Envoi en masse
- `GET /api/sms/status/:id` - Statut d'envoi
- `GET /api/sms/history` - Historique des envois

### Templates
- `GET /api/templates` - Liste des templates
- `GET /api/templates/:id` - Détails d'un template
- `POST /api/templates` - Créer un template
- `PUT /api/templates/:id` - Modifier un template

### Métriques
- `GET /api/metrics` - Métriques d'envoi
- `GET /api/health` - Santé du service

## 🧪 Tests

### Structure des tests
```
tests-simples/
├── notifications.test.js    # Tests généraux
├── services.test.js         # Tests des services
├── routes.test.js           # Tests des routes
├── config.test.js           # Tests de configuration
└── middleware.test.js       # Tests des middlewares
```

### Exécution des tests
```bash
# Tous les tests
npm test

# Tests en mode watch
npx jest --watch

# Tests avec couverture
npx jest --coverage
```

## 🔒 Sécurité

### Mesures OWASP implémentées
- ✅ **Injection** : Validation des entrées + sanitisation
- ✅ **Authentification** : API keys + rate limiting
- ✅ **Exposition de données** : Champs sensibles masqués
- ✅ **Contrôles d'accès** : Middleware d'autorisation
- ✅ **Configuration** : Variables d'environnement sécurisées
- ✅ **XSS** : En-têtes de sécurité + validation
- ✅ **Logging** : Traçabilité des envois

### Middlewares de sécurité
- Helmet (en-têtes de sécurité)
- CORS configuré et sécurisé
- Rate limiting par IP et utilisateur
- Validation des entrées avec express-validator
- Sanitisation des données
- Protection contre le spam

### Validation des données
- **Emails** : Format, domaine, blacklist
- **SMS** : Format international, longueur
- **Contenu** : Filtrage de contenu malveillant
- **Destinataires** : Vérification des listes

## 📊 Modèles de Données

### Email
- **Destinataire** : email, nom
- **Contenu** : sujet, texte, HTML
- **Métadonnées** : template, variables, priorité
- **Statut** : en attente, envoyé, échec

### SMS
- **Destinataire** : numéro de téléphone
- **Contenu** : message texte
- **Métadonnées** : template, variables
- **Statut** : en attente, envoyé, échec

### Template
- **Nom** : identifiant unique
- **Type** : email ou SMS
- **Contenu** : HTML/text avec variables
- **Variables** : liste des variables supportées

## 📈 Performance et Monitoring

### Métriques
- **Taux d'envoi** : succès/échecs
- **Temps de réponse** : latence d'envoi
- **Quotas** : utilisation des limites
- **Qualité** : délivrabilité, bounces

### Optimisations
- **Queue d'envoi** : Gestion asynchrone
- **Retry automatique** : Tentatives en cas d'échec
- **Cache des templates** : Chargement optimisé
- **Pool de connexions** : SMTP optimisé

### Alertes
- **Taux d'échec élevé** : > 5%
- **Quota dépassé** : Limites atteintes
- **Service indisponible** : Problèmes SMTP/SMS
- **Performance dégradée** : Latence élevée

## 🚨 Dépannage

### Problèmes courants
1. **SMTP** : Vérifier les credentials et la configuration
2. **Quotas** : Respecter les limites d'envoi
3. **Spam** : Vérifier la réputation IP
4. **Templates** : Valider la syntaxe des variables
5. **Tests qui échouent** : Nettoyer le cache Jest

### Logs
Les logs sont disponibles dans :
- Console (développement)
- Fichiers (production)
- Winston (structurés)
- Métriques d'envoi

## 🔄 Déploiement

### Environnements
- **Development** : `npm run dev`
- **Production** : `npm start`
- **Test** : `npm test`

### Docker (optionnel)
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3003
CMD ["npm", "start"]
```

## 📞 Support

- **Documentation** : Ce README
- **Issues** : Repository GitHub
- **Tests** : Suite de tests complète
- **Logs** : Winston + Console
- **Métriques** : Dashboard d'envoi

## 📝 Changelog

### Version 1.0.0
- ✅ Envoi d'emails SMTP
- ✅ Templates HTML/text
- ✅ Validation des données
- ✅ Tests unitaires
- ✅ Sécurité OWASP
- ✅ Documentation

---

**Développé avec ❤️ par NegYanis16** 