import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { usePapers } from '../hooks/usePapers';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

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
  bloodLetting: yup.number(),
  height: yup.number(),
  width: yup.number(),
});

function Calculator() {
  const { papers, getPaperById } = usePapers();

  const {
    handleSubmit,
    register,
    formState: { isSubmitted },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleChange = (value: string) => {
    const selectedPaper = getPaperById(value);
    console.log(selectedPaper);
  };

  const onSubmit = (data: unknown) => console.log(data);

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
        <form
          className='flex flex-col items-center'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col w-96'>
            <Select
              {...register('paper')}
              name='Selecione o Papel'
              id='paper'
              className='w-full'
              options={papers}
              onChange={(e) => handleChange(e.target.value)}
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
              <Input className='w-1/2' label='Qtd adesivo por folha' />
              <Input className='w-1/2' label='Qtd de folhas' />
              <Input className='w-1/2' label='Custo total' />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Calculator;
