import React from 'react';

const Error = ({message}) => {

    return (
        <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 rounded-md top-2/4 left-1/2 w-96 lg:w-1/2 p-12 h-96 flex flex-col justify-center items-center bg-gray-700 z-50">

            <span class="text-yellow-500 font-bold text-sm ">{message}</span>

        </div>

    );
};

export default Error;
