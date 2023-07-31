import { CgSpinner } from 'react-icons/cg'

export const Loading = () => (
  <div className='flex items-center justify-center pt-96 text-3xl text-violet-600'>
    <CgSpinner className="animate-spin" />
  </div>
)