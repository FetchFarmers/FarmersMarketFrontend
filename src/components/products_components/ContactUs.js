import React, { useState } from 'react';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name} \nEmail: ${email} \nMessage: ${message}`);
  };

  return (
    <div className="contact">
      <h2 className="contact-heading">Contact Us</h2>
      <p className="contact-text">We'd love to hear from you! Fill out the form below to send us a message:</p>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="contact-form-group">
          <label htmlFor="name" className="contact-form-label">Name:</label>
          <input type="text" id="name" name="name" className="contact-form-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="contact-form-group">
          <label htmlFor="email" className="contact-form-label">Email:</label>
          <input type="text" id="email" name="email" className="contact-form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="contact-form-group">
          <label htmlFor="message" className="contact-form-label">Message:</label>
          <textarea id="message" name="message" className="contact-form-textarea" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>

        <button type="submit" className="contact-form-button">Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
