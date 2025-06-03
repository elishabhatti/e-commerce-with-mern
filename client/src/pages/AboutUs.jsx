import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full mx-auto p-6 text-gray-800 px-30">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <div className="my-2">
        <img
          className="w-full h-[550px] object-cover rounded-sm"
          src="https://i.pinimg.com/736x/45/ab/91/45ab9120a4a92d3d140f320111e65cb1.jpg"
          alt=""
        />
      </div>
      <p className="mb-4">
        Welcome to <strong>Devias</strong> – your trusted destination for
        high-quality, stylish, and affordable furniture. At Devias, we believe
        your home should be a reflection of who you are — comfortable,
        beautiful, and built to last.
      </p>

      <p className="mb-4">
        Founded in 2025, our mission has been simple: to make beautifully
        crafted furniture accessible to everyone. Whether you're furnishing your
        first apartment or upgrading your forever home, we're here to help you
        create spaces that feel just right.
      </p>

      <p className="mb-4">
        Every piece in our collection is carefully selected with quality,
        sustainability, and timeless design in mind. From cozy sofas to elegant
        dining sets and functional office furniture, we work with experienced
        artisans and trusted manufacturers to bring your vision to life.
      </p>

      <p className="mb-4">
        What sets us apart? It's our commitment to customer satisfaction, fast
        and reliable delivery, and exceptional after-sale support. We’re not
        just selling furniture — we’re helping you build a home.
      </p>

      <p className="mb-4">
        Thank you for choosing Devias. We’re honored to be a part of your home’s
        story.
      </p>

      <p className="font-semibold">- The Devias Team</p>
    </div>
  );
};

export default AboutUs;
