# Service de Notification par Email

Ce microservice Node.js permet d'envoyer des emails via une API REST sécurisée, incluant des emails de confirmation d'achat automatiques.

## Installation

1. Clonez le dépôt et placez-vous dans le dossier du projet.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :
   ```env
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USER=votre-email@gmail.com
   MAIL_PASS=votre-mot-de-passe-app
   MAIL_FROM=votre-email@gmail.com
   API_KEY=votre-cle-api-secrete
   PORT=3004
   ```

## Lancement

```bash
npm start
```

Le service sera accessible sur `http://localhost:3004`

## Utilisation

### Route POST `/api/mail/send-mail`

Headers requis :
- `Content-Type: application/json`
- `X-API-Key: <votre_cle_api>`

Body JSON :
```json
{
  "to": "destinataire@example.com",
  "subject": "Sujet de l'email",
  "content": "Merci de nous rejoindre !"
}
```

### Route POST `/api/mail/send-welcome-email`

Headers requis :
- `Content-Type: application/json`
- `X-API-Key: <votre_cle_api>`

Body JSON :
```json
{
  "email": "nouveau@example.com",
  "firstName": "Prénom",
  "lastName": "Nom"
}
```

### Route POST `/api/mail/send-purchase-confirmation`

Headers requis :
- `Content-Type: application/json`
- `X-API-Key: <votre_cle_api>`

Body JSON :
```json
{
  "email": "client@example.com",
  "firstName": "Prénom",
  "lastName": "Nom",
  "quantity": 10,
  "amount": "5.00",
  "transactionId": "cs_test_..."
}
```

## Fonctionnalités

- **Email personnalisé** : Template HTML avec contenu personnalisé
- **Email de bienvenue** : Template spécialisé pour les nouveaux utilisateurs
- **Email de confirmation d'achat** : Template avec détails de la transaction
- **Sécurité** : Authentification par clé API
- **Validation** : Vérification des données d'entrée
- **Gestion d'erreurs** : Messages d'erreur détaillés

## Intégration avec le service de paiement

Ce service est automatiquement appelé par le service de paiement après un achat réussi de jetons. L'email de confirmation contient :

- Les détails de la commande (quantité de jetons, montant)
- Le numéro de transaction Stripe
- La date d'achat
- Un design professionnel responsive

## Réponses possibles
- `200` : Email envoyé avec succès
- `400` : Erreur de validation ou adresse email invalide
- `401` : Clé API manquante ou invalide
- `502` : Erreur lors de l'envoi SMTP
- `404` : Route non trouvée

## Structure du projet

- `src/routes/` : Définition des routes Express
- `src/services/` : Service d'envoi d'email
- `src/middleware/` : Middlewares de validation et sécurité
- `src/config/` : Configuration de nodemailer 