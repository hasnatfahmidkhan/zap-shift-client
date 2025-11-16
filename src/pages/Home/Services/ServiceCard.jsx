import serviceImg from "../../../assets/service.png";
const ServiceCard = ({ service }) => {
  const { title, des } = service;
  return (
    <div
      className="flex flex-col text-center items-center justify-center gap-4 rounded-2xl p-5 
         bg-base-100 hover:bg-primary transition-colors duration-300"
    >
      <div className="bg-linear-to-b from-[#EEEDFC] to-[#EEEDFC] p-5  flex items-center justify-center rounded-full">
        <img src={serviceImg} alt="" />
      </div>
      <h4 className="text-secondary text-2xl font-bold">{title}</h4>
      <p className="text-accent">{des}</p>
    </div>
  );
};

export default ServiceCard;
