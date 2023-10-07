import React from "react";

class SidebarComponent extends React.Component{
    render(){
        return <div className="sidebar-component">
            <a className="btn-floating btn-large waves-effect waves-light red sidebar-component__close-button"><i className="material-icons">close</i></a>

            <h2 className="sidebar-component__title">Dzielnica</h2>
            <h3 className="sidebar-component__subtitle">Miasto</h3>
        </div>
    }
}

export default SidebarComponent