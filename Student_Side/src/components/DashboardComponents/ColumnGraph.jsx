import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import columnCollection from "../../constants/columnGraphOptions";

export default function ColumnGraph(props) {
    const [collection, setCollection] = useState();

    useEffect(() => {
        let classes = [];
        let total = [];
        let subjects = [];
        props.array.forEach((element) => {
            total.push(element.totalClasses);
            classes.push(element.totalPresent);
            subjects.push(element.subject);
        });
        setCollection(columnCollection(classes, total, subjects));
    }, [props.array]);

    return (
        <div className="w-full">
            {collection != undefined && (
                <ReactApexChart
                    options={collection?.options}
                    series={collection?.series}
                    type="bar"
                    height={250}
                />
            )}
        </div>
    );
}
