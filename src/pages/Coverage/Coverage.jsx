import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const centers = useLoaderData();
  console.log(centers);
  return (
    <section className="bg-base-100 rounded-4xl p-5 md:p-10 h-[620px] md:h-[1100px]">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-secondary">
          We are available in 64 districts
        </h2>
        <div className="join my-5 md:my-10">
          <div>
            <label className="input validator join-item focus-within:outline-none rounded-l-full bg-[#cbd5e14d]">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">Search here</div>
          </div>
          <button className="btn btn-primary text-secondary rounded-r-full font-semibold text-lg px-7 join-item">
            Search
          </button>
        </div>
      </div>

      <div className="h-[300px] md:h-[800px] ">
        <h3 className="heading">We deliver almost all over Bangladesh</h3>

        <MapContainer
          className="h-full mt-10 rounded-2xl"
          center={[23.685, 90.3563]}
          zoom={8}
          scrollWheelZoom={false}
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
