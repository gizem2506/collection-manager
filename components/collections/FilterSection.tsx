// Bu bileşen, tek bir filtre kategorisini (örn. renk, beden) ve ilgili seçeneklerini görüntüler.
import React, { SyntheticEvent } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Filter } from '../../types/filters';

interface FilterSectionProps {
  filter: Filter;
  selectedValues: string[] | undefined;
  onValueChange: (filterId: string, value: string) => void;
  isExpanded: boolean;
  onToggleExpand: (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  filter,
  selectedValues,
  onValueChange,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <Accordion
      key={filter.id}
      expanded={isExpanded}
      onChange={onToggleExpand(filter.id)}
      sx={{
        m: 0,
        borderBottom: '1px solid #e0e0e0',
        '&:before': { display: 'none' },
        '&.MuiAccordion-root:last-child': { borderBottom: 0 },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${filter.id}-content`}
        id={`${filter.id}-header`}
        sx={{
          flexDirection: 'row-reverse',
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': { transform: 'rotate(180deg)' },
          '& .MuiAccordionSummary-content': { margin: '12px 0'},
          px: 3,
        }}
      >
        <Box flexGrow={1} ml={1}>
          <Typography fontWeight={600}>
            {filter.title && filter.title.trim() !== ""
              ? filter.title
              : `Başlık Yok (id: ${filter.id})`}
          </Typography>
          {filter.currency && (
            <Typography variant="caption" color="text.secondary" display="block">
              Para Birimi: {filter.currency}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, pb: 2, px: 3 }}>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            {filter.values && filter.values.map((val, idx) => (
              <FormControlLabel
                key={val.value ? `${val.value}-${idx}` : `empty-checkbox-${idx}`}
                control={
                  <Checkbox
                    checked={(selectedValues || []).includes(val.value)}
                    onChange={() => onValueChange(filter.id, val.value)}
                    name={val.value}
                    size="small"
                    sx={{ '&.Mui-checked': { color: 'black' } }}
                  />
                }
                label={<Typography variant="body2">{val.valueName || val.value}</Typography>}
              />
            ))}
          </FormGroup>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterSection; 