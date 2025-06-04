import React from "react";

const Services = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 text-gray-800">
      {/* Hero Section */}
      <div className="mb-10 relative">
        <div className="absolute top-10 left-10 text-black text-4xl font-bold drop-shadow-lg">
        <h1>Services</h1>
        </div>
        <img
          className="w-full h-[350px] md:h-[500px] object-cover rounded-lg shadow"
          src="https://cdni.iconscout.com/illustration/premium/thumb/relocation-service-worker-loaders-loading-furniture-illustration-download-in-svg-png-gif-file-formats--house-moving-services-picking-up-sofa-couch-delivery-guys-industries-pack-people-illustrations-4315399.png?f=webp"
          alt="Our Services"
        />
      </div>

      <h1 className="text-4xl font-bold mb-16 text-center">Our Services</h1>

      {/* Services Offered */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        {[
          {
            title: "Interior Design",
            desc: "Transform your space with our expert interior styling services.",
            img: "https://img.freepik.com/premium-vector/furniture-store-customer-service-cartoon-composition-with-young-family-packing-purchased-chairs-home-delivery-vector-illustration_1284-69260.jpg",
          },
          {
            title: "Custom Furniture",
            desc: "We craft bespoke furniture tailored to your space and vision.",
            img: "https://thumbs.dreamstime.com/b/home-repair-builders-making-house-renovation-workers-fixing-installing-new-furniture-exact-vector-cartoon-people-original-348112848.jpg",
          },
          {
            title: "Delivery & Assembly",
            desc: "Fast, secure delivery and professional in-home furniture setup.",
            img: "https://static.vecteezy.com/system/resources/previews/004/379/120/non_2x/furniture-delivery-service-flat-illustration-warehouse-workers-carrying-sofa-cartoon-characters-isolated-on-white-background-courier-deliveryman-loader-men-delivered-couch-shipping-concept-vector.jpg",
          },
        ].map((service, i) => (
          <div
            key={i}
            className="rounded-lg shadow hover:shadow-lg transition p-4 bg-white"
          >
            <img
              src={service.img}
              alt={service.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Why Us Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Work With Devias?</h2>
          <ul className="list-disc ml-5 text-lg leading-relaxed space-y-3">
            <li>End-to-end service from consultation to installation</li>
            <li>Eco-friendly and ethically sourced materials</li>
            <li>Experienced designers and craftsmen</li>
            <li>100% satisfaction guaranteed</li>
          </ul>
        </div>
        <div>
          <img
            className="w-full h-[400px] object-cover rounded-md shadow"
            src="https://img.freepik.com/free-vector/colleagues-working-together-project_74855-6308.jpg"
            alt="Team at work"
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
