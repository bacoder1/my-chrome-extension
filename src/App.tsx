import Popup from "./Popup";
import {motion} from "motion/react"

const App: React.FC = () => {
  return <motion.div layout>
    <Popup />
  </motion.div>;
};

export default App;