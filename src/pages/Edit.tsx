import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup"

import * as Yup from "yup"

import { useNavigate, useParams } from "react-router-dom";

// Hooks
import { usePapers } from "../hooks/usePapers";

// Components
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const schema  = Yup.object({
  name: Yup.string().required(),
  width: Yup.number().required(),
  height: Yup.number().required(),
  grammage: Yup.number().required(),
  value: Yup.number().required(),
}).required()

const Edit = () => {
  /*
   * Hooks
   */
  const { paperId = '' } = useParams();

  const { getPaperById, updatePaper } = usePapers();

  const { register, handleSubmit, formState: { isValid, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: getPaperById(paperId),
  });

  const navigate = useNavigate()

  const backToPreviousPage = () => navigate(-1);

  const onSubmit = handleSubmit(async (data) => {
    await updatePaper(paperId, { id: paperId, ...data })

    backToPreviousPage()
  })

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg font-medium">Editar papel</h1>

      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input label="Nome:" {...register("name")} />

        <Input type="number" label="Largura (mm):" {...register("width")} />

        <Input type="number" label="Altura (mm):" {...register("height")} />

        <Input type="number" label="Gramatura (gr):" {...register("grammage")} />

        <Input type="number" label="Valor (un):" {...register("value")} />

        <div className="flex items-center gap-4 pt-6">
          <Button type="button" onClick={backToPreviousPage} variant="ghost" className="w-full">
            Cancelar
          </Button>

          <Button type="submit" className="w-full" disabled={!isValid || isSubmitting} isLoading={isSubmitting}>
            Editar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
