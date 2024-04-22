
import React,{useState,useEffect} from "react";
import { renderToString } from "react-dom/server";
import useScreenSize from "@/_helpers/useScreenSize";

const ProsConsToolTip = (props) => {
  const { hover_phrase, info_not_verified, data, comment, typeComp ,finalvalue} = props;

const {isMobile}=useScreenSize();

  let tooltipStyles = {};

  // const [width, setWidth] = useState(0);
  // useEffect(() => {
  //   const handleResize = () => {
  //     setWidth(window.innerWidth);
  //   };

  //   handleResize();

  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  // let result = width - 250
  // let finalvalue = result / 2 -250
  // console.log(finalvalue, "test")
 

  // if (typeComp === "cons") {
  //   tooltipStyles = {
  //      left:finalvalue,
  //   };
  // } else {
  //   tooltipStyles = {
  //    right: finalvalue, 
  //   };
  // }

  return (
    <>
      {hover_phrase && (
        <div className="tooltip-display-content" style={{ left: isMobile ? finalvalue : 0 ,width:"150px",marginLeft:"50px"}} >
          <div
            className="mb-2 prosconsColor"
            dangerouslySetInnerHTML={{ __html: hover_phrase }}
          ></div>
          
          {comment && <div className="test__phrase__content " >{comment}</div>}

          {info_not_verified && (
            <>
              <hr />

              <span className="mb-2">
                <i>
                  (Information is not verified. If you believe this is a
                  mistake, please, contact our team.)
                </i>
              </span>
            </>
          )}
          <div className="user__rating__popup">
              <div className="user__rating__popup__list">
                <span className="user__rating__popup__rating">4.5</span>
                <div className="user__rating__popup__content">
                  <img src="https://frontum.online/expert-review-logo/NationalPost_1709634578.png"/>
                  <p>Nationalpost.com</p>
                </div>
              </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProsConsToolTip;
