/* eslint-disable react/prop-types */

import { useState } from "react"
import { useBillsContext } from "../../contexts/billsContext";


const FilterAmount = () => {
    const { filterObj } = useBillsContext();
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(4000);

    const minRange = document.getElementById('minRange');
    const minRangeVal = document.getElementById('minRangeVal');

    const maxRange = document.getElementById('maxRange');
    const maxRangeVal = document.getElementById('maxRangeVal');

    const handleMinValue = (e) => {
        setMinValue(parseInt(e.target.value))
        filterObj.minValue = minValue
        minRangeVal.value = minValue
        minRange.value = minValue
    }

    const handleMaxValue = (e) => {
        setMaxValue(parseInt(e.target.value))
        filterObj.maxValue = maxValue
        maxRangeVal.value = maxValue
        maxRange.value = maxValue
    }

    return (
        <section className="filter-amount container m-auto">
            <div className="row">

                <div className="col-12">
                    <div className="row price-range">

                        <div className="col-6 min-range">
                            <input type="range" className="form-range" id="minRange" min="0" max="4000" value={filterObj.minValue || minValue} onChange={handleMinValue}/>

                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="minField">Min &#128178;</span>
                                <input type="number" className="form-control" id="minRangeVal" aria-label="Username" aria-describedby="minField" value={filterObj.minValue || minValue} onChange={handleMinValue}/>
                            </div>
                        </div>

                        <div className="col-6 max-range">
                            <input type="range" className="form-range" id="maxRange" min="0" max="4000" value={filterObj.maxValue || maxValue} onChange={handleMaxValue}/>

                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text" id="maxField">Max &#128178;</span>
                                <input type="number" className="form-control" id="maxRangeVal" aria-label="Username" aria-describedby="maxField" value={filterObj.maxValue || maxValue} onChange={handleMaxValue}/>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-12 d-flex mt-4">
                    <div className="btn-group m-auto" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="amount" id="date-asc" autoComplete="off" value="amount" onChange={(e) => filterObj.amount = e.target.value}  />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="date-asc">Ascending &uarr;</label>

                        <input type="radio" className="btn-check" name="amount" id="date-desc" autoComplete="off" value="-amount" onChange={(e) => filterObj.amount = e.target.value}  />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="date-desc">Descending &darr;</label>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default FilterAmount
