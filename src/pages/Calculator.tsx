import { Input } from '../components/Input';
import { Select } from '../components/Select';

function Calculator() {
  return (
    <div className='w-screen flex flex-col items-center'>
      <h1>Calculadora de unidades por página</h1>
      <div className='flex flex-col items-center'>
        <h3>Tamanho do material (mm)</h3>
        <div className='flex gap-2'>
          <Input
            className='border-pink-700 border h-16 w-16 outline-none'
            type='number'
          />
          <p>X</p>
          <Input
            className='border-pink-700 border h-16 w-16 outline-none'
            type='number'
          />
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col'>
            <Input
              className='border border-b-pink-700 w-full'
              id='quantity'
              label='Quntidade (un) '
            />

            <Select
              label='Selecione o Papel'
              id='paper'
              className='border border-b-pink-700 w-full'
            />
            <Input
              className='border border-b-pink-700 w-full'
              id='costPerPage'
              label='Custo página '
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
