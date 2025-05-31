// Bu bileşen, bir hata mesajını görüntüleyen ve kullanıcının hatayı kapatmasına olanak tanıyan bir modal penceredir.
import React from 'react';
import { Modal, Box, Typography, Button as MuiButton } from '@mui/material';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'; 

interface ErrorModalProps {
  open: boolean;
  onClose: () => void;
  errorMessage?: string; 
}

const ErrorModal: React.FC<ErrorModalProps> = ({ open, onClose, errorMessage }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="error-modal-title"
      aria-describedby="error-modal-description"
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
        <Typography id="error-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
          Uyarı!
        </Typography>
        <ReportProblemOutlinedIcon sx={{ fontSize: 80, color: '#ffc107', mb: 2 }} /> {/* Sarı hata ikonu */}
        <Typography id="error-modal-description" sx={{ mt: 2, mb: 4, fontSize: '1.2rem', color: 'black' }}>
          {errorMessage || "Sabitler içerisinden Çıkarılırken Hata Oluştu."}
        </Typography>
        <MuiButton
          variant="contained"
          sx={{
            backgroundColor: '#dc3545',
            '&:hover': {
              backgroundColor: '#c82333',
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

export default ErrorModal; 