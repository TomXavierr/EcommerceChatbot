import { arrowRight } from "../assets/icons";
import Button from "../components/Button";
import { heroimage } from "../assets/images";

const Home = () => {
  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container xl:padding-l wide:padding-r padding-b "
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-8">
        <h1 className="mt-1 font-palanquin text-8xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          Just Launched
        </h1>
        <Button label="Shop Now" iconUrl={arrowRight} />
      </div>
      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-hero bg-cover bg-center">
        <img
          src={heroimage}
          alt="shoe-collection"
          width={610}
          height={300}
          className="object-contain z-10 relative"
        />
      </div>
    </section>
  );
};

export default Home;
