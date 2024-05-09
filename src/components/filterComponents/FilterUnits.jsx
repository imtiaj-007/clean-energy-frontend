/* eslint-disable react/prop-types */
import { useState } from "react";
import { useBillsContext } from "../../contexts/billsContext";


const FilterUnits = () => {
    const { filterObj } = useBillsContext();
    const [minUnit, setMinUnit] = useState(0);
    const [maxUnit, setMaxUnit] = useState(500);

    const minUnitRange = document.getElementById('minUnitRange');
    const minUnitRangeVal = document.getElementById('minUnitRangeVal');

    const maxUnitRange = document.getElementById('maxUnitRange');
    const maxUnitRangeVal = document.getElementById('maxUnitRangeVal');

    const handleminUnit = (e) => {
        setMinUnit(parseInt(e.target.value))
        filterObj.minUnit = minUnit
        minUnitRangeVal.value = minUnit
        minUnitRange.value = minUnit
    }

    const handlemaxUnit = (e) => {
        setMaxUnit(parseInt(e.target.value))
        filterObj.maxUnit = maxUnit
        maxUnitRangeVal.value = maxUnit
        maxUnitRange.value = maxUnit
    }

    return (
        <section className="filter-unit container m-auto">
            <div className="row">

                <div className="col-12">
                    <div className="row unit-range">

                        <div className="col-6 min-range">
                            <input type="range" className="form-range" id="minUnitRange" min="0" max="500" value={filterObj.minUnit || minUnit} onChange={handleminUnit}/>

                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="minField">Min &#128161;</span>
                                <input type="number" className="form-control" id="minUnitRangeVal" aria-label="Username" aria-describedby="minField" value={filterObj.minUnit || minUnit} onChange={handleminUnit}/>
                            </div>
                        </div>

                        <div className="col-6 max-range">
                            <input type="range" className="form-range" id="maxUnitRange" min="0" max="500" value={filterObj.maxUnit || maxUnit} onChange={handlemaxUnit}/>

                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="maxField">Max &#128161;</span>
                                <input type="number" className="form-control" id="maxUnitRangeVal" aria-label="Username" aria-describedby="maxField" value={filterObj.maxUnit || maxUnit} onChange={handlemaxUnit}/>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-12 d-flex mt-4">
                    <div className="btn-group m-auto" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="unit" id="unit-asc" autoComplete="off" value="units" onChange={(e) => filterObj.unit = e.target.value} />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="unit-asc">Ascending &uarr;</label>

                        <input type="radio" className="btn-check" name="unit" id="unit-desc" autoComplete="off" value="-units" onChange={(e) => filterObj.unit = e.target.value} />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="unit-desc">Descending &darr;</label>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default FilterUnits
