/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

const columnDefs = [
    { headerName: "Make", field: "make" },
    { headerName: "Model", field: "model", sort: "desc" },
    { headerName: "Price", field: "price" },
];

const rowData = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxter", price: 72000 },
];

const defaultColDef = {
    editable: false,
    flex: 1,
    filter: false,
    sortable: true,
};

const App = () => {
    const [data, setdata] = useState([]);
    const [filterData, setfilterData] = useState([]);
    const [filter, setfilter] = useState({
        make: "",
        model: "",
        price: "",
        filtering: false,
    });
    useEffect(async () => {
        if (filter.filtering) {
            const fd = await data.filter((i) => {
                return (
                    i.make.toLowerCase().includes(filter.make) &&
                    i.model.includes(filter.model) &&
                    i?.price.toString().includes(filter.price.toString())
                );
            });
            setfilterData(fd);
            setfilter({ ...filter, filtering: false });
        }
    }, [filter]);
    useEffect(() => {
        setdata(rowData);
        setfilterData(rowData);
    }, []);
    return (
        <div className="App">
            Make:&nbsp;
            <input
                type="text"
                name="make"
                id="make"
                value={filter.make}
                onChange={(e) =>
                    setfilter({
                        ...filter,
                        make: e.target.value.toLowerCase(),
                        filtering: true,
                    })
                }
            />
            Model:&nbsp;
            <input
                type="text"
                name="model"
                id="model"
                value={filter.model}
                onChange={(e) =>
                    setfilter({
                        ...filter,
                        model: e.target.value.toLowerCase(),
                        filtering: true,
                    })
                }
            />
            Price:&nbsp;
            <input
                type="number"
                name="price"
                id="price"
                value={filter.price}
                onChange={(e) =>
                    setfilter({
                        ...filter,
                        price: e.target.value.toLowerCase(),
                        filtering: true,
                    })
                }
            />
            <br></br>
            <br></br>
            <div
                className="ag-theme-balham margin10"
                style={{ height: "200px", width: "600px" }}
            >
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={filterData}
                    defaultColDef={defaultColDef}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default App;
