import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./style.scss";
import mapCartIcon from "../../assets/mapCart.svg";
const { VITE_MAP_KEY: mapKey } = import.meta.env;
const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ locations, center, zoom }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: mapKey,
  });

  return isLoaded ? (
    <div className="rounded-[20px] overflow-hidden ">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {locations?.map((item, index) => (
          <Marker key={index} position={item} icon={{ url: mapCartIcon }} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default Map;
