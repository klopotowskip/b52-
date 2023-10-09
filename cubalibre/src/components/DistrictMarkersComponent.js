import React, { useEffect, useState } from "react"
import {Marker} from "react-leaflet";


const onDistrictMarkerClicked = (districtId, districtName, districtCity) => {
  alert("marker clicked " + districtId + ", " + districtName + ", " + districtCity)
}

const DistrictsMarkersComponent = () => {
  const [districts, setDistricts] = useState([])

  const fetchUserData = () => {
    fetch("api/v1/district")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setDistricts(data)
      })
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  return (
    <>
      {districts.map(district => (
        <Marker
            key={district.id}
            position={[
              district.lat,
              district.lon
            ]}
            eventHandlers={{
              click: (e) => {
                onDistrictMarkerClicked(district.id, district.name, district.city)
              },
            }}
        />
      ))}
    </>
  );
}

export default DistrictsMarkersComponent;