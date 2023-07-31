import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

// Components
import { Loading } from "../components/Loading";

// Interfaces
import { Paper, PaperWithoutId } from "../interfaces/paper";

// Services
import { rootApi } from "../services/rootApi";

interface PapersContextData {
  papers: Paper[];
  getPaperById: (paperId: string) => Paper;
  createPaper: (paper: PaperWithoutId) => Promise<void>;
  updatePaper: (paperId: string, paper: Paper) => Promise<void>;
  deletePaper: (paperId: string) => Promise<void>;
}

export const PapersContext = createContext<PapersContextData>(
  {} as PapersContextData
);

interface PapersProviderProps {
  children: React.ReactNode;
}

export const PapersProvider = ({ children }: PapersProviderProps) => {
  /*
   * Hooks
   */
  const [papers, setPapers] = useState<Paper[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const getPaperById = useCallback(
    (paperId: string) => {
      const paper = papers.find((paper) => paper.id === paperId);

      return paper || ({} as Paper);
    },
    [papers]
  );

  const createPaper = async (paper: PaperWithoutId) => {
    try {
      const response = await rootApi.create(paper);

      setPapers((prevState) => [...prevState, response]);
    } catch (error) {
      console.error("Erro ao criar um novo papel!", error);
    }
  };

  const updatePaper = async (paperId: string, updatedPaper: Paper) => {
    try {
      const response = await rootApi.update(paperId, updatedPaper);

      setPapers((prevState) =>
        prevState.map((paper) => {
          if (paper.id === paperId) {
            return response;
          }

          return paper;
        })
      );
    } catch (error) {
      console.error("Erro ao editar um papel!", error);
    }
  };

  const deletePaper = async (paperId: string) => {
    try {
      await rootApi.delete(paperId);

      setPapers((prevState) =>
        prevState.filter((paper) => paper.id !== paperId)
      );
    } catch (error) {
      console.error("Erro ao deletar um papel!", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const papers = await rootApi.get();

        setPapers(papers);
      } catch (error) {
        console.error("Erro ao consultar os papéis!", error);
      }

      setIsLoading(false);
    };

    getData();
  }, []);

  const value = useMemo(
    () => ({
      papers,
      getPaperById,
      createPaper,
      updatePaper,
      deletePaper,
    }),
    [papers, getPaperById]
  );

  return (
    <PapersContext.Provider value={value}>
      {isLoading ? <Loading /> : children}
    </PapersContext.Provider>
  );
};
