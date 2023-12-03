// ContactUs.js
import React from 'react';

const ContactUs = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-indigo-600 mb-4">Contact Us</h2>
      <p className="text-gray-800 leading-7">
        We'd love to hear from you! If you have any questions or feedback, please
        get in touch with us using the contact information below.
      </p>
      <div className="mt-6">
        <p className="text-gray-800">
          Email: <a href="mailto:contact@example.com" className="text-indigo-600 hover:underline">abhishekkumar620310@gmail.com</a>
        </p>
        <p className="text-gray-800">
          Phone: <a href="tel:123-456-7890" className="text-indigo-600 hover:underline">6203109188</a>
        </p>
        <p className="text-gray-800">
          Address: 168 club road, Punjabi bagh, New Delhi, India
        </p>
      </div>
    </div>
  );
};

export default ContactUs;


