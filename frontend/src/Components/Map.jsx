import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const MapView = () => {
  return (
    <>
      <div className='w-full lg:w-3/4 xl:w-3/4'>
        <MapContainer className='h-96' center={[-0.174084, 35.9696551]} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-0.174084, 35.9696551]}>
            <Popup>
              Savor Restaurant. <br /> Kabarak.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  )
}

export default MapView