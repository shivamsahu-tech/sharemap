import React from 'react';
import { useSelector } from 'react-redux';

function Popup() {
  const popupColor = useSelector(state => state.visibility.popupColor);
  const popupVisibility = useSelector(state => state.visibility.popupVisibility);
  const popupMsg = useSelector(state => state.visibility.popupMsg);

  const getColorStyles = (color) => {
    const styles = {
      blue: {
        bg: 'bg-blue-500',
        border: 'border-blue-600',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      red: {
        bg: 'bg-red-500',
        border: 'border-red-600',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      green: {
        bg: 'bg-green-500',
        border: 'border-green-600',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    };

    return styles[color.toLowerCase()] || {
      bg: 'bg-gray-500',
      border: 'border-gray-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
  };

  const { bg, border, icon } = getColorStyles(popupColor);

  if (popupVisibility !== 'visible') return null;

  return (
    <div className="fixed top-20 right-4 z-[60000] animate-slideInRight">
      <div className={`flex items-center gap-3 ${bg} ${border} border-l-4 text-white px-4 py-3 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-95 min-w-[280px] max-w-md`}>
        <div className="flex-shrink-0">
          {icon}
        </div>
        <p className="text-sm font-medium flex-1">
          {popupMsg}
        </p>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Popup;