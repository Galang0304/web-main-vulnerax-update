import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    // Konfigurasi transporter Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Gunakan layanan email seperti Gmail
      auth: {
        user: process.env.EMAIL_USER, // Email pengirim
        pass: process.env.EMAIL_PASSWORD, // Password email pengirim
      },
    });

    // Opsi email
    const mailOptions = {
      from: process.env.EMAIL_USER, // Email pengirim
      to: "business@vulnerax.com", // Email penerima
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
      // Kirim email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}