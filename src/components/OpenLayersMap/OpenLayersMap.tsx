import { FC, useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import LayerGroup from 'ol/layer/Group';
import {
  Attribution,
  defaults as defaultControls,
  MousePosition,
} from 'ol/control';
import Overlay from 'ol/Overlay';
import { Projection } from 'ol/proj';
import { baseMaps } from './Layers/baseMapLayers';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';
import OpacityController from './OpacityController';
import 'ol/ol.css';
import * as styles from './OpenLayersMap.css';

import { DEFAULT_ZOOM, DEFAULT_CENTER } from './constants';

export interface OpenLayersMapProps {
  mapLayers: LayerGroup[];
}

function OpenLayersMap({ mapLayers }: OpenLayersMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstance = useRef<Map | null>(null);
  const [isReady, setIsReady] = useState(false);
  const overlayElement = document.createElement('div');

  const overlay = new Overlay({
    element: overlayElement,
    positioning: 'bottom-left',
  });

  const mousePositionElement = document.createElement('div');
  mousePositionElement.id = 'mouse-position';
  mousePositionElement.className = 'custom-mouse-position';

  const mousePositionOverlay = new Overlay({
    element: mousePositionElement,
    positioning: 'bottom-left',
  });

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      baseMaps.set('fold', 'close');
      baseMaps.getLayers().item(0).set('visible', true);
      const projection = baseMaps
        .getLayers()
        .item(0)
        .get('source')
        .getProjection();

      const attribution = new Attribution({
        collapsible: false,
      });
      const mousePositionControl = new MousePosition({
        coordinateFormat(coord) {
          return (
            coord
              ?.map(function (c) {
                return c.toFixed(2);
              })
              .join(', ') ?? ''
          );
        },
        projection: new Projection({ code: 'EPSG:28992' }),
      });
      const mapObject = new Map({
        layers: [baseMaps],
        overlays: [overlay, mousePositionOverlay],
        controls: defaultControls({
          attribution: false,
        }).extend([attribution, mousePositionControl]),
        target: mapRef.current,
        view: new View({
          projection,
          center: DEFAULT_CENTER,
          zoom: DEFAULT_ZOOM,
          minZoom: 5,
        }),
      });
      mapLayers.map((layer) => mapObject.addLayer(layer));
      mapInstance.current = mapObject;
      setIsReady(true);
    }
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {mapInstance.current && (
        <OpacityController mapLayers={mapInstance.current.getAllLayers()} />
      )}
    </div>
  );
}

export default OpenLayersMap;
