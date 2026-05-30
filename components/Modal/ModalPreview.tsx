'use client'

import { useRouter } from 'next/navigation'
import css from './Modal.module.css'

type Props = {
  children: React.ReactNode
}
const ModalPreview = ({ children }: Props) => {
  const router = useRouter()
  const handleClose = () => {
    router.back()
  }
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        {children}
        <button onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default ModalPreview;