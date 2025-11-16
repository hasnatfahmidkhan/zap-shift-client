import liveTracking from "../../../assets/live-tracking.png";
import safeDelivery from "../../../assets/safe-delivery.png";
import deliveryMan from "../../../assets/tiny-deliveryman.png";

const featureImg = [
  {
    title: "Live Parcel Tracking",
    img: liveTracking,
    des: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  },
  {
    img: safeDelivery,
    title: "100% Safe Delivery",
    des: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  },
  {
    img: deliveryMan,
    title: "24/7 Call Center Support",
    des: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  },
];

const FeatureCard = () => {
  return (
    <section className="space-y-6">
      {featureImg.map((card, i) => (
        <div
          key={i}
          className="bg-base-100 rounded-2xl p-7 flex flex-col md:flex-row items-center gap-10 text-secondary "
        >
          <div className="md:border-r-2 md:border-dashed md:pr-10">
            <img className="h-36 w-full object-cover" src={card.img} alt="" loading="lazy" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold ">{card.title}</h2>
            <p className="text-accent font-medium tracking-wide">{card.des}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default FeatureCard;
