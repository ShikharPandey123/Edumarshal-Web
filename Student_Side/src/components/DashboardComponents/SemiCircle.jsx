import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import semiCircleCollection from "../../constants/semiCircleOptions";

export default function SemiCircle(props) {
    const [collection, setCollection] = useState();
    useEffect(() => {
        setCollection(semiCircleCollection(props.att));
    }, [props.att]);
    return (
        <div className="w-[300px]">
            {collection != undefined && (
                <ReactApexChart
                    options={collection?.options}
                    series={collection?.series}
                    type="radialBar"
                />
            )}
        </div>
    );
}
