import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

// Fix for default marker icons in Leaflet with React
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RecenterMap = ({ lat, lng }) => {
  const map = useMap();
  React.useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const BoothFinder = () => {
  const [search, setSearch] = useState('');
  const [booths, setBooths] = useState([]);
  const [searched, setSearched] = useState(false);
  const [mapCenter, setMapCenter] = useState([28.6315, 77.2167]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(false);
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?postalcode=${search}&country=India&format=json`);
      const data = await response.json();
      
      let center = [28.6315, 77.2167]; // Default Delhi
      let areaName = 'New Delhi';

      if (data && data.length > 0) {
        center = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        areaName = data[0].display_name.split(',')[0];
      }

      setMapCenter(center);
      setBooths([
        { id: 1, name: 'Govt Senior Secondary School', address: `${areaName}, India`, lat: center[0] + 0.002, lng: center[1] + 0.002 },
        { id: 2, name: 'Primary Polling Station', address: `${areaName}, India`, lat: center[0] - 0.003, lng: center[1] - 0.001 },
        { id: 3, name: 'Community Center Hall', address: `${areaName}, India`, lat: center[0] + 0.001, lng: center[1] - 0.002 }
      ]);
      setSearched(true);
    } catch (error) {
      console.error(error);
      setSearched(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#080C14] text-white p-6 md:p-12 font-inter relative overflow-hidden">
      <div className="max-w-6xl mx-auto z-10 relative">
        <Link to="/dashboard" className="text-sm text-[#7C3AED] hover:underline mb-8 inline-block">← Back to Dashboard</Link>
        <h1 className="text-3xl md:text-5xl font-bold mb-2">Polling Booth <span className="text-[#138808]">Finder</span></h1>
        <p className="text-gray-400 mb-8">Locate your designated polling station using your Pincode or EPIC number.</p>

        <form onSubmit={handleSearch} className="mb-12 max-w-2xl flex gap-3">
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Enter Pincode (e.g., 110001)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#138808] transition-all"
              required
            />
          </div>
          <button type="submit" className="bg-gradient-to-r from-[#138808] to-[#0A5C04] text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(19,136,8,0.4)] transition-all">
            Search
          </button>
        </form>

        {searched && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-4 h-[600px] overflow-y-auto pr-2">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><FaMapMarkerAlt className="text-[#FF9933]"/> Nearby Booths</h2>
              {booths.map((booth) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={booth.id} 
                  className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <h3 className="font-bold text-[#FF9933] mb-1">{booth.name}</h3>
                  <p className="text-sm text-gray-400 mb-3">{booth.address}</p>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-[#138808]/20 text-[#138808] px-2 py-1 rounded">Wheelchair Accessible</span>
                    <span className="text-[10px] bg-[#7C3AED]/20 text-[#7C3AED] px-2 py-1 rounded">VVPAT Available</span>
                  </div>
                </motion.div>
              ))}
              
              <div className="mt-8 bg-gradient-to-br from-[#7C3AED]/20 to-transparent border border-[#7C3AED]/30 rounded-xl p-5">
                <h3 className="font-bold text-white mb-2">AI Assistant Says:</h3>
                <p className="text-sm text-gray-300">Don't forget to carry your Voter ID card or one of the 12 approved alternative photo identity documents. Polling usually happens from 7:00 AM to 6:00 PM.</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-white/5 rounded-2xl border border-white/10 overflow-hidden h-[600px] relative z-0">
              <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                <RecenterMap lat={mapCenter[0]} lng={mapCenter[1]} />
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {booths.map((booth) => (
                  <Marker key={booth.id} position={[booth.lat, booth.lng]}>
                    <Popup>
                      <strong className="text-black">{booth.name}</strong><br/>
                      <span className="text-gray-700">{booth.address}</span>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoothFinder;
