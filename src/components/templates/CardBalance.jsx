import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const CardBalance = ({ data }) => {
  return (
    <>
      {data.map((card, i) => (
        <div className={` ${card.bg} w-[400px] h-40 rounded-3xl pl-5 md:w-90`} key={card.id} data-aos={card.aos} data-aos-delay="100" data-aos-duration="500" data-aos-once="true">
          <div className="flex items-center gap-2">
            {card.icons}
            <h1 className="text-2xl my-5">{card.title} </h1>
          </div>
          <span className="text-3xl font-semibold text-white">Rp.{card.balance?.toLocaleString("id-ID")}</span>
        </div>
      ))}
    </>
  );
};

export default CardBalance;
