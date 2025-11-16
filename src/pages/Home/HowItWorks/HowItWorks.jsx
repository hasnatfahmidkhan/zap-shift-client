import bookingIcon from "../../../assets/bookingIcon.png";
const HowItWorks = () => {
  const cardDetails = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      des: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      des: "We collect payment from customers at the time of delivery and settle the amount with you securely.",
    },
    {
      id: 3,
      title: "Delivery Hub",
      des: "Packages are processed, sorted, and routed through our central hub for fast and organized delivery.",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      des: "Tailored logistics support for small businesses and enterprises with bulk delivery and priority handling.",
    },
  ];
  return (
    <div className="space-y-6 w-full xl:w-11/12 mx-auto">
      <h3 className="heading">How it Works</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cardDetails.map((card) => (
          <div className="bg-base-100 rounded-2xl p-5 space-y-3" key={card.id}>
            <img src={bookingIcon} alt="" />
            <h4 className="text-xl font-semibold text-secondary">
              {card.title}
            </h4>
            <p className="text-accent font-medium text-sm tracking-wide">
              {card.des}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
