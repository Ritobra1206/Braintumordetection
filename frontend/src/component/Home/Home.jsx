import React from 'react';
import image1 from '../../images/braintumor_3d.png'
import image2 from "../../images/braintumor_boy.png"
import './Home.css';
import { Link} from 'react-router-dom';


const Home = () => {
 

  return (
    <div className="home-container">
      <div className="header"><div className="headerContent">
        <div className="heading">
        
        <Link to="/detect" style={{textDecoration:'none',color:'white'}}> <h1 style={{ color: 'white' }}>Detect Brain Tumor Now</h1></Link>
        </div>
        {/* <div className="homeDetect">
          <IconButton style={{ fontSize: '5vh' }} ><Link to="/detect"><ImageSearchIcon fontSize='1vw' style={{ color: 'orange' }} /></Link></IconButton>
        </div> */}
      </div>
      </div>


      <div className="body">
        <div className="body1">
          <div className="body1-interior">
          <div className="body1-heading">

            <h1>What is Brain Tumor? </h1>
          
          </div>
          <div className="body1-content">
            <div className="body1-image">
              <img src={image1} alt="Brain Tumor 1" />
            </div>
            <div className="body1-paragraph">
              <p>
                A cancerous or non-cancerous mass or growth of abnormal cells in the brain.
                Tumors can start in the brain, or cancer elsewhere in the body can spread to the brain. The risk for most types of brain tumors increases with age.
                Symptoms include new or increasingly strong headaches, blurred vision, weakness of limbs, loss of balance, confusion and seizures. In some cases, there may be no symptoms.
                Treatments include surgery, radiation and chemotherapy.
              </p>
            </div>
          </div>
          </div>
        </div>

        <div className="body2">
          <div className="body2-interior">
          <div className="body2-heading">
            <h1>What we do?</h1>
          </div>
          <div className="body2-content">
          <div className="body2-paragraph">
              <p>
              Welcome to our Brain Tumor Detection site! We harness the power of deep learning to provide a seamless experience for users uploading MRI photos. Our mission is to contribute to early detection and improved healthcare outcomes. Our platform empowers users to effortlessly submit their scans, receiving rapid and accurate results. Committed to innovation and user-centric design, we prioritize accessibility and precision. With a dedicated team of experts in both technology and healthcare, our goal is to make a positive impact on medical diagnostics. Join us on this journey toward advancing brain tumor detection, enhancing patient care, and fostering a healthier future.
              </p>
            </div>
            <div className="body2-image">
              <img src={image2} alt="Brain Tumor 2" />
            </div>
            
          </div>
          </div>
        </div>
        <div className="body3">

        </div>
      </div>


    
    </div>
  );
};

export default Home;
