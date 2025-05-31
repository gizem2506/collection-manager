// Bu bileşen, ürünler için filtre seçeneklerini gösteren ve kullanıcıların filtreleri uygulamasına veya kaldırmasına olanak tanıyan bir modal penceredir.
import React, { useEffect, useState, SyntheticEvent } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from '../common/Button';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterSection from './FilterSection';
import AppliedFiltersSection from './AppliedFiltersSection';
import CircularProgress from '@mui/material/CircularProgress';
import { Filter } from '../../types/filters';

interface FilterModalProps {
  onClose: () => void;
  collectionId: string;
  token: string;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  collectionId,
  token,
}) => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selected, setSelected] = useState<{[key: string]: string[] | undefined}>({});
  const [expanded, setExpanded] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setIsLoading(true); 
    axios
      .get(
        `https://maestro-api-dev.secil.biz/Collection/${collectionId}/GetFiltersForConstants`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setFilters(res.data.data);
        setIsLoading(false); 
      })
      .catch((error) => {
        console.error("Filtreler çekilirken hata oluştu:", error);
        setIsLoading(false); 
      });
  }, [collectionId, token]);

  const handleCheckboxChange = (filterId: string, value: string) => {
    setSelected((prev: {[key: string]: string[] | undefined}) => {
      const currentSelected = prev[filterId] || [];
      if (currentSelected.includes(value)) {
        const newSelection = currentSelected.filter((item) => item !== value);
        const newState = { ...prev };
        if (newSelection.length > 0) {
          newState[filterId] = newSelection;
        } else {
          delete newState[filterId];
        }
        return newState;
      } else {
        return { ...prev, [filterId]: [...currentSelected!, value] };
      }
    });
  };

  const handleAccordionChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(
        isExpanded ? [...expanded, panel] : expanded.filter((p) => p !== panel)
      );
    };

  const mainFilters = filters.filter((f) =>
    ["color", "size", "category"].includes(f.id)
  );
  const otherFilters = filters.filter(
    (f) =>
      !["color", "size", "category"].includes(f.id) &&
      f.title !== "Unknown Title"
  );

  const handleClearAllFilters = () => {
    setSelected({});
  };

  const handleRemoveAppliedFilter = (filterId: string, value: string) => {
    setSelected(prev => {
      const currentSelected = prev[filterId] || [];
      const newSelection = currentSelected.filter(item => item !== value);
      const newState = { ...prev };
      if (newSelection.length > 0) {
        newState[filterId] = newSelection;
      } else {
        delete newState[filterId];
      }
      return newState;
    });
  };

  return (
    <Dialog
      open
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { overflowY: "visible" } }}
    >
      {" "}
      <DialogTitle
        sx={{
          m: 0,
          px: 3,
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        {" "}
        <Typography variant="h6" component="div" fontWeight={600}>
          Filtreler
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {" "}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: '#fff', p: 0, '& > :not(:last-child)': { borderBottom: '1px solid #e0e0e0' } }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, flexGrow: 1, height: '100%' }}>
            <Box sx={{ width: { xs: '100%', sm: '70%' }, overflowY: 'auto', pr: { sm: 2 }, pb: { xs: 2, sm: 0 }, borderRight: { sm: '1px solid #e0e0e0' } }}>
              {mainFilters.map((filter) => (
                <FilterSection
                  key={filter.id}
                  filter={filter}
                  selectedValues={selected[filter.id]}
                  onValueChange={handleCheckboxChange}
                  isExpanded={expanded.includes(filter.id)}
                  onToggleExpand={handleAccordionChange}
                />
              ))}

              {otherFilters.length > 0 && (
                <Accordion
                  key="ozellikler-category"
                  expanded={expanded.includes('ozellikler-category')}
                  onChange={handleAccordionChange('ozellikler-category')}
                  sx={{ m: 0, borderBottom: '1px solid #e0e0e0', '&:before': { display: 'none' }, '&.MuiAccordion-root:last-child': { borderBottom: 0 } }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="ozellikler-category-content"
                    id="ozellikler-category-header"
                    sx={{ flexDirection: 'row-reverse', '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(180deg)' }, '& .MuiAccordionSummary-content': { margin: '12px 0'}, px: 3 }}
                  >
                    <Typography fontWeight={600}>Özellikler</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0, pb: 2, px: 3 }}>
                    <Box sx={{ '& > :not(:last-child)': { borderBottom: '1px solid #e0e0e0' } }}>
                      {otherFilters.map(filter => (
                        <FilterSection
                          key={filter.id}
                          filter={filter}
                          selectedValues={selected[filter.id]}
                          onValueChange={handleCheckboxChange}
                          isExpanded={expanded.includes(filter.id)}
                          onToggleExpand={handleAccordionChange}
                        />
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              )}

            </Box>
            <AppliedFiltersSection
              selected={selected}
              filters={filters}
              onRemoveFilter={handleRemoveAppliedFilter}
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3, gap: 2 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="primary" onClick={handleClearAllFilters}>Seçimi Temizle</Button>
        <Button variant="primary">Ara</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterModal;
