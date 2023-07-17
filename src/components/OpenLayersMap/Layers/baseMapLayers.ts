import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';
import WMTSSource from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import Projection from 'ol/proj/Projection';
import { getTopLeft } from 'ol/extent';

const proj28992Extent: [number, number, number, number] = [
  -285401.92, 22598.08, 595401.92, 903401.92,
];
const proj28992: Projection = new Projection({
  code: 'EPSG:28992',
  units: 'm',
  extent: proj28992Extent,
});
const resolutions: number[] = [
  3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72,
  3.36, 1.68, 0.84, 0.42, 0.21, 0.105, 0.0525, 0.02625, 0.013125, 0.0065625,
];

const matrixIds: string[] = Array.from(
  { length: 20 },
  (_, i) => `EPSG:28992:${i}`
);

const dutchWMTSTileGrid = new WMTSTileGrid({
  origin: getTopLeft(proj28992Extent),
  resolutions,
  matrixIds,
});

const brtAchtergrondkaartLayer = new TileLayer({
  className: 'default-layer',
  minResolution: 0.2,
  visible: false,
  source: new WMTSSource({
    url: 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0',
    layer: 'standaard',
    matrixSet: 'EPSG:28992',
    projection: proj28992,
    crossOrigin: 'Anonymous',
    format: 'image/png',
    tileGrid: dutchWMTSTileGrid,
    style: 'default',
  }),
});

const baseMaps = new LayerGroup({
  layers: [brtAchtergrondkaartLayer],
});

export { baseMaps };
