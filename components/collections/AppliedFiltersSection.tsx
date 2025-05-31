// Bu bileşen, uygulanan filtreleri görüntüler ve kullanıcıların bu filtreleri kaldırmasına olanak tanır.
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CancelIcon from "@mui/icons-material/Cancel";
import { Filter } from '../../types/filters';

interface AppliedFiltersSectionProps {
  selected: { [key: string]: string[] | undefined };
  filters: Filter[];
  onRemoveFilter: (filterId: string, value: string) => void;
}

const AppliedFiltersSection: React.FC<AppliedFiltersSectionProps> = ({
  selected,
  filters,
  onRemoveFilter,
}) => {
  const appliedFilters = Object.entries(selected).filter(([key, value]) =>
    Array.isArray(value) ? value.length > 0 : false
  );

  return (
    <Box sx={{ width: { xs: '100%', sm: '30%' }, pt: { xs: 2, sm: 0 }, pl: { sm: 2 } }}>
      <Typography fontWeight={500} mb={1} mt={2}>Uygulanan Kriterler</Typography>
      <Box display="flex" flexWrap="wrap" gap={1} minHeight={24}>
        {appliedFilters.length === 0 && (
          <Typography variant="body2" color="text.secondary">Henüz kriter seçilmedi</Typography>
        )}
        {appliedFilters.flatMap(([key, value]) => {
          const filter = filters.find(f => f.id === key);
          const filterTitle = filter?.title || filter?.id || 'Bilinmeyen';

          if (!Array.isArray(value)) return [];

          return value.map(val => {
            const valueName = filter?.values?.find(v => v.value === val)?.valueName || val;
            return (
              <Chip
                key={`${key}-${val}`}
                label={`${filterTitle}: ${valueName}`}
                size="small"
                onDelete={() => onRemoveFilter(key, val)}
                deleteIcon={<CancelIcon fontSize="small" />}
                sx={{ bgcolor: '#e0e0e0', textTransform: 'none' }}
              />
            );
          });
        })}


      </Box>
    </Box>
  );
};

export default AppliedFiltersSection; 