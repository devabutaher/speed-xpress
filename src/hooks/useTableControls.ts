// src/hooks/useTableControls.ts
// Single, generic replacement for the three near-identical table-hook files:
//   useParcelTable.ts, useInvoiceTable.ts, useUserTable.ts
//
// Usage:
//   const controls = useTableControls(INITIAL_VISIBLE_COLUMNS);

import { Selection } from "@nextui-org/react";
import { useCallback, useState } from "react";

export interface TableControls {
  // Pagination
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  onNextPage: () => void;
  onPreviousPage: () => void;
  // Search / Filter
  filterValue: string;
  onSearchChange: (value?: string) => void;
  onClearSearch: () => void;
  // Column visibility
  visibleColumns: Selection;
  setVisibleColumns: React.Dispatch<React.SetStateAction<Selection>>;
}

export const useTableControls = (
  initialVisibleColumns: string[],
): TableControls => {
  // ── Pagination ────────────────────────────────────────────────────────────
  const [page, setPage] = useState(1);

  const onNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const onPreviousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  // ── Search / filter ───────────────────────────────────────────────────────
  const [filterValue, setFilterValue] = useState("");

  const onSearchChange = useCallback((value?: string) => {
    setFilterValue(value ?? "");
    // Reset to page 1 on new search so results don't appear empty
    setPage(1);
  }, []);

  const onClearSearch = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  // ── Visible columns ───────────────────────────────────────────────────────
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(initialVisibleColumns),
  );

  return {
    page,
    setPage,
    onNextPage,
    onPreviousPage,
    filterValue,
    onSearchChange,
    onClearSearch,
    visibleColumns,
    setVisibleColumns,
  };
};
