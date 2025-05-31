// Bu bileşen, kullanıcılardan bir silme işlemini onaylamalarını isteyen bir onay modal penceresidir.
import React from 'react';
import { Modal, Box, Typography, Button as MuiButton } from '@mui/material';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
          Uyarı!
        </Typography>
        <WarningAmberOutlinedIcon sx={{ fontSize: 80, color: 'red', mb: 2 }} />
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 4, fontSize: '1.2rem', color: 'black' }}>
          Sabitlerden Çıkarılacaktır Emin Misiniz?
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
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
            Vazgeç
          </MuiButton>
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
            onClick={onConfirm}
          >
            Onayla
          </MuiButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal; 