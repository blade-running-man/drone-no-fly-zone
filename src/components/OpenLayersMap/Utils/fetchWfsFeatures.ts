import GeoJSON from 'ol/format/GeoJSON';
import { Feature } from 'ol';
import Geometry from 'ol/geom/Geometry';
import VectorSource from 'ol/source/Vector';

export async function fetchWfsFeatures(
  url: string,
  request: any,
  source: VectorSource
): Promise<void> {
  const response = await fetch(url, {
    method: 'POST',
    body: new XMLSerializer().serializeToString(request),
  });
  const json = await response.json();
  const features: Feature<Geometry>[] = new GeoJSON().readFeatures(json);
  features.forEach((feature) => {
    source.addFeature(feature);
  });
}
