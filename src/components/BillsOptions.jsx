/* eslint-disable react/prop-types */

import { useState } from "react"
import { useBillsContext } from "../contexts/billsContext";

import FilterDate from "./filterComponents/FilterDate";
import FilterAmount from "./filterComponents/FilterAmount";
import FilterUnits from "./filterComponents/FilterUnits";
import FilterStatus from "./filterComponents/FilterStatus";

import close from "../assets/close.svg"
import filterClose from "../assets/filter-close.svg"

const BillsOptions = () => {
    const { sendReq, filterObj, clearFilters } = useBillsContext();
    const [viewOption, setViewOption] = useState("Date");
    const [filterBoxVisible, setFilterBoxVisible] = useState(false);

    const showFilters = () => {
        setFilterBoxVisible(true)
    }

    const closeFilters = () => {
        setFilterBoxVisible(false)
    }

    const removeKeyFilter = (e) => {
        let objProp = e.target.parentElement.id;
        delete filterObj[objProp];
        sendReq();
    }

    const toggleComponents = (e) => {
        console.log(e.target.dataset)
        setViewOption(e.target.dataset.name);
    }

    const handleClearFilters = () => {
        closeFilters();
        clearFilters();
    }

    const submitFilters = () => {
        setFilterBoxVisible(false)
        sendReq();
    }

    const searchCustomer = (e) => {
        e.preventDefault();
        setFilterBoxVisible(false)
        sendReq();
        document.getElementById('searchForm').reset();
    }


    return (
        <section className="table-options container mb-3">
            <div className="row">
                <div className="col-8 bill-options gap-2">
                    <button className="btn btn-primary dropdown-toggle" type="button" onClick={showFilters} data-bs-toggle="dropdown" aria-expanded="false">Filters </button>
                    <div className="applied-filters" id="appliedFilters">
                        {
                            Object.keys(filterObj).map(key => {
                                return (
                                    <button type="button" key={key} id={key} className="btn btn-outline-primary btn-sm mx-1" >{key + " "}<img src={filterClose} onClick={removeKeyFilter} /></button>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col-4">
                    <form id="searchForm" className="d-flex" role="search" >
                        <input className="form-control me-2" type="search" placeholder="Customer ID / Email" aria-label="Search" disabled={localStorage.getItem('isAdmin') === 'false'} required onChange={(e) => filterObj.searchID = e.target.value} />
                        <button className="btn btn-success" type="submit" disabled={localStorage.getItem('isAdmin') === 'false'} onClick={searchCustomer}>Search</button>
                    </form>
                </div>
            </div>

            {filterBoxVisible &&
                <section id="filterBox" className="filter-container shadow row ">
                    <div className="filter-heading col-12">
                        <h4>Filters</h4>
                        <i><img src={close} alt="close-button" onClick={closeFilters} /></i>
                    </div>
                    <div className="filter-body col-12">
                        <div className="row">

                            <div className="col-3 filter-sidebar m-auto">
                                <input type="radio" className="btn-check" name="filter-radio-options" id="optionDate" data-name='Date' autoComplete="off" checked={viewOption === 'Date'} onChange={toggleComponents} />
                                <label className="btn btn-outline-primary " htmlFor="optionDate">Date</label>

                                <input type="radio" className="btn-check" name="filter-radio-options" id="optionAmount" data-name='Amount' autoComplete="off" checked={viewOption === 'Amount'} onChange={toggleComponents} />
                                <label className="btn btn-outline-primary " htmlFor="optionAmount">Amount</label>

                                <input type="radio" className="btn-check" name="filter-radio-options" id="optionUnits" data-name='Units' autoComplete="off" checked={viewOption === 'Units'} onChange={toggleComponents} />
                                <label className="btn btn-outline-primary " htmlFor="optionUnits">Units</label>

                                <input type="radio" className="btn-check" name="filter-radio-options" id="optionStatus" data-name='Status' autoComplete="off" checked={viewOption === 'Status'} onChange={toggleComponents} />
                                <label className="btn btn-outline-primary " htmlFor="optionStatus">Status</label>
                            </div>

                            <div className="filter-options col-9 d-flex">
                                {
                                    viewOption === 'Date' && <FilterDate compType={'bill'} /> ||
                                    viewOption === 'Amount' && <FilterAmount compType={'bill'} /> ||
                                    viewOption === 'Units' && <FilterUnits compType={'bill'} /> ||
                                    viewOption === 'Status' && <FilterStatus compType={'bill'} />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="filter-footer col-12">
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleClearFilters}>Clear</button>
                        <button type="button" className="btn btn-primary btn-sm" onClick={submitFilters}>Apply Filter &rarr;</button>
                    </div>
                </section>}
        </section>
    )
}

export default BillsOptions
