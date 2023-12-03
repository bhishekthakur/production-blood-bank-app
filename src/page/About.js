// About.js
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-3xl font-semibold text-indigo-600 mb-4">About Us</h2>
      <p className="text-gray-800 leading-7">
        Welcome to our grocery store! We provide the freshest and finest
        groceries to our customers. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit.
      </p>
      <p className="text-gray-800 leading-7 mt-4">
        Our mission is to make grocery shopping easy, convenient, and
        enjoyable. We offer a wide range of products, from fresh produce to
        pantry staples, to cater to your every need.
      </p>
      <p className="text-gray-800 leading-7 mt-4">
        If you have any questions or need assistance, feel free to contact us.
      </p>
      <img
        src="https://plus.unsplash.com/premium_photo-1686360126436-7d5f05e3bf35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" // Replace with your image URL
        alt="Grocery Store"
        className="mx-auto mt-8 rounded-lg shadow-lg max-w-lg"
      />
    </div>
  );
};

export default About;


