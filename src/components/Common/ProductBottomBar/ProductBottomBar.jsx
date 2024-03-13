"use client";
import React, { useState } from "react";
import CompareModal from "../Comparison/CompareModal";

function ProductBottomBar({ favSlider }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div onClick={() => setIsOpen(true)} className="product-bottom-bar">
        <i class="ri-add-circle-fill"></i>
        <p>Compare</p>
      </div>
      {isOpen && (
        <CompareModal
          favSlider={favSlider && favSlider}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}

export default ProductBottomBar;
