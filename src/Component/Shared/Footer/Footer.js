import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <>
            <section className="footer-background pb-3">
                <footer>
                    <div className="container-fluid pt-5">
                        <div className="row">
                            <div className="col-6 mx-auto">
                                <h1 className="pb-2 border-bottom text-center text-center">
                                    Submit Your <span className="text-primary fw-bold">Query</span>
                                </h1>
                                <form id="contactForm">
                                    <div className="mb-3">
                                        <label className="form-label" for="name">Name</label>
                                        <input className="form-control" id="name" type="text" placeholder="Name" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" for="emailAddress">Email Address</label>
                                        <input className="form-control" id="emailAddress" type="email" placeholder="Email Address" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" for="message">Message</label>
                                        <textarea className="form-control" cols="4" id="message" type="text" placeholder="Message"></textarea>
                                    </div>
                                    <div className="">
                                        <button className="btn btn-primary btn-sm" type="submit">Submit</button>
                                    </div>
                                </form>
                                {/* <div className="text-center mt-5">
                                    <i className="fas fa-phone-alt fa-5x bx-tada mb-3"></i>
                                    <span className="d-block fw-bold fs-4 lh-lg">if you are experiencing chest pain, shortness of
                                        breath or a life-threatening emergency, please call</span>
                                    <span className="d-block fw-bold display-3 lh-lg">9-1-1</span>
                                    <hr />
                                </div> */}
                            </div>
                            <hr className="my-3" />
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                                <a href="/" target="_blank" rel="noreferrer" className="d-inline-block mb-5">
                                    <img src="https://i.ibb.co/s3pGnNs/hero-cycle-logo.png"
                                        className="img-fluid" alt="footer-logo" width="220" />
                                </a>
                                <div className="mb-5 text-center text-lg-start">
                                    <h5 className="text-light mb-4 fw-normal">Hours of Operation</h5>
                                    <p className="text-light fs-6">Open 7-Days a Week </p>
                                    <p className="text-light fs-6">9:00am to 8:00pm (Bangladeshi Time)</p>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5 mb-4 mb-lg-0">
                                <h4 className="text-light mb-4 fw-normal">Quick Links</h4>
                                <ul className="list-unstyled bx-ul">
                                    <li className="mb-2">
                                        <Link className="text-decoration-none text-light fs-6"
                                            to="/contact">
                                            <i className='bx bx-right-arrow bx-spin'></i>
                                            Contact
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link className="text-decoration-none text-light fs-6"
                                            to="/">
                                            <i className='bx bx-right-arrow bx-spin'></i>
                                            Explore Cycles
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link className="text-decoration-none text-light fs-6"
                                            to="/">
                                            <i className='bx bx-right-arrow bx-spin'></i>
                                            Order Onilne
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link className="text-decoration-none text-light fs-6"
                                            to="/">
                                            <i className='bx bx-right-arrow bx-spin'></i>
                                            FAQ
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link className="text-decoration-none text-light fs-6"
                                            to="/">
                                            <i className='bx bx-right-arrow bx-spin'></i>
                                            Our Location
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-12 col-lg-3">
                                <h4 className="text-light mb-4 fw-normal">Contact</h4>
                                <ul className="list-unstyled bx-ul">
                                    <li className="mb-2">
                                        <a href="tel:0258050117" className="text-decoration-none text-light fs-6">
                                            <i className='bx bxs-phone bx-flip-horizontal bx-spin'></i>
                                            <span>(+880) 111-123456</span>
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="/" className="text-decoration-none text-light fs-6">
                                            <i className='bx bxs-printer bx-flip-horizontal bx-spin'></i>
                                            <span>(032) 111-2222</span>
                                        </a>
                                    </li>
                                    <li className="mb-2">
                                        <a href="mailto:support@meiracare.com" className="text-decoration-none text-light fs-6">
                                            <i className='bx bx-mail-send bx-flip-horizontal bx-spin'></i>
                                            <span>info@hero-cyclecare.com</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>

                <div className="">
                    <hr style={{ borderTop: '6px solid transparent' }} />
                    <div className="container">
                        <div className="d-md-flex justify-content-md-between align-items-center">
                            <div className="d-flex align-items-center fs-6">
                                <i className='bx bxs-copyright bx-tada'></i>
                                <small>Copyright 2021. All Rights Reserved</small>
                            </div>
                            <div>
                                <a className="text-light text-decoration-none fs-6" href="/">
                                    <small>Terms of Use </small>
                                </a> |
                                <a className="text-light text-decoration-none fs-6" href="/">
                                    <small>Privacy Policy</small>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Footer;