import express from 'express';
import Inquiry from '../models/Inquiry.js';
import Subscriber from '../models/Subscriber.js';
import { sendEmail } from '../utils/mailer.js';

const router = express.Router();

// Submit an inquiry
router.post('/inquiries', async (req, res) => {
  try {
    const { name, email, phone, course, message, type } = req.body;
    
    // Save to DB
    const newInquiry = new Inquiry({ name, email, phone, course, message, type });
    await newInquiry.save();

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const subject = `New Inquiry: ${type === 'corporate' ? 'Corporate Training' : 'Course'}`;
    const html = `
      <h3>New Inquiry Received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Course:</strong> ${course || 'N/A'}</p>
      <p><strong>Type:</strong> ${type || 'general'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'N/A'}</p>
    `;
    
    if (adminEmail) {
      await sendEmail({ to: adminEmail, subject, html });
    }

    // Send auto-reply to user
    const userSubject = 'Thank you for your inquiry - RIT Softtech Academy';
    const userHtml = `
      <h3>Hi ${name},</h3>
      <p>Thank you for reaching out to us! We have received your inquiry regarding ${course ? course : 'our courses'}.</p>
      <p>One of our career counselors will get back to you shortly.</p>
      <br>
      <p>Best Regards,</p>
      <p>RIT Softtech Academy Team</p>
    `;
    await sendEmail({ to: email, subject: userSubject, html: userHtml });

    res.status(201).json({ success: true, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Subscribe to newsletter
router.post('/subscribers', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email is already subscribed' });
    }

    // Save to DB
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Send welcome email
    const subject = 'Welcome to RIT Softtech Academy Newsletter';
    const html = `
      <h3>Hi there,</h3>
      <p>Thank you for subscribing to our newsletter!</p>
      <p>You will now receive the latest updates, course announcements, and tech news from RIT Softtech Academy.</p>
      <br>
      <p>Best Regards,</p>
      <p>RIT Softtech Academy Team</p>
    `;
    await sendEmail({ to: email, subject, html });

    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
