import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface GeolocationData {
  latitude: number;
  longitude: number;
  zoneManuelle?: string;
  village?: string;
  commune?: string;
}

interface ModuleGeolocalisationProps {
  geolocalisation?: GeolocationData;
  onChange: (data: GeolocationData) => void;
}

function LocationMarker({ position, setPosition }: { 
  position: [number, number]; 
  setPosition: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>
        Localisation de la plante<br />
        Lat: {position[0].toFixed(6)}<br />
        Lng: {position[1].toFixed(6)}
      </Popup>
    </Marker>
  ) : null;
}

export function ModuleGeolocalisation({ geolocalisation, onChange }: ModuleGeolocalisationProps) {
  const [isLoadingGPS, setIsLoadingGPS] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState<[number, number]>(
    geolocalisation 
      ? [geolocalisation.latitude, geolocalisation.longitude]
      : [12.3714, -1.5197] // Ouagadougou, Burkina Faso
  );
  const [zoneManuelle, setZoneManuelle] = useState(geolocalisation?.zoneManuelle || '');
  const [village, setVillage] = useState(geolocalisation?.village || '');
  const [commune, setCommune] = useState(geolocalisation?.commune || '');

  useEffect(() => {
    onChange({
      latitude: position[0],
      longitude: position[1],
      zoneManuelle: zoneManuelle || undefined,
      village: village || undefined,
      commune: commune || undefined,
    });
  }, [position, zoneManuelle, village, commune]);

  const getCurrentPosition = () => {
    setIsLoadingGPS(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setPosition(newPos);
          setShowMap(true);
          setIsLoadingGPS(false);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          alert('Impossible d\'obtenir votre position. Veuillez vérifier les autorisations.');
          setIsLoadingGPS(false);
        }
      );
    } else {
      alert('La géolocalisation n\'est pas supportée par votre navigateur.');
      setIsLoadingGPS(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm border-2 border-[#87a878]/20">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-12 h-12 rounded-full bg-[#d4a574]/10 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-[#d4a574]" />
        </div>
        <div>
          <h3 className="text-[#5a5245]">Localisation de la plante</h3>
          <p className="text-sm text-[#717182]">Précisez où se trouve la plante médicinale</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* GPS Button */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            onClick={getCurrentPosition}
            disabled={isLoadingGPS}
            className="bg-[#d4a574] hover:bg-[#d4a574]/90 text-white h-12 px-6 flex-1"
          >
            {isLoadingGPS ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Localisation...
              </>
            ) : (
              <>
                <Navigation className="w-5 h-5 mr-2" />
                Utiliser ma position GPS
              </>
            )}
          </Button>
          <Button
            type="button"
            onClick={() => setShowMap(!showMap)}
            variant="outline"
            className="border-[#d4a574] text-[#d4a574] hover:bg-[#d4a574]/5 h-12 px-6"
          >
            {showMap ? 'Masquer' : 'Afficher'} la carte
          </Button>
        </div>

        {/* Map */}
        {showMap && (
          <div className="rounded-lg overflow-hidden border-2 border-[#d4a574]/30 h-[300px] md:h-[400px] shadow-lg">
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          </div>
        )}

        {/* Coordinates Display */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-[#f9f7f5] rounded-lg border border-[#d4a574]/20">
          <div>
            <span className="text-xs text-[#717182]">Latitude</span>
            <p className="text-[#5a5245] font-mono">{position[0].toFixed(6)}</p>
          </div>
          <div>
            <span className="text-xs text-[#717182]">Longitude</span>
            <p className="text-[#5a5245] font-mono">{position[1].toFixed(6)}</p>
          </div>
        </div>

        {/* Manual Location Fields */}
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="village" className="text-[#5a5245]">
              Village / Lieu-dit
            </Label>
            <Input
              id="village"
              value={village}
              onChange={(e) => setVillage(e.target.value)}
              placeholder="Ex: Komsilga, Forêt de Gonse..."
              className="bg-[#f9f7f5] border-[#d4a574]/20 focus:border-[#d4a574] h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="commune" className="text-[#5a5245]">
              Commune / Province
            </Label>
            <Input
              id="commune"
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              placeholder="Ex: Ouagadougou, Kadiogo..."
              className="bg-[#f9f7f5] border-[#d4a574]/20 focus:border-[#d4a574] h-12 text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zoneManuelle" className="text-[#5a5245]">
              Zone géographique détaillée
            </Label>
            <Input
              id="zoneManuelle"
              value={zoneManuelle}
              onChange={(e) => setZoneManuelle(e.target.value)}
              placeholder="Ex: Près de la rivière, bordure de champ..."
              className="bg-[#f9f7f5] border-[#d4a574]/20 focus:border-[#d4a574] h-12 text-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
