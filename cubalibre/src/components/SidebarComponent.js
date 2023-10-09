import React from "react";


const SidebarComponent = ({data, setData}) => {
    const EMPTY = ({
        "id": null,
        "name": null,
        "city": null
    })
    if(data.id == null) return(<></>);

    const closeSidebar = () => {
        setData(EMPTY)
    }

    return (
        <div className="sidebar-component">
            <button className="btn-floating btn-large waves-effect waves-light red sidebar-component__close-button"><i
                className="material-icons" onClick={closeSidebar}>close</i></button>

            <h2 className="sidebar-component__title">{data.name}</h2>
            <h3 className="sidebar-component__subtitle">{data.city}</h3>
        </div>
    );
}

export default SidebarComponent