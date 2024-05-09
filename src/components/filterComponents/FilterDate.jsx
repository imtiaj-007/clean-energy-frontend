/* eslint-disable react/prop-types */

import { useBillsContext } from "../../contexts/billsContext"

const FilterDate = () => {
    const { filterObj } = useBillsContext();

    return (
        <section className="filter-date container">
            <div className="row">

                <div className="col-12 d-flex flex-column ">
                    <div className="input-group input-group-sm mb-3">
                        <button className="btn btn-outline-secondary btn-sm btn-range" type="button" >Start</button>
                        <input type="date" className="form-control" aria-describedby="start-date" name="startDate" onChange={(e)=> filterObj.startDate = e.target.value} value={filterObj.startDate} />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <button className="btn btn-outline-secondary btn-sm btn-range" type="button" >End</button>
                        <input type="date" className="form-control" aria-describedby="end-date" name="endDate" onChange={(e)=> filterObj.endDate = e.target.value} value={filterObj.endDate} />
                    </div>
                </div>

                <div className="col-12 d-flex">
                    <div className="btn-group m-auto" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check" name="date" id="date-asc" autoComplete="off" value="date" onChange={(e)=> filterObj.date = e.target.value} />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="date-asc">Ascending &uarr;</label>

                        <input type="radio" className="btn-check" name="date" id="date-desc" autoComplete="off" value="-date" onChange={(e)=> filterObj.date = e.target.value} />
                        <label className="btn btn-outline-secondary btn-sm" htmlFor="date-desc">Descending &darr;</label>

                    </div>
                </div>
            </div>

        </section>
    )
}

export default FilterDate
