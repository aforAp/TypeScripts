import { motion } from "motion/react";
import {headingAnimation} from "./animation.ts"
const Todos = () => {
  
  return (
    <div>
       <motion.h1    
       variants={headingAnimation}
        initial="initial"
        animate="animate"
       className="text-3xl text-center">The Todo List</motion.h1>
    </div>
  )
}

export default Todos
