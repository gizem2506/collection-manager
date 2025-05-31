// Bu bileşen, başarılı bir işlemi onaylayan ve kullanıcının bilgiyi kapatmasına olanak tanıyan bir modal penceredir.
import React from 'react';
import { Modal, Box, Typography, Button as MuiButton } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; 

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
        borderRadius: '12px',
        outline: 'none',
      }}>
        <Typography id="success-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
          Başarılı
        </Typography>
        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: '#28a745', mb: 2 }} /> 
        <Typography id="success-modal-description" sx={{ mt: 2, mb: 4, fontSize: '1.2rem', color: 'black' }}>
          Sabitler içerisinden Çıkarıldı.
        </Typography>
        <MuiButton
          variant="contained"
          sx={{
            backgroundColor: '#28a745',
            '&:hover': {
              backgroundColor: '#218838',
            },
            color: 'white',
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            fontWeight: 'bold',
            minWidth: '120px',
          }}
          onClick={onClose}
        >
          TAMAM
        </MuiButton>
      </Box>
    </Modal>
  );
};

export default SuccessModal; 