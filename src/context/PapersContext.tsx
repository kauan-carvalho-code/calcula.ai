import React, { createContext, useMemo, useState } from "react";

import { Paper } from "../interfaces/paper";

interface PapersContextData {
  papers: Paper[];
  createPaper: (paper: Paper) => void;
  updatePaper: (paperId: number, paper: Paper) => void;
  deletePaper: (paperId: number) => void;
}

export const PapersContext = createContext<PapersContextData>({} as PapersContextData);

interface PapersProviderProps {
  children: React.ReactNode;
}

export const PapersProvider = ({ children }: PapersProviderProps) => {
  /* 
    * Hooks 
  */
  const [ papers, setPapers ] = useState<Paper[]>([]);

  const createPaper = (paper: Paper) => {
    setPapers(prevState => [...prevState, paper])
  }

  const updatePaper = (paperId: number, updatedPaper: Paper) => {
    setPapers(prevState => {
      const updatedPapers = [ ...prevState ]

      updatedPapers[paperId] = updatedPaper

      return updatedPapers
    })
  }

  const deletePaper = (paperId: number) => {
    setPapers(prevState => prevState.filter(paper => paper.id !== paperId))
  }

  const value = useMemo(() => ({
    papers,
    createPaper,
    updatePaper,
    deletePaper,
  }), [ papers ]);

  return (
    <PapersContext.Provider value={value}>
      { children }
    </PapersContext.Provider>
  )
}