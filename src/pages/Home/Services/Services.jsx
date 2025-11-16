import ServiceCard from "./ServiceCard";

const Services = () => {
  const serviceDetails = [
    {
      id: 1,
      title: "Express  & Standard Delivery",
      des: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      des: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      des: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      id: 4,
      title: "Cash on Home Delivery",
      des: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      id: 5,
      title: "Corporate Service / Contract In Logistics",
      des: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      id: 6,
      title: "Parcel Return",
      des: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <section className="bg-secondary p-6 md:p-20 rounded-4xl">
      <div className="text-center md:w-2/3 mx-auto space-y-3">
        <h3 className="text-base-100 text-4xl font-extrabold">Our Service</h3>
        <p className="text-accent-content tracking-wide">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
        {serviceDetails.map((service) => (
          <ServiceCard service={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;
