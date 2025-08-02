import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                <p className="text-gray-600 text-sm tracking-widest">Logging in...</p>
            </div>
        </div>
    );
};

export default Loading;
