import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Popup() {

    const popupColor = useSelector(state => state.visibility.popupColor);
    const popupVisibility = useSelector(state => state.visibility.popupVisibility);
    const popupMsg = useSelector(state => state.visibility.popupMsg);

    function getColorClass(color) {
        let colorClass;
        let borderClass;
    
        switch (color.toLowerCase()) {
            case 'blue':
                colorClass = 'bg-blue-400';
                borderClass = 'border-blue-900';
                break;
            case 'red':
                colorClass = 'bg-red-400';
                borderClass = 'border-red-900';
                break;
            case 'green':
                colorClass = 'bg-green-400';
                borderClass = 'border-green-900';
                break;
            default:
                colorClass = 'bg-gray-400'; // Default color if no match
                borderClass = 'border-gray-900'; // Default border if no match
                break;
        }
    
        return { colorClass, borderClass };
    }

    const { colorClass, borderClass } = getColorClass(popupColor);
//  console.log(colorClass, borderClass)
    
    return (
        <div className={`notification p-2.5 rounded-md text-white text-semibold ${colorClass} ${borderClass} border-2 ${popupVisibility}`}
        // style={{backgroundColor: "red", borderColor: {popupColor}}}
        >
            {popupMsg}
        </div>
    );

}

export default Popup
