import React from 'react'
import Modal from './Modal'

const modalWrapperStyle = {
  position: 'relative',
  zIndex: 1,
}

const higherIndexWrapperStyle = {
  position: 'relative',
  zIndex: 2,
  backgroudColor: 'blue',
  padding: '10px',
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <div style={modalWrapperStyle}>
        <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          모달 내용
        </Modal>
      </div>

      <div style={higherIndexWrapperStyle}>Z_Index 2</div>
    </>
  )
}

export default App
