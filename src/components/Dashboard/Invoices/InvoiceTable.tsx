"use client";

import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  statusColorMap,
  statusOptions,
} from "@/data/invoiceData";
import { useAuth } from "@/hooks/useAuth";
import { useInvoice } from "@/hooks/useInvoice";
import { useTableControls } from "@/hooks/useTableControls";
import { formatCurrency } from "@/lib/utils";
import { InvoiceType } from "@/types/invoiceType";
import Loading from "@/ui/Loading";
import { deleteInvoice } from "@/utils/api/invoice";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Selection,
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaChevronDown as ChevronDownIcon } from "react-icons/fa";
import { HiDotsVertical as VerticalDotsIcon } from "react-icons/hi";
import { toast } from "react-toastify";

const InvoiceTable = () => {
  const { invoices, isLoading, refetch } = useInvoice();
  const { role } = useAuth();
  const router = useRouter();

  const {
    page,
    setPage,
    onNextPage,
    onPreviousPage,
    filterValue,
    onSearchChange,
    onClearSearch,
    visibleColumns,
    setVisibleColumns,
  } = useTableControls(INITIAL_VISIBLE_COLUMNS);

  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) =>
      Array.from(visibleColumns).includes(col.uid),
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let result = [...invoices];

    if (filterValue) {
      const q = filterValue.toLowerCase();
      result = result.filter(
        (inv) =>
          inv.userName?.toLowerCase().includes(q) ||
          inv.userEmail?.toLowerCase().includes(q) ||
          inv.parcelId?.toLowerCase().includes(q) ||
          inv.invoiceId?.toLowerCase().includes(q),
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      result = result.filter((inv) =>
        Array.from(statusFilter).includes(inv.status),
      );
    }

    return result;
  }, [invoices, filterValue, statusFilter]);

  const pages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  const handleView = useCallback(
    (id: string) => {
      if (role !== "rider") {
        router.push(`/dashboard/${role}/invoices/${id}`);
      }
    },
    [role, router],
  );

  const handleDelete = useCallback(
    async (id: string) => {
      const res = await deleteInvoice(id);
      refetch();
      if (res.code === "success") {
        toast.success("Invoice deleted");
      } else {
        toast.error("Failed to delete invoice");
      }
    },
    [refetch],
  );

  const renderCell = useCallback(
    (invoice: InvoiceType, columnKey: string | number): React.ReactNode => {
      const [date, time] = (invoice.paymentDateTime ?? "").split(", ");

      switch (columnKey) {
        case "date":
          return (
            <>
              <p className="text-small whitespace-nowrap">{date}</p>
              <p className="text-small whitespace-nowrap text-default-400">
                {time}
              </p>
            </>
          );

        case "parcelId":
          return (
            <Snippet variant="flat" radius="sm" symbol="">
              {invoice.parcelId}
            </Snippet>
          );

        case "invoiceId":
          return (
            <Snippet variant="flat" radius="sm" symbol="">
              {invoice.invoiceId}
            </Snippet>
          );

        case "name":
          return (
            <>
              <p className="font-medium text-small capitalize">
                {invoice.userName}
              </p>
              <p className="text-tiny text-default-400">{invoice.userEmail}</p>
            </>
          );

        case "amount":
          return (
            <p className="text-small font-semibold">
              {formatCurrency(invoice.amount, "BDT")}
            </p>
          );

        case "method":
          return (
            <p className="text-small capitalize">{invoice.paymentMethod}</p>
          );

        case "status":
          return (
            <Chip
              color={statusColorMap[invoice.status] ?? "default"}
              size="sm"
              variant="flat"
            >
              <span className="capitalize text-small font-medium">
                {invoice.status}
              </span>
            </Chip>
          );

        case "actions":
          return (
            <div className="flex justify-end">
              <Dropdown>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    aria-label="Actions"
                  >
                    <VerticalDotsIcon className="text-default-500" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Invoice actions">
                  <DropdownItem
                    key="view"
                    textValue="View"
                    onClick={() => handleView(invoice._id ?? "")}
                  >
                    View
                  </DropdownItem>
                  {role === "admin" ? (
                    <DropdownItem
                      key="delete"
                      textValue="Delete"
                      color="danger"
                      className="text-danger"
                      onClick={() => handleDelete(invoice._id ?? "")}
                    >
                      Delete
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="delete-hidden"
                      className="hidden"
                      textValue="-"
                    />
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          );

        default:
          return null;
      }
    },
    [handleDelete, handleView, role],
  );

  const topContent = useMemo(
    () => (
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap justify-between gap-3 items-end">
          <Input
            variant="bordered"
            radius="sm"
            isClearable
            className="w-full sm:max-w-xs"
            placeholder="Search by ID, name, email…"
            startContent={<SearchIcon className="text-default-400" />}
            value={filterValue}
            onClear={onClearSearch}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Filter by status"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((s) => (
                  <DropdownItem key={s.uid} className="capitalize">
                    {s.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Toggle columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.slice(0, -1).map((col) => (
                  <DropdownItem key={col.uid} className="capitalize">
                    {col.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center text-small text-default-500">
          <span>
            {filteredItems.length} invoice
            {filteredItems.length !== 1 ? "s" : ""}
          </span>
          <label className="flex items-center gap-1">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-500 text-small"
              value={rowsPerPage}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setRowsPerPage(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    ),
    [
      filterValue,
      onSearchChange,
      onClearSearch,
      statusFilter,
      visibleColumns,
      setVisibleColumns,
      filteredItems.length,
      rowsPerPage,
      setPage,
    ],
  );

  const bottomContent = useMemo(
    () => (
      <div className="py-2 px-2 flex justify-between items-center gap-2">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex gap-2">
          <Button
            isDisabled={page <= 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={page >= pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    ),
    [page, pages, setPage, onPreviousPage, onNextPage],
  );

  return (
    <Table
      aria-label="Invoices table"
      isHeaderSticky
      radius="sm"
      topContent={topContent}
      topContentPlacement="outside"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{ wrapper: "max-h-[32rem]" }}
    >
      <TableHeader columns={headerColumns}>
        {(col) => (
          <TableColumn
            key={col.uid}
            align={col.uid === "actions" ? "center" : "start"}
          >
            {col.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={items}
        emptyContent={isLoading ? <Loading size="lg" /> : "No invoices found"}
      >
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
