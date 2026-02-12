import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar/Navbar"
import Table from "../../components/Table/Table"
import Modal from "../../components/Modal/Modal"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  useEffect(() => {
    console.log(isModalOpen)
  }, [isModalOpen])

  return (
    <>
      <Navbar />

      <Table setIsModalOpen={setIsModalOpen} />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          toast.success('Успешно выполнено!')
        }}
      />

      <ToastContainer />
    </>
  )
}

export default MainPage
