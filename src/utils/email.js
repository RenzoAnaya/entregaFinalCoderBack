import nodemailer  from 'nodemailer'
import config from '../config/config.js'

const TEST_EMAIL = 'Dolce@ethereal.email'    

const transporter = nodemailer.createTransport({
    host: config.EMAIL_ETH_HOST,
    port: config.EMAIL_ETH_PORT,
    auth: {
        user: config.EMAIL_ETH_USER,
        pass: config.EMAIL_ETH_PASS,
    },
});

export async function  signUpEmail(newUser){
    const mailOptions = {
          from:'Administradora DOLCE <Dolce@ethereal.email>',
          to: `${newUser.email}`,
          subject: "DOLCE: Confirmacion de cuenta",
          html: `
            <h1>Hola ${newUser. fullname}</h1> 
            <p>Gracias por registrarte en DOLCE</p>
            <p>EMAIL: ${newUser.email}</p>
            <p>Si no creaste esta cuenta puedes ignorar el mensaje</p>
            `
    };
        try{
            await transporter.sendMail(mailOptions);
        }catch(error){
            console.log(`Error al enviar el email: ${error}`);
        }
    };

    export async function checkOutEMail(newOrder){
        const mailOptions = {
            from:'Administradora DOLCE <Dolce@ethereal.email>',
            to: TEST_EMAIL,
            subject: `nuevo pedido de ${newOrder.userName}, ${newOrder.userEmail}`,
            html: `<h1>Pedido</h1>
            ${newOrder.products.map(x=>`<li>${x.products}, cantidad: ${x.quantity}</li>`)}
            `,
        }
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.log(`Error al enviar mail de pedido. ${error}`)
        }
    }