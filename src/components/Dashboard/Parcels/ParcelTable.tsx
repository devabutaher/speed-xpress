"use client";

import {
  columns,
  INITIAL_VISIBLE_COLUMNS,
  statusColorMap,
  statusOptions,
} from "@/data/parcelData";
import { useAuth } from "@/hooks/useAuth";
import { useParcel } from "@/hooks/useParcel";
import {
  useDeleteParcel,
  useUpdateParcelStatus,
} from "@/hooks/useParcelMutations";
import { useTableControls } from "@/hooks/useTableControls";
import { ROLES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { ParcelType, Status } from "@/types/ParcelType";
import ErrorAlert from "@/ui/ErrorAlert";
import Loading from "@/ui/Loading";
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
  useDisclosure,
} from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, memo, useCallback, useMemo, useState } from "react";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaChevronDown as ChevronDownIcon } from "react-icons/fa";
import { HiDotsVertical as VerticalDotsIcon } from "react-icons/hi";
import ParcelUpdateModal from "./ParcelUpdateModal";

interface ParcelTableProps {
  setEarnings?: React.Dispatch<React.SetStateAction<number>>;
}

const ParcelTable = ({ setEarnings }: ParcelTableProps) => {
  const { role } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  let { parcels, isLoading, isError, error, refetch } = useParcel();
  const statusMutation = useUpdateParcelStatus();
  const deleteMutation = useDeleteParcel();

  // ── Rider-specific filtering ────────────────────────────────────────────────
  if (role === ROLES.RIDER) {
    const segment = pathname.split("/")[3];
    const isCompletedOrEarnings =
      segment === "completed-deliveries" || segment === "earnings";

    if (isCompletedOrEarnings) {
      parcels = parcels.filter((p) => p.parcelStatus === Status.Delivered);
      const total = parcels.reduce(
        (sum, p) => sum + (p.paymentInfo?.amount ?? 0),
        0,
      );
      setEarnings?.(total);
    } else {
      parcels = parcels.filter(
        (p) =>
          p.parcelStatus === Status.Accepted ||
          p.parcelStatus === Status.Picked,
      );
    }
  }

  // ── Table controls (replaces 3 separate hooks) ──────────────────────────────
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

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [updateId, setUpdateId] = useState<string | null>(null);

  // ── Computed columns ────────────────────────────────────────────────────────
  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((col) =>
      Array.from(visibleColumns).includes(col.uid),
    );
  }, [visibleColumns]);

  // ── Filtering ───────────────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    let result = [...parcels];

    if (filterValue) {
      const q = filterValue.toLowerCase();
      result = result.filter(
        (p) =>
          p.recipientInfo?.name?.toLowerCase().includes(q) ||
          p.recipientInfo?.email?.toLowerCase().includes(q) ||
          p.parcelId?.toLowerCase().includes(q),
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      result = result.filter((p) =>
        Array.from(statusFilter).includes(p.parcelStatus),
      );
    }

    return result;
  }, [parcels, filterValue, statusFilter]);

  const pages = Math.max(1, Math.ceil(filteredItems.length / rowsPerPage));

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems, rowsPerPage]);

  // ── Action handlers ─────────────────────────────────────────────────────────
  const handleStatusUpdate = useCallback(
    (id: string, status: Status) => {
      statusMutation.mutate({ id, data: { parcelStatus: status } });
    },
    [statusMutation],
  );

  const handleDelete = useCallback(
    (id: string) => {
      deleteMutation.mutate(id);
    },
    [deleteMutation],
  );

  const handleView = useCallback(
    (parcelId: string) => {
      const path =
        role === ROLES.RIDER
          ? `/dashboard/rider/deliveries/${parcelId}`
          : `/dashboard/${role}/parcels/${parcelId}`;
      router.push(path);
    },
    [role, router],
  );

  // ── Cell renderer ───────────────────────────────────────────────────────────
  const renderCell = useCallback(
    (parcel: ParcelType, columnKey: string | number): React.ReactNode => {
      const [date, time] = (parcel.deliveryDateTime ?? "").split(", ");

      switch (columnKey) {
        case "id":
          return (
            <Snippet variant="flat" radius="sm" symbol="">
              {parcel.parcelId}
            </Snippet>
          );

        case "date":
          return (
            <>
              <p className="text-small whitespace-nowrap">{date}</p>
              <p className="text-small whitespace-nowrap text-default-400">
                {time}
              </p>
            </>
          );

        case "name":
          return (
            <>
              <p className="font-medium text-small capitalize">
                {parcel.recipientInfo?.name}
              </p>
              <p className="text-tiny text-default-400">
                {parcel.recipientInfo?.email}
              </p>
            </>
          );

        case "number":
          return <p className="text-small">{parcel.recipientInfo?.number}</p>;

        case "shipping":
          return (
            <Chip
              color={
                parcel.shippingMethod === "express" ? "primary" : "default"
              }
              size="sm"
              variant="flat"
            >
              <span className="capitalize text-small font-medium">
                {parcel.shippingMethod}
              </span>
            </Chip>
          );

        case "info":
          return (
            <>
              <p className="text-small">
                Weight:{" "}
                <span className="font-medium">{parcel.parcelWeight} kg</span>
              </p>
              <p className="text-small">
                Qty:{" "}
                <span className="font-medium">{parcel.parcelQuantity} pcs</span>
              </p>
            </>
          );

        case "payment":
          return (
            <>
              <p className="text-small capitalize whitespace-nowrap">
                {parcel.paymentInfo?.status}
              </p>
              <p className="text-small font-medium whitespace-nowrap">
                {formatCurrency(parcel.paymentInfo?.amount ?? 0, "BDT")}
              </p>
            </>
          );

        case "status":
          return (
            <Chip
              color={statusColorMap[parcel.parcelStatus] ?? "default"}
              size="sm"
              variant="flat"
            >
              <span className="capitalize text-small font-medium">
                {parcel.parcelStatus}
              </span>
            </Chip>
          );

        case "actions": {
          const id = parcel._id ?? "";
          const parcelId = parcel.parcelId ?? "";
          const status = parcel.parcelStatus;

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
                <DropdownMenu aria-label="Parcel actions">
                  {/* View */}
                  <DropdownItem
                    key="view"
                    textValue="View"
                    onClick={() => handleView(parcelId)}
                  >
                    View
                  </DropdownItem>

                  {/* Edit — non-rider only */}
                  {role !== ROLES.RIDER ? (
                    <DropdownItem
                      key="edit"
                      textValue="Edit"
                      onClick={() => {
                        setUpdateId(parcelId);
                        onOpen();
                      }}
                    >
                      Edit
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="edit-hidden"
                      className="hidden"
                      textValue="-"
                    />
                  )}

                  {/* Accept — admin only, not yet accepted */}
                  {role === ROLES.ADMIN && status !== Status.Accepted ? (
                    <DropdownItem
                      key="accept-admin"
                      textValue="Accept"
                      onClick={() => handleStatusUpdate(id, Status.Accepted)}
                    >
                      Accept
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="accept-admin-hidden"
                      className="hidden"
                      textValue="-"
                    />
                  )}

                  {/* Picked up — rider, parcel accepted */}
                  {role === ROLES.RIDER && status === Status.Accepted ? (
                    <DropdownItem
                      key="picked"
                      textValue="Mark Picked"
                      onClick={() => handleStatusUpdate(id, Status.Picked)}
                    >
                      Mark Picked
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="picked-hidden"
                      className="hidden"
                      textValue="-"
                    />
                  )}

                  {/* Delivered — rider, parcel picked */}
                  {role === ROLES.RIDER && status === Status.Picked ? (
                    <DropdownItem
                      key="delivered"
                      textValue="Mark Delivered"
                      onClick={() => handleStatusUpdate(id, Status.Delivered)}
                    >
                      Mark Delivered
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="delivered-hidden"
                      className="hidden"
                      textValue="-"
                    />
                  )}

                  {/* Return — non-rider, only after delivery */}
                  {role !== ROLES.RIDER && status === Status.Delivered ? (
                    <DropdownItem
                      key="return"
                      textValue="Return"
                      onClick={() => handleStatusUpdate(id, Status.Returned)}
                    >
                      Return
                    </DropdownItem>
                  ) : (
                    <DropdownItem
                      key="return-hidden"
                      className="hidden"
                      textValue="-"
                    />
                  )}

                  {/* Delete — non-rider only */}
                  {role !== ROLES.RIDER ? (
                    <DropdownItem
                      key="delete"
                      textValue="Delete"
                      color="danger"
                      className="text-danger"
                      onClick={() => handleDelete(id)}
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
        }

        default:
          return null;
      }
    },
    [handleDelete, handleStatusUpdate, handleView, onOpen, role],
  );

  // ── Top toolbar ─────────────────────────────────────────────────────────────
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
                {columns.slice(1, -1).map((col) => (
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
            {filteredItems.length} parcel{filteredItems.length !== 1 ? "s" : ""}
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

  // ── Bottom pagination ───────────────────────────────────────────────────────
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
    <>
      {isError && (
        <ErrorAlert
          message={
            error instanceof Error
              ? error.message
              : "Failed to load parcels. Please try again."
          }
          onRetry={() => refetch()}
        />
      )}

      <Table
        aria-label="Parcels table"
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
          emptyContent={isLoading ? <Loading size="lg" /> : "No parcels found"}
        >
          {(item) => (
            <TableRow key={item.parcelId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ParcelUpdateModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        id={updateId}
        refetch={refetch}
      />
    </>
  );
};

export default memo(ParcelTable);
