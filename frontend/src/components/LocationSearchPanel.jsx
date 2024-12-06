import React from 'react'

const LocationSearchPanel = (props) => {

  const locations = [
    "24B, Near Kapoor's cafe, Sheryians Coding School,Bhopal",
    "22B, Near Malhotra's cafe, Sheryians Coding School,Bhopal",
    "25B, Near Khan's cafe, Sheryians Coding School,Bhopal",
    "10A, Near Jaat's cafe, Sheryians Coding School,Bhopal",
  ]

  return (
    <div>
      {
        locations.map((location, i) => {
          return (
            <div onClick={() => {
              props.setVehiclePanel(true)
              props.setPanelOpen(false)
            }
            } className='flex items-center justify-start gap-4 border-2 p-3 rounded-xl mb-2 active:border-black' key={i}>
              <h2 className='bg-[#eee} h-7 w-12 flex items-center justify-center rounded-full'>
                <i className="ri-map-pin-fill text-xl"></i>
              </h2>
              <h4 className='font-medium' >{location}</h4>
            </div>
          )
        })
      }
      {/* <div className='flex items-center justify-start gap-4 border-2 p-3 rounded-xl mb-2 active:border-black'>
        <h2 className='bg-[#eee} h-7 w-12 flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-fill text-xl"></i>
        </h2>
        <h4 className='font-medium'>24B, Near Kapoor's cafe, Sheryians Coding School,Bhopal</h4>
      </div>
      <div className='flex items-center justify-start gap-4 border-2 p-3 rounded-xl mb-2 active:border-black'>
        <h2 className='bg-[#eee} h-7 w-12 flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-fill text-xl"></i>
        </h2>
        <h4 className='font-medium'>24B, Near Kapoor's cafe, Sheryians Coding School,Bhopal</h4>
      </div>
      <div className='flex items-center justify-start gap-4 border-2 p-3 rounded-xl mb-2 active:border-black'>
        <h2 className='bg-[#eee} h-7 w-12 flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-fill text-xl"></i>
        </h2>
        <h4 className='font-medium'>24B, Near Kapoor's cafe, Sheryians Coding School,Bhopal</h4>
      </div>
      <div className='flex items-center justify-start gap-4 border-2 p-3 rounded-xl mb-2 active:border-black'>
        <h2 className='bg-[#eee} h-7 w-12 flex items-center justify-center rounded-full'>
          <i className="ri-map-pin-fill text-xl"></i>
        </h2>
        <h4 className='font-medium'>24B, Near Kapoor's cafe, Sheryians Coding School,Bhopal</h4>
      </div> */}

    </div>
  )
}

export default LocationSearchPanel