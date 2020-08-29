require('dotenv').config()
const nodemailer = require('nodemailer');
const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3040');
    next();
});

app.get('/appointment', (req, res) => {
    const namesArr = req.query.names.split('.');
    const timeArr = req.query.time.split('.');
    const emailArr = req.query.emails.split('.');

    let transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASS,
        }
    });

    const message = {
        from: process.env.EMAIL_FROM,
        // to: emailArr[1],
        to: process.env.TEST_EMAIL_TO,
        subject: `One Health Appointment on ${timeArr[0]} at ${timeArr[1]}`,
        text: `
        Doctor ${namesArr[0]} ${namesArr[1]} ${namesArr[2]}
        <br>
        Doctor's email: ${emailArr[0]}
        <br>
        Appointment for ${timeArr[0]} at ${timeArr[1]}
        <br>
        <h3>Zoom</h3>
        Meeting Link: <a href="${req.query.linkurl}">${req.query.linkurl}</a>
        <br>
        Meeting Password: ${req.query.linkpass}
        `,
    };

    transport.sendMail(message, function (err, info) {
        err ?
            res.json(JSON.stringify({
                sent: false,
                message: err
            })) :
            res.json(JSON.stringify({
                sent: true,
                message: info
            }));
    });
});

app.get('/appointmentdelete', (req, res) => {
    const namesArr = req.query.names.split('.');
    const timeArr = req.query.time.split('.');
    const emailArr = req.query.emails.split('.');

    let transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_AUTH_USER,
            pass: process.env.SMTP_AUTH_PASS,
        }
    });

    const message = {
        from: process.env.EMAIL_FROM,
        // to: emailArr[1],
        to: process.env.TEST_EMAIL_TO,
        subject: `One Health Appointment on ${timeArr[0]} at ${timeArr[1]} Cancelled`,
        text: `
        Doctor ${namesArr[0]} ${namesArr[1]} ${namesArr[2]}
        <br>
        Doctor's email: ${emailArr[0]}
        <br>
        Appointment for ${timeArr[0]} at ${timeArr[1]} Cancelled
        <br>
        <h3>Zoom</h3>
        Meeting Link: <a href="${req.query.linkurl}">${req.query.linkurl}</a>
        <br>
        Meeting Password: ${req.query.linkpass}
        `,
    };

    transport.sendMail(message, function (err, info) {
        err ?
            res.json(JSON.stringify({
                sent: false,
                message: err
            })) :
            res.json(JSON.stringify({
                sent: true,
                message: info
            }));
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App running on localhost:${port}`));
