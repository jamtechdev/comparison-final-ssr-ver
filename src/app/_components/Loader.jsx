"use client"
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Other content */}
      {/* <Circles
        type="TailSpin" // Specify the type of loader animation
        color="#00BFFF" // Specify the color of the loader
        height={50} // Specify the height of the loader
        width={50} // Specify the width of the loader
      /> */}

      <Oval
        height={80}
        width={80}
        color="#63b22d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
      {/* Other content */}
    </div>
  );
};

export default Loader;
