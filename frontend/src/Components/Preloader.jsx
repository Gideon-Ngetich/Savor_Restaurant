import React from 'react';

const Preloader = () => {

    return (
        <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 rounded-md top-2/4 left-1/2 w-96 lg:w-1/2 p-12 h-96 flex flex-col justify-center items-center bg-gray-700 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><linearGradient id="a11"><stop offset="0" stop-color="#EAB308" stop-opacity="0"></stop><stop offset="1" stop-color="#EAB308"></stop></linearGradient><circle fill="none" stroke="url(#a11)" stroke-width="15" stroke-linecap="round" stroke-dasharray="0 44 0 44 0 44 0 44 0 360" cx="100" cy="100" r="70" transform-origin="center"><animateTransform type="rotate" attributeName="transform" calcMode="discrete" dur="1.6" values="360;324;288;252;216;180;144;108;72;36" repeatCount="indefinite"></animateTransform></circle></svg>            
            <span class="text-yellow-500 font-bold text-xl animate-pulse">Please Wait...</span>
            <span class="text-yellow-500 font-bold text-sm ">Kindly wait as we try to verify your Transaction, this may take upto 40sec. <br /> Ensure you have ENTERED your pin and confirm the payment on your phone. </span>

        </div>

    );
};

export default Preloader;
