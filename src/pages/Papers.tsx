import { Link, useLocation } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import { BiSolidTrash } from "react-icons/bi";

// Components
import { SearchBar } from "../components/SearchBar";
import { Button } from "../components/Button";

// Hooks
import { usePapers } from "../hooks/usePapers";

function Papers() {
  /*
   * Hooks
   */
  const { papers } = usePapers();

  const location = useLocation();

  return (
    <div className="w-full px-8 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <SearchBar />

        <Link to="criar" state={{ previousLocation: location }}>
          <Button type="button">Novo papel</Button>
        </Link>
      </div>

      <table className="w-full text-left text-md">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Gramatura</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {papers.map((paper, index) => (
            <tr
              key={paper.id}
              className={`${index % 2 === 0 ? "bg-neutral-100" : "bg-white"}`}
            >
              <td className="py-2">{paper.id}</td>
              <td>{paper.name}</td>
              <td>{paper.size.width} x {paper.size.height}</td>
              <td>{paper.grammage} gr</td>
              <td>{paper.value}</td>
              <td className="pt-1">
                <button className="pr-2 text-violet-600 hover:text-violet-700">
                  <MdEdit />
                </button>

                <button className="text-red-600 hover:text-red-700">
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
