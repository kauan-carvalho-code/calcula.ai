import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

function Calculator() {
  return (
    <div className='flex flex-col items-center'>
      <h1>Calculadora de unidades por página</h1>
      <div className='flex flex-col items-center mt-5 '>
        <h3 className='mb-5'>Tamanho do material (mm)</h3>
        <div className='flex gap-2 mb-6'>
          <Input type='number' />
          <div className='flex justify-center items-center'>X</div>
          <Input type='number' />
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col w-96'>
            <Select label='Selecione o Papel' id='paper' className='w-full' />
            <Input className='w-full' id='quantity' label='Quantidade (un)' />
            <Input className='w-full' id='costPerPage' label='Custo página' />
            <Button id='calculate' className='mt-2 w-20 self-end'>
              Calcular
            </Button>
          </div>
          <div className='flex flex-col w-full'>
            <Input className='w-1/2' label='Qtd adesivo por folha' />
            <Input className='w-1/2' label='Qtd de folhas ' />
            <Input className='w-1/2' label='Custo total' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
