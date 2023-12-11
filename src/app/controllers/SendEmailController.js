const { json } = require('sequelize');
const EmailStyleModel = require('../models/EmailStyleModel');
const nodemailer = require('nodemailer');
const axios = require('axios');
require('dotenv').config(); // Carregue as variáveis de ambiente


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'fabio.nogueira.carmo@gmail.com',
      pass: process.env.PASS_WORD, // Use a variável de ambiente
    },
});


const imageUrl = 'https://assets.bitdegree.org/online-learning-platforms/storage/media/2018/08/what-is-a-web-developer.jpg';

class SendEmailController {
    async send(req, res) {
        try {
            const { to, subject, text } = req.body;

            // Configurar o e-mail
            const mailOptions = {
                from: 'fabio.nogueira.carmo@gmail.com',
                to: to,
                subject: subject,
                html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
                </head>
                <body>
                <div class="container">
                    <div class="card mt-4">
                        <div class="card-body">
                            <h1 class="card-title">Olá, seja muito bem-vindo</h1>
                            <div class="border rounded overflow-hidden mt-3">
                                <img src="${imageUrl}" alt="Desenvolvimento Web" class="card-img-top rounded" style="width: 100%;">
                                <div class="card-body">
                                    <p class="card-text">Estamos animados com o desenvolvimento web!</p>
                                    <p class="card-text">Responderemos o mais breve possível. Ficamos felizes em ter sido lembrados!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
                </body>
                </html>
              `,
            };

            await transporter.sendMail(mailOptions);

            res.json({
                msg: 'Email enviado com sucesso!',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Erro ao enviar o e-mail.' });
        }
    }
}

module.exports = new SendEmailController();
