const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer')
const PORT = process.env.PORT || 3000;


const app = express();

app.use(cors());
app.use(express.json());


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal server error',
    });
});


app.get('/', (req, res) => {
    res.send('Hello World');
})





const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'atirhussain000@gmail.com',
        pass: 'gpej qstp qngx ieds'	
    }
});



app.post('/newmail', async (req, res) => {
    try{
        const {name, email, message} = req.body

        if(!name || !email || !message){
            res.status(400).send("All fields are required")
        }else{
            await transporter.sendMail({
                from: 'atirhussain000@gmail.com',
                to: 'atirhussain00@gmail.com',
                subject: 'Sending Email using Node.js',
                text: 'name: ' + name + '\n' + 'email: ' + email + '\n' + 'message: ' + message
            }, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            await transporter.sendMail({
                from: 'atirhussain000@gmail.com',
                to: email,
                subject: 'Website Design',
                html: `
                <html>
                    <body style="font-family: Arial, sans-serif; color: #333;">
                    <h1>Welcome!</h1>
                    <p>Hi ${name},</p>
                    <p>Thank you for reaching out to us. We have received your message and will get back to you soon.</p>
                    <p>Best regards,<br>Atir Zaidi</p>
                    </body>
                </html>
                `
            }, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });        
            res.status(200).send("mail sent")
        }
    }catch(err){
        res.status(400).send(err)
    }
})


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})