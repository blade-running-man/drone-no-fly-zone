import LayerGroup from 'ol/layer/Group';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import WFS from 'ol/format/WFS';
import { Fill, Stroke, Style } from 'ol/style';
import { fetchWfsFeatures } from '../Utils/fetchWfsFeatures';

const auUrlWfs = 'https://service.pdok.nl/lvnl/drone-no-flyzones/wfs/v1_0';

const auMunicipalitiesSource = new VectorSource({
  attributions:
    '<a href="https://www.pdok.nl/introductie/-/article/drone-no-fly-zones" target="_blank" title="Drone-no-fly-zones">Drone-no-fly-zones</a>',
});

const auMunicipalitiesFeatureRequest = new WFS({
  version: '2.0.0',
}).writeGetFeature({
  srsName: 'EPSG:28992',
  featureTypes: ['drone-no-flyzones:luchtvaartgebieden'],
  outputFormat: 'application/json',
});

console.log('auMunicipalitiesFeatureRequest', auMunicipalitiesFeatureRequest);

const getZoneColor = (zone?: string) => {
  switch (zone) {
    case 'Verboden':
      return 'rgba(200,40,30,0.7)';
    case 'Natura2000':
      return 'rgba(40,200,30,0.7)';
    case 'Beperkt toegestaan':
      return 'rgba(240,180,30,0.7)';
    default:
      return 'rgba(100,100,100,0.50)';
  }
};

const featureStyle = (feature) => {
  const localType = feature.get('localtype');
  return new Style({
    fill: new Fill({
      color: getZoneColor(localType),
    }),
    stroke: new Stroke({
      color: '#646464',
      width: 1,
    }),
  });
};

const droneNoFlyZonesLayer = new VectorLayer({
  className: 'drone-no-fly-zones-layer',
  source: auMunicipalitiesSource,
  style: featureStyle,
});

const wfsLayers = [
  {
    url: auUrlWfs,
    request: auMunicipalitiesFeatureRequest,
    source: auMunicipalitiesSource,
  },
];

wfsLayers.forEach((wfsLayer) => {
  fetchWfsFeatures(wfsLayer.url, wfsLayer.request, wfsLayer.source).then(() => {
    console.log('WFS features loaded');
  });
});

export const droneNoFlyZonesLayers = new LayerGroup({
  title: 'Drone no-fly zones',
  layers: [droneNoFlyZonesLayer],
});
