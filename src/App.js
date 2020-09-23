import React from 'react';

import Layout from './core/Layout';
import './assets/index.css';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function App() {
  const tempImageUrl2 = "https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?auto=compress&cs=tinysrgb&dpr=2"
  const tempImageUrl1 = "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&dpr=1";
  const tempImageUrl = "https://images.pexels.com/photos/3696755/pexels-photo-3696755.jpeg?cs=srgb&dl=pexels-tim-mossholder-3696755.jpg&fm=jpg";
  const tempImageDev = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
  return (
    <Layout>
      <ToastContainer />
      <div className="container bg-gradient-success">
        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <h1 className="title">Latest Arrivals</h1>
          </div>
          {/* coursel */}
          <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
              <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <Link to={"/SignIn"} class="carousel-item active">
                <img src={tempImageUrl1} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Services</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
              </Link>
              <Link to={"/SignIn"} class="carousel-item">
                <img src={tempImageUrl} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Shopping</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </Link>
              <Link to={"/SignIn"} class="carousel-item">
                <img src={tempImageUrl2} class="d-block w-100" alt="..." />
                <div class="carousel-caption d-none d-md-block">
                  <h5>Designer</h5>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </div>
              </Link>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
        </div>

        <div className="row ups">
        <div className="col-12 d-flex justify-content-center">
            <h1 className="title">Our Team</h1>
          </div>
        <div className="col-md-4 col-sm-6 up">
            <div className="single-content">
              <img src={tempImageDev} alt="" />
              <div className="text-content">
                <h4>Satyam Singh</h4>
                <h5>Full Stack Developers.</h5>
                  
              </div>
            </div>
            </div>
          <div className="col-md-4 col-sm-6 up">
            <div className="single-content">
              <img src={tempImageDev} alt="" />
              <div className="text-content">
                <h4>Yatharth Raj Sharma</h4>
                <h5>Full Stack Developers.</h5>
                
              </div>
            </div>
            </div>
          <div className="col-md-4 col-sm-6 up">
            <div className="single-content">
              <img src={tempImageDev} alt="" />
              <div className="text-content">
                <h4>Anshika Pengoria</h4>
                <h5>Marketing And Sales.</h5>

              </div>
            </div>
            </div>
        </div>
      </div>
      
    </Layout>
  );
}

export default App;
