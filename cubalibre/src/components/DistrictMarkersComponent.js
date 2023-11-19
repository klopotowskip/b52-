import React, {useEffect, useState} from "react"
import {Marker} from "react-leaflet";
import {Icon} from 'leaflet';

const houseIcon = new Icon ({
    iconUrl : 'http://localhost/static/house.svg',
    iconSize : [25,25], // size of the icon
});

const houseSelectedIcon = new Icon ({
    iconUrl : 'http://localhost/static/house-selected.svg',
    iconSize : [25,25], // size of the icon
});

let lastSelectedMarker = null;

const DistrictsMarkersComponent = ({data, setData}) => {

    const [districts, setDistricts] = useState([])

    if(data.id == null && lastSelectedMarker != null){
        lastSelectedMarker.setIcon(houseIcon);
        lastSelectedMarker = null;
    }

    const onDistrictMarkerClicked = (e, districtId, districtName, districtCity) => {
        if(lastSelectedMarker != null){
            lastSelectedMarker.setIcon(houseIcon);
        }
        lastSelectedMarker = e.target;
        lastSelectedMarker.setIcon(houseSelectedIcon);

        setData({
            "id": districtId, "name": districtName, "city": districtCity
        });
    }

    const fetchUserData = () => {
        ////TODO  Add error handling feedback
        fetch("api/v1/district")
            .then(response => {
                return response.json()
            })
            .then(data => {
                setDistricts(data)
            })
            .catch(() => {
                alert("Error while fetching districts!");
            })
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    return (<>
            {districts.map(district => (<Marker
                    key={district.id}
                    position={[district.lat, district.lon]}
                    icon={houseIcon}
                    eventHandlers={{
                        click: (e) => {
                            onDistrictMarkerClicked(e, district.id, district.name, district.city)
                        },
                    }}
                />))}
        </>);
}

export default DistrictsMarkersComponent;