/* eslint-disable react/no-unescaped-entities */
import solar from '../assets/greenHouse.png'
import wind from '../assets/windmill.png'
import nuclear from '../assets/nuclear.png'
import geothermal from '../assets/geoThermal.png'


const Services = () => {
    return (
        <section className="services container-fluid my-5">
            <div className="container text-center p-5">
                <h2 className="mb-5">Our Services</h2>
                <div className="service-cards row g-5">
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="card shadow">
                            <h5 className="card-title">Solar Energy</h5>
                            <img src={solar} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">The sun provides more energy to the Earth in one hour than the world uses in one year, making electricity from solar power an essential energy source in the move to clean energy production.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="card shadow">
                            <h5 className="card-title">Wind Energy</h5>
                            <img src={wind} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Wind energy is a clean source of energy because it doesn't rely on fossil fuels to power the turbines, so it doesn't contribute to global warming and climate change.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="card shadow">
                            <h5 className="card-title">Nuclear Energy</h5>
                            <img src={nuclear} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Nuclear power is a low-carbon source of energy, because unlike coal, oil or gas power plants, nuclear power plants practically do not produce CO<sub>2</sub> during their operation.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="card shadow">
                            <h5 className="card-title">Geothermal Energy</h5>
                            <img src={geothermal} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <p className="card-text">Geothermal energy is heat within the earth. Geothermal resources are reservoirs of hot water that exist or are humanmade at varying temperatures and depths below the earth's surface.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    )
}

export default Services
