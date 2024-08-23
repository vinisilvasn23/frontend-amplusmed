import { Button as ShadButton } from '@/components/ui/button'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { Bookmark } from 'lucide-react'
import React, { useState } from 'react'
import BasicTabs from '../UserMiniModal/basicTabs'

const styled = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  border: 'rounded-lg',
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 3,
  zIndex: 10000,
}

export default function UserNestedModal() {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <React.Fragment>
      <Button
        sx={{ '&:hover': { backgroundColor: 'transparent' } }}
        aria-label="Gerenciar Permissões"
        onClick={handleOpen}
        disableElevation={true}
        style={{ backgroundColor: 'transparent' }}
        className="text-md font-sans font-bold text-black  hover:underline hover:bg-transparent bg-transparent"
      >
        Gerenciar permissões
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="nested-modal-title"
        atia-describedby="nested-modal-description"
        className="z-50"
      >
        <Box sx={{ ...styled, width: 1100, height: 745 }}>
          <h2
            id="nested-modal-title"
            className="text-2xl font-medium text-black"
          >
            Gerenciar Filiações e Permissões
          </h2>
          {/* <Toggles /> */}
          <BasicTabs />
          <div className="flex flex-row justify-center w-full mt-4">
            <ShadButton
              onClick={handleClose}
              className="mr-2 bg-blue-600 hover:bg-blue-500 hover:drop-shadow-md"
            >
              <Bookmark className="w-4 h-4 mr-4 mb-[1px]" />
              Salvar
            </ShadButton>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

// I honestly don't know dude, just.. idk.. material ui I guess
