import { useState } from "react";

import { GrClose } from "react-icons/gr";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as Yup from "yup";

// Hooks
import { usePapers } from "../hooks/usePapers";

// Components
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Select } from "../components/Select";

// Utils
import { formatCurrency } from "../utils/formatCurrency";

const schema = Yup.object({
  width: Yup.number().required(),
  height: Yup.number().required(),
  paperId: Yup.string().required(),
  quantity: Yup.number().required(),
  costPerPage: Yup.number().required(),
  bloodLetting: Yup.number().required(),
}).required();

const Calculator = () => {
  /*
   * Hooks
   */
  const [results, setResults] = useState({
    maxObjectsPerSheet: 0,
    sheetsRequired: 0,
    totalCost: 0,
  });

  const { papers, getPaperById } = usePapers();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    // Obter informações do papel selecionado
    const selectedPaper = getPaperById(data.paperId);

    // Calcula a largura provisória
    const provisionalWidth = Math.floor(
      (selectedPaper.width - 2 * data.bloodLetting) / data.width
    );

    // Calcula a altura provisória
    const provisionalHeight = Math.floor(
      (selectedPaper.height - 2 * data.bloodLetting) / data.height
    );

    // Calcula o total de objetos por folha
    const totalObjectsPerSheet = provisionalWidth * provisionalHeight;

    // Calcula largura provisória alternativa
    const altProvisionalWidth = Math.floor(
      (selectedPaper.width - 2 * data.bloodLetting) / data.height
    );

    // Calcula a altura provisória alternativa
    const altProvisionalHeight = Math.floor(
      (selectedPaper.height - 2 * data.bloodLetting) / data.width
    );

    // Calcula o total de objetos por folha para a alternativa
    const altTotalObjectsPerSheet = altProvisionalWidth * altProvisionalHeight;

    // Escolhe o maior total de objetos por folha
    const maxObjectsPerSheet = Math.max(
      totalObjectsPerSheet,
      altTotalObjectsPerSheet
    );

    // Calcula a quantidade de folhas necessárias
    const sheetsRequired = Math.ceil(data.quantity / maxObjectsPerSheet);

    // Calcula o custo total
    const totalCost = (data.costPerPage + selectedPaper.value) * sheetsRequired;

    // Atualizar os resultados
    setResults({ maxObjectsPerSheet, sheetsRequired, totalCost });
  });

  return (
    <div className="flex items-center justify-center w-full">
      <div className="flex flex-col gap-6 w-[412px]">
        <h1 className="text-4xl font-medium text-center">Calculadora</h1>

        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <div className="flex items-center justify-between gap-4">
            <Input type="number" label="Largura (mm):" {...register("width")} />

            <span className="pt-5">
              <GrClose />
            </span>

            <Input type="number" label="Altura (mm):" {...register("height")} />
          </div>

          <Select
            label="Selecione o papel:"
            options={papers}
            {...register("paperId")}
          />

          <Input
            type="number"
            label="Quantidade (un):"
            {...register("quantity")}
          />

          <Input
            type="number"
            label="Custo página:"
            {...register("costPerPage")}
          />

          <Input type="number" label="Sangria:" {...register("bloodLetting")} />

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={!isValid || isSubmitting}
          >
            Calcular
          </Button>
        </form>

        {isSubmitSuccessful ? (
          <div>
            <Input
              label="Quantidade de adesivo por folha:"
              value={results.maxObjectsPerSheet}
              disabled
            />

            <Input
              label="Quantidade de folhas:"
              value={results.sheetsRequired}
              disabled
            />

            <Input
              label="Custo total:"
              value={formatCurrency(results.totalCost / 100)}
              disabled
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Calculator;
