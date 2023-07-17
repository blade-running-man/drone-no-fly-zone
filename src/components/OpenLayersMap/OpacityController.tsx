import { FC, ChangeEvent } from 'react';

import * as styles from './OpenLayersMap.css';

export interface OpacityControllerProps {
  mapLayers: any[];
}

const OpacityController: FC<OpacityControllerProps> = ({ mapLayers }) => {
  const handleOpacityChange = (
    event: ChangeEvent<HTMLInputElement>,
    className: string
  ) => {
    const layer = document.getElementsByClassName(className)[0] as HTMLElement;

    if (layer) {
      layer.style.opacity = event.target.value;
    }
  };

  return (
    <div className={styles.opacityController}>
      {mapLayers.map((item) => {
        const className = item.getClassName();
        return (
          <div key={className}>
            <label htmlFor={className}>{className}: </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              onChange={(e) => handleOpacityChange(e, className)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default OpacityController;
