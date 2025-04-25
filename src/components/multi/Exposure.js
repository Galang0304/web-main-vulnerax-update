'use client'
import { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { Nav, Tab } from 'react-bootstrap';

Chart.register(...registerables);

const OverallScoreTabs = () => {
    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const [activeTab, setActiveTab] = useState('secure'); // State untuk mengelola tab aktif



    useEffect(() => {
        if (chartRef1.current) {
            const myChart1 = new Chart(chartRef1.current, {
                type: 'polarArea',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true
                        }
                    }
                }
            });

            return () => myChart1.destroy();
        }
    }, []);

    useEffect(() => {
        if (chartRef2.current) {
            const myChart2 = new Chart(chartRef2.current, {
                type: 'polarArea',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [8, 15, 7, 10, 4, 6],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(255, 159, 64, 0.5)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        r: {
                            beginAtZero: true,

                        }
                    }
                }
            });

            return () => myChart2.destroy();
        }
    }, []);

    return (
        <section className='features section'>
            <div className="container section-title d-flex justify-content-between" data-aos="fade-up">
                <h2>Overall score</h2>
                <div>
                    <button className="btn btn-outline-secondary rounded-pill">Export <i className="bi bi-download"></i></button>
                    <button className="btn btn-outline-primary rounded-pill ms-2">Share <i className="bi bi-share"></i></button>
                </div>
            </div>
            <Tab.Content>
                <Tab.Pane eventKey="secure" active={activeTab === 'secure'}>
                    <div className='container'>
                        <div className="row mt-3">
                            <div className="col-md-7">
                                <canvas ref={chartRef1}></canvas>
                            </div>
                            <div className="col-md-5">
                                <div className='border-bottom border-secondary'>
                                    <h4>Your score is inside target. Web Application is most exposed</h4>
                                </div>
                                <div className='border-bottom border-secondary py-4'>
                                    <div>Brenchmarks</div>
                                    <div className='d-flex'>
                                        <span className='border border-3 px-2 py-1 rounded-circle'>B</span>
                                        <span className='border border-3 px-2 py-1 rounded-circle ms-2'>B</span>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </Tab.Pane>

                <Tab.Pane eventKey="reliable" active={activeTab === 'reliable'}>
                    <div className='container'>
                        <div className="row mt-3">
                            <div className="col-md-7 p-4 d-flex">
                                <canvas ref={chartRef2}></canvas>
                            </div>
                            <div className="col-md-5">
                                <div className='border-bottom border-secondary'>
                                    <h4>Your score is inside target. Web Application is most exposed</h4>
                                </div>
                                <div className='border-bottom border-secondary py-4'>
                                    <div>Brenchmarks</div>
                                    <div className='d-flex'>
                                        <span className='border border-3 px-2 py-1 rounded-circle'>B</span>
                                        <span className='border border-3 px-2 py-1 rounded-circle ms-2'>B</span>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </Tab.Pane>

                <Tab.Pane eventKey="responsible" active={activeTab === 'responsible'}>
                    <div className="row">
                        <div className="col-lg-6 order-2 order-lg-1 mt-3 mt-lg-0 d-flex flex-column justify-content-center">
                            <h3>Responsible</h3>
                            <p className="fst-italic">
                                Our commitment goes beyond providing services—we uphold ethical practices and sustainable approaches in every aspect of our work. By being socially and environmentally conscious, we ensure our solutions benefit not just you, but also the broader community and future generations.
                            </p>
                        </div>
                        <div className="col-lg-6 order-1 order-lg-2 text-center">
                        </div>
                    </div>
                </Tab.Pane>
            </Tab.Content>

            <div className="container">
                <div className="d-flex justify-content-center">
                    <Nav variant="tabs" defaultActiveKey="secure" onSelect={(key) => setActiveTab(key)}>
                        <Nav.Item>
                            <Nav.Link eventKey="secure" className="features">
                                <h4>Strategics</h4></Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="reliable">
                                <h4>Tactics</h4></Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
            </div>
        </section>
    );
};

export default OverallScoreTabs;