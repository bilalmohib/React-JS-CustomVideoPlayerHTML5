import React from "react";

const DropDown = () => {
    return (
        <>
            {/* Default dropleft button */}
            <div className="btn-group dropstart">
                <button type="button" className="btn btn-primary dropdown-toggle" data-mdb-toggle="dropdown" aria-expanded="false">
                    Dropleft
                </button>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Separated link</a></li>
                </ul>
            </div>
        </>
    )
}
export default DropDown;