const nodemailer = require('nodemailer');
const mailConfig = require('../config/mailConfig');

const transporter = nodemailer.createTransport(mailConfig);

function buildWelcomeTemplate(userData) {
  const { firstName, lastName, email } = userData;
  const fullName = `${firstName} ${lastName}`;
  
  return `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 24px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2a7ae2; margin: 0;">🎉 Bienvenue ${fullName} !</h1>
        </div>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Nous sommes ravis de vous accueillir dans notre communauté !
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #2a7ae2; margin-top: 0;">Vos informations d'inscription :</h3>
          <p style="margin: 8px 0;"><strong>Nom :</strong> ${fullName}</p>
          <p style="margin: 8px 0;"><strong>Email :</strong> ${email}</p>
        </div>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Votre compte a été créé avec succès. Vous pouvez dès maintenant vous connecter et commencer à utiliser nos services.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #2a7ae2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Se connecter
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          Si vous avez des questions, n'hésitez pas à nous contacter. Notre équipe est là pour vous aider !
        </p>
        
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #888; text-align: center;">
          Cet email vous est envoyé automatiquement suite à votre inscription, merci de ne pas répondre.
        </p>
      </div>
    </div>
  `;
}

function buildHtmlTemplate(content) {
  return `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 24px;">
        <h1 style="color: #2a7ae2;">Bienvenue !</h1>
        <p style="font-size: 16px; color: #333;">${content}</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #888;">Cet email vous est envoyé automatiquement, merci de ne pas répondre.</p>
      </div>
    </div>
  `;
}

function buildPurchaseConfirmationTemplate(purchaseData) {
  const { email, firstName, lastName, quantity, amount, transactionId } = purchaseData;
  const fullName = `${firstName} ${lastName}`;
  
  return `
    <div style="font-family: Arial, sans-serif; background: #f9f9f9; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #eee; padding: 24px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2a7ae2; margin: 0;">🎉 Achat confirmé !</h1>
        </div>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Bonjour ${fullName},<br><br>
          Nous vous confirmons que votre achat de jetons a été traité avec succès !
        </p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="color: #2a7ae2; margin-top: 0;">Détails de votre commande :</h3>
          <p style="margin: 8px 0;"><strong>Pack acheté :</strong> ${quantity} jetons</p>
          <p style="margin: 8px 0;"><strong>Montant payé :</strong> ${amount} €</p>
          <p style="margin: 8px 0;"><strong>Numéro de transaction :</strong> ${transactionId}</p>
          <p style="margin: 8px 0;"><strong>Date :</strong> ${new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        
        <p style="font-size: 16px; color: #333; line-height: 1.6;">
          Vos jetons ont été automatiquement ajoutés à votre compte et sont disponibles immédiatement.
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="#" style="background: #2a7ae2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Voir mes jetons
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          Merci pour votre confiance ! Si vous avez des questions concernant votre achat, n'hésitez pas à nous contacter.
        </p>
        
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #888; text-align: center;">
          Cet email vous est envoyé automatiquement suite à votre achat, merci de ne pas répondre.
        </p>
      </div>
    </div>
  `;
}

async function sendWelcomeEmail(userData) {
  const { email, firstName, lastName } = userData;
  const fullName = `${firstName} ${lastName}`;
  
  const html = buildWelcomeTemplate(userData);
  const subject = `Bienvenue ${fullName} ! Votre compte a été créé avec succès`;
  
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    html,
  });
}

async function sendMail({ to, subject, content }) {
  const html = buildHtmlTemplate(content);
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to,
    subject,
    html,
  });
}

async function sendPurchaseConfirmationEmail(purchaseData) {
  const { email, firstName, lastName, quantity, amount, transactionId } = purchaseData;
  const fullName = `${firstName} ${lastName}`;
  
  const html = buildPurchaseConfirmationTemplate(purchaseData);
  const subject = `Confirmation d'achat - ${quantity} jetons achetés`;
  
  return transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: email,
    subject,
    html,
  });
}

module.exports = { sendMail, sendWelcomeEmail, sendPurchaseConfirmationEmail }; 