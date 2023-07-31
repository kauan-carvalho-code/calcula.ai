import { useMemo, useState } from "react";

import { Link, useLocation } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

// Components
import { SearchBar } from "../components/SearchBar";
import { Anchor } from "../components/Anchor";

// Hooks
import { usePapers } from "../hooks/usePapers";

function Papers() {
  /*
   * Hooks
   */
  const { papers, deletePaper } = usePapers();

  const [query, setQuery] = useState('');

  const filteredPapers = useMemo(() => papers.filter(paper => paper.name.includes(query)), [ papers, query ]);

  const location = useLocation();

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <SearchBar value={query} onChange={(event) => setQuery(event.currentTarget.value)} />

        <Anchor to="criar" state={{ previousLocation: location }}>
          Novo papel
        </Anchor>
      </div>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Nome
            </th>
            <th scope="col" className="px-6 py-3">
              Tamanho
            </th>
            <th scope="col" className="px-6 py-3">
              Gramatura
            </th>
            <th scope="col" className="px-6 py-3">
              Valor
            </th>
            <th scope="col" className="px-6 py-3">
              Ações
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredPapers.map((paper, index) => (
            <tr key={paper.id} className="border-b bg-white data-[even=false]:bg-neutral-50" data-even={index % 2 === 0}>
              <td scope="row" className="px-6 py-3">
                {paper.id}
              </td>
              <td scope="row" className="px-6 py-3">
                {paper.name}
              </td>
              <td scope="row" className="px-6 py-3">
                {paper.width} x {paper.height}
              </td>
              <td scope="row" className="px-6 py-3">
                {paper.grammage} gr
              </td>
              <td scope="row" className="px-6 py-3">
                {paper.value}
              </td>
              <td scope="row" className="flex items-center justify-start text-lg pt-3.5 gap-4 px-6 py-3">
                <Link
                  to={`editar/${paper.id}`}
                  state={{ previousLocation: location }}
                  className="text-violet-600 hover:text-violet-700"
                >
                  <MdEdit />
                </Link>

                <button
                  className="text-red-600 hover:text-red-700"
                  onClick={() => deletePaper(paper.id)}
                >
                  <BiSolidTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Papers;
