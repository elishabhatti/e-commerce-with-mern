import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 text-gray-800">
      {/* Hero Image */}
      <div className="mb-10">
        <img
          className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow-md"
          src="https://img.freepik.com/premium-vector/diverse-creative-team-looking-happy-flat-vector-illustration-white-background_674398-1414.jpg?semt=ais_items_boosted&w=740"
          alt="Hero Furniture Banner"
        />
      </div>

      <h1 className="text-4xl font-bold mb-20 text-center">About Us</h1>

      {/* Section 1: Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-20">
        <div>
          <p className="mb-4 text-lg leading-relaxed">
            At <strong>Devias</strong>, we don’t just sell furniture — we help
            you build a home. With a passion for purposeful design and a
            commitment to craftsmanship, we offer furniture that’s both stylish
            and functional.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            Founded in 2025, Devias started as a small family-run studio with a
            single goal: to make quality furniture accessible to everyone. Today,
            we serve thousands of customers across the country who trust us to
            provide timeless pieces that elevate their everyday spaces.
          </p>
          <p className="mb-4 text-lg leading-relaxed">
            We work with ethical suppliers, use eco-conscious materials, and aim
            to reduce our footprint with recyclable packaging and sustainable
            logistics.
          </p>
          <p className="font-semibold text-lg mt-6">– The Devias Team</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            className="w-full h-48 object-cover rounded-md shadow"
            src="https://img.freepik.com/premium-vector/back-school-college-students-with-book-laptop_316839-6091.jpg?semt=ais_items_boosted&w=740"
            alt="Living room setup"
          />
          <img
            className="w-full h-48 object-cover rounded-md shadow"
            src="https://static.vecteezy.com/system/resources/thumbnails/002/723/694/small/helping-hand-concept-illustration-worker-helping-each-other-for-business-group-free-vector.jpg"
            alt="Dining room furniture"
          />
          <img
            className="w-full h-48 object-cover rounded-md shadow"
            src="https://img.freepik.com/free-vector/employees-giving-hands-helping-colleagues-walk-upstairs_74855-5236.jpg"
            alt="Home office desk"
          />
          <img
            className="w-full h-48 object-cover rounded-md shadow"
            src="https://img.freepik.com/premium-vector/goal-focused-help-overcoming-obstacles-flat-modern-design-illustration_566886-16.jpg"
            alt="Bedroom furniture"
          />
        </div>
      </div>

      {/* Section 2: Our Values */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
        <div className="order-2 md:order-1">
          <ul className="list-disc ml-5 text-lg leading-relaxed space-y-4">
            <li>
              <strong>Quality First:</strong> Every product we offer is
              meticulously tested and crafted to ensure long-lasting durability
              and exceptional comfort.
            </li>
            <li>
              <strong>Sustainability:</strong> We prioritize eco-friendly
              materials and ethical manufacturing practices that respect the
              planet.
            </li>
            <li>
              <strong>Customer-Centric:</strong> We listen, we adapt, and we
              always put our customers’ needs first.
            </li>
            <li>
              <strong>Design for Life:</strong> Our furniture is made to
              complement the evolving lifestyles of our diverse customers.
            </li>
          </ul>
        </div>
        <div className="order-1 md:order-2">
          <img
            className="w-full h-[400px] object-cover rounded-md shadow"
            src="https://media.istockphoto.com/id/1306949457/vector/people-searching-for-creative-solutions-teamwork-business-concept-modern-vector-illustration.jpg?s=612x612&w=0&k=20&c=sn3zEkT0ft7FsKk2Rp6PdsJqT5ZPOCqrQSgzoGeTp64="
            alt="Crafting furniture"
          />
        </div>
      </div>

      {/* Section 3: Why Choose Us */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <img
            className="w-full h-[400px] object-cover rounded-md shadow"
            src="https://img.freepik.com/premium-vector/two-men-running-up-hill-reach-target-two-mans-goal-focused-increase-motivation-way-achieve-goal-support-teamwork-simple-minimalist-flat-vector-illustration_538213-119386.jpg"
            alt="Furniture showroom"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Choose Devias?</h2>
          <p className="mb-4 text-lg leading-relaxed">
            Choosing Devias means choosing reliability, innovation, and care.
            We're more than just a brand — we're a partner in helping you shape
            the spaces you love most.
          </p>
          <ul className="list-disc ml-5 text-lg leading-relaxed space-y-3">
            <li>Fast, secure, and eco-conscious shipping</li>
            <li>Custom recommendations and design advice</li>
            <li>Easy returns and responsive customer support</li>
            <li>1000+ happy customers and growing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
