import React, { createContext, useCallback, useMemo, useState } from "react";

import { Paper } from "../interfaces/paper";

interface PapersContextData {
  papers: Paper[];
  getPaperById: (paperId: number) => Paper | undefined;
  createPaper: (paper: Omit<Paper, 'id'>) => void;
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

  const getPaperById = useCallback((paperId: number) => papers.find(paper => paper.id === paperId), [ papers ]);

  const createPaper = (paper: Omit<Paper, 'id'>) => {
    setPapers(prevState => [...prevState, { id: prevState.length + 1, ...paper }])
  }

  const updatePaper = (paperId: number, updatedPaper: Paper) => {
    setPapers(prevState => {
      const updatedPapers = prevState.map((paper) => {
        if (paper.id === paperId) {
          return updatedPaper;
        }

        return paper;
      })

      return updatedPapers
    })
  }

  const deletePaper = (paperId: number) => {
    setPapers(prevState => prevState.filter(paper => paper.id !== paperId))
  }

  const value = useMemo(() => ({
    papers,
    getPaperById,
    createPaper,
    updatePaper,
    deletePaper,
  }), [ papers, getPaperById ]);

  return (
    <PapersContext.Provider value={value}>
      { children }
    </PapersContext.Provider>
  )
}