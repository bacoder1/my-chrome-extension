import React from 'react'; 
import ColorPicker from './ui/ColorPicker';

const Popup: React.FC = () => (
  <div className="p-1 w-[21rem] h-[21rem] flex flex-col justify-end relative overflow-hidden">
		<ColorPicker />
  </div> 
);

export default Popup;