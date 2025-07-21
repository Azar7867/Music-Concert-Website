import nodemailer from 'nodemailer';

export const sendTicketEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mohamedazardeen7867@gmail.com',       
        pass: 'klab ffiu ewgh vhml'             
      }
    });

    const mailOptions = {
      from: '"Azardeen Concerts" <yourgmail@gmail.com>',
      to,
      subject,
      text,
      html
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Email sending failed', error });
  }
};
