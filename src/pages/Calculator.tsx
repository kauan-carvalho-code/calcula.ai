import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { usePapers } from '../hooks/usePapers';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { formatCurrency } from '../utils/formatCurrency';

const schema = yup.object().shape({
  paper: yup.string().required('Selecione o papel'),
  quantity: yup
    .number()
    .required('Digite a quantidade')
    .positive('A quantidade deve ser maior que zero'),
  costPerPage: yup
    .number()
    .required('Digite o custo por página')
    .positive('O custo por página deve ser maior que zero'),
  bloodLetting: yup.number().required(),
  height: yup.number().required(),
  width: yup.number().required(),
});

function Calculator() {
  const { papers, getPaperById } = usePapers();
  const [results, setResults] = useState({
    qtdPerPaper: 0,
    qtdPaper: 0,
    cost: 0,
  });

  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const onSubmit = handleSubmit((data) => {
    const selectedPaper = getPaperById(data.paper);
    console.log(selectedPaper, 'selected paper')


    //Largura provisoria = (lagura do papel - 2*sangria) / (largura do objeto)  arredondado pra baixo
    const larguraProvisoria = Math.floor(
      (selectedPaper.width - 2 * data.bloodLetting) / data.width
    );

    console.log(selectedPaper.height, 'largura do papel')
    console.log(data.bloodLetting, 'sangria')
    console.log(data.width, 'largura do objeto')

    console.log(larguraProvisoria, 'largura provisoria')

    //Altura provisoria = (altura do papel - 2*sangria) / (altura do objeto)) arredondado para baixo

    const alturaProvisoria = Math.floor(
      (selectedPaper.height - 2 * data.bloodLetting) / data.height
    );

    console.log(alturaProvisoria, 'altura provisoria');
    

    const total1 = larguraProvisoria * alturaProvisoria;

    console.log(total1, 'total 1')

    //Largura provisoria 2 = (lagura do papel - 2*sangria) / (altura do objeto)  arredondado pra baixo
    const larguraProvisoria2 = Math.floor(
      (selectedPaper.width - 2 * data.bloodLetting) / data.height
    );

    console.log(larguraProvisoria2, 'largura provisoria 2')

    //Altura provisoria2 = (altura do papel - 2*sangria) / (largura do objeto)) arredondado para baixo

    const alturaProvisoria2 = Math.floor(
      (selectedPaper.height - 2 * data.bloodLetting) / data.width
    );

    console.log(alturaProvisoria2, 'altura provisoria 2')

    const total2 = larguraProvisoria2 * alturaProvisoria2;

    console.log(total2, 'total 2')

    const totalGeral = Math.max(total1, total2);

    console.log(totalGeral, 'total geral')

    const qtdPorFolha = totalGeral;

    console.log(qtdPorFolha, 'qtd por folha')

    //Quantidade de folha = (Quantidade de objeto  / quantidade por folha)
    const qtdFolha = Math.ceil(data.quantity / qtdPorFolha);

    console.log(qtdFolha, 'qtd folha')

    //Custo = (custo imprssão + valor papel) * quantidade de folha
    const cost = (data.costPerPage + selectedPaper.value) * qtdFolha;
    console.log(qtdPorFolha, 'qtd por folha');
    console.log(qtdFolha, 'qt folha');
    console.log(cost, 'cost');

    setResults({
      qtdPerPaper: qtdPorFolha,
      qtdPaper: qtdFolha,
      cost: cost,
    });
  });

  return (
    <div className='flex flex-col items-center'>
      <h1>Calculadora de unidades por página</h1>
      <div className='flex flex-col items-center mt-5 '>
        <h3 className='mb-5'>Tamanho do material (L x A) em mm</h3>
        <div className='flex gap-2 mb-6'>
          <Input type='number' {...register('width')} />
          <div className='flex justify-center items-center'>X</div>
          <Input type='number' {...register('height')} />
        </div>
        <form className='flex flex-col items-center' onSubmit={onSubmit}>
          <div className='flex flex-col w-96'>
            <Select
              {...register('paper')}
              name='Selecione o Papel'
              id='paper'
              className='w-full'
              options={papers}
              onChange={(e) => setValue('paper', e.target.value)}
            />

            <Input
              {...register('quantity')}
              className='w-full'
              id='quantity'
              label='Quantidade (un)'
            />
            <Input
              {...register('costPerPage')}
              className='w-full'
              id='costPerPage'
              label='Custo página'
            />
            <Input
              {...register('bloodLetting')}
              className='w-full'
              id='bloodLetting'
              label='Sangria'
            />
            <Button type='submit' id='calculate' className='mt-2 w-20 self-end'>
              Calcular
            </Button>
          </div>
          {isSubmitted && (
            <div className='flex flex-col w-full'>
              <Input
                className='w-1/2'
                label='Qtd adesivo por folha'
                value={results.qtdPerPaper}
                readOnly
              />
              <Input
                className='w-1/2'
                label='Qtd de folhas'
                value={results.qtdPaper}
                readOnly
              />
              <Input
                className='w-1/2'
                label='Custo total'
                value={formatCurrency(results.cost/100)}
                readOnly
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Calculator;
