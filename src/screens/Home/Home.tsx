import OpenLayersMap from '@/components/OpenLayersMap';
import { droneNoFlyZonesLayers } from '@/components/OpenLayersMap/Layers/droneNoFlyZoneLayers';

function Home() {
  return <OpenLayersMap mapLayers={[droneNoFlyZonesLayers]} />;
}

export default Home;
