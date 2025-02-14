import config from '../config/default.mjs'
import nodemailer from 'nodemailer'
import fs from 'fs'
import PdfCreator from './PdfCreator.mjs'
import path from 'path'

class MailSender {
  static async sendMail(templatePath, data, mailData) {
    const pdfPath = path.join(process.cwd(), 'main.pdf')
    await PdfCreator.generatePdf(pdfPath, templatePath, data)

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.email.user,
        pass: config.email.pass,
      },
    })

    const mailOptions = {
      from: config.email.user,
      to: mailData.recipientEmail,
      subject: mailData.subject,
      text: mailData.text,
      attachments: [{ path: pdfPath }],
    }

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (err, info) => {
        fs.unlinkSync(pdfPath)
        if (err) return reject(err)
        resolve(info)
      })
    })
  }
}

export default MailSender
