import { useContext } from "react"

// Context
import { PapersContext } from "../context/PapersContext";

export const usePapers = () => {
  /* 
    * Hooks 
  */
  const context = useContext(PapersContext);

  if (!context) {
    throw new Error('')
  }

  return context
}
