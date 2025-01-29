import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description)
    } else if (activeField === 'destination') {
      setDestination(suggestion.description)
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
  }

  return (
    <div>
      {
        suggestions.map((elem, idx) => (
          <div key={idx} onClick={() => handleSuggestionClick(elem)}
            className='flex items-center justify-start gap-4 border-2 p-3 rounded-xl m-2 active:border-black'>
            <h2 className='bg-[#eee} h-7 w-12 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-fill text-xl"></i>
            </h2>
            <h4 className='font-medium' >{elem.description}</h4>
          </div>
        ))
      }
    </div>
  )
}

export default LocationSearchPanel