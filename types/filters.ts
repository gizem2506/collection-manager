export interface FilterValue {
  value: string;
  valueName?: string | null;
}

export interface Filter {
  id: string;
  title?: string | null;
  values: FilterValue[];
  currency?: string | null;
  comparisonType?: number;
} 