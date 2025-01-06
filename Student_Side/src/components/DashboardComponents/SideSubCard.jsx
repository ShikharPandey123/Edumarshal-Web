import React from "react";
import PropTypes from "prop-types";

export default function SideSubCard(props) {
    console.log(props)
    return (
        <div
            className="flex max-[500px]:translate-x-[5%] justify-between items-center w-[90%] m-auto my-3 mt-5 bg-[#F2F6FF] py-1 px-2 rounded-lg"
            style={{ display: `${props.open ? "flex" : "none"}` }}
        >
            <div className="flex items-center">
                <img
                    className="w-[30px] h-[30px] mr-2"
                    src="./icons/task.png"
                    alt=""
                />
                <div>
                    <p className="text-[10px] font-medium">
                        {props.desc?.slice(0, 20)}
                    </p>
                    <h2 className="text-[8px] text-gray-500">
                        Status - <span>Pending</span>
                    </h2>
                </div>
            </div>
            <h3 className="text-[9px]">4:30pm</h3>
        </div>
    );
}

SideSubCard.propTypes = {
    open: PropTypes.bool.isRequired,
    desc: PropTypes.string
};

SideSubCard.defaultProps = {
    desc: ""
};
