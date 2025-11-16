import { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";
import { FaSearch } from "react-icons/fa";

const Coverage = () => {
  const centers = useLoaderData();
  const mapRef = useRef(null);
  const position = [23.685, 90.3563];

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    console.log(location);
    const district = centers.find((center) =>
      center.district.toLowerCase().includes(location.trim().toLowerCase())
    );
    console.log(district);
    if (district) {
      const crod = [district.latitude, district.longitude];
      mapRef.current.flyTo(crod, 14);
    }
  };
  return (
    <section className="bg-base-100 rounded-4xl p-5 md:p-10 ">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-8 md:mb-10">
          We are available in 64 districts
        </h2>
        <form onSubmit={handleSearch} className="max-w-md">
          <div className="join w-full">
            <label className="input focus-within:border-secondary join-item focus-within:outline-none rounded-l-full bg-[#cbd5e14d] w-full">
              <FaSearch />
              <input
                className="w-full"
                name="location"
                type="search"
                placeholder="Search here"
                required
              />
            </label>
            <button
              type="submit"
              className="btn btn-primary text-secondary rounded-r-full font-semibold text-lg px-5 join-item"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="divider my-8 md:my-10"></div>

      <div className="">
        <h3 className="heading">We deliver almost all over Bangladesh</h3>

        <MapContainer
          className="h-[300px] md:h-[800px] mt-10 rounded-2xl"
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {centers.map((center, i) => (
            <Marker position={[center.latitude, center.longitude]} key={i}>
              <Popup>
                <strong>{center.district}</strong> <br />
                <span>Service Area: {center.covered_area.join(", ")}</span>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
