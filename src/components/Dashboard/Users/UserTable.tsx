"use client";

import { columns } from "@/data/userData";
import { useTableControls } from "@/hooks/useTableControls";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { ChangeEvent, useCallback, useMemo, useState } from "react";

// icons
import { useUserInfo } from "@/hooks/useUserInfo";
import { UserType } from "@/types/UserType";
import Loading from "@/ui/Loading";
import { deleteUserById } from "@/utils/api/user";
import { usePathname, useRouter } from "next/navigation";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { FaChevronDown as ChevronDownIcon } from "react-icons/fa";
import { HiDotsVertical as VerticalDotsIcon } from "react-icons/hi";
import { toast } from "react-toastify";

const UserTable = () => {
  // hooks
  let { allIsLoading, allUser, refetchAll } = useUserInfo();
  const { page, setPage, onNextPage, onPreviousPage, filterValue, onSearchChange, onClearSearch, visibleColumns, setVisibleColumns } = useTableControls(["name", "email", "role", "number", "actions"]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const pathname = usePathname();

  let users = allUser;

  if (pathname === "/dashboard/admin/merchants") {
    users = users.filter((user) => user.role === "merchant");
  }
  if (pathname === "/dashboard/admin/riders") {
    users = users.filter((user) => user.role === "rider");
  }

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUser = [...users];

    if (hasSearchFilter) {
      filteredUser = filteredUser.filter((user) => {
        const isMatch =
          (user?.name &&
            user?.name.toLowerCase().includes(filterValue.toLowerCase())) ||
          (user?.email &&
            user?.email.toLowerCase().includes(filterValue.toLowerCase())) ||
          (user?.role &&
            user?.role.toLowerCase().includes(filterValue.toLowerCase()));

        return isMatch;
      });
    }

    return filteredUser;
  }, [users, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = useCallback(
    (user: UserType, columnKey: string | number): React.ReactNode => {
      const cellValue = user[columnKey as keyof UserType];

      const handleView = (id: string) => {
        router.push(`/dashboard/admin/users/${id}`);
      };

      const handleDelete = async (id: string) => {
        const response = await deleteUserById(id);

        if (response.code === "success") {
          toast.success("User deleted successfully");
          refetchAll();
        } else {
          toast.error("Something went wrong");
          console.error(response.error);
        }
      };

      switch (columnKey) {
        case "name":
          return (
            <p className="font-medium text-small capitalize">{user?.name}</p>
          );
        case "email":
          return <p className="text-tiny text-default-500">{user?.email}</p>;
        case "number":
          return (
            <p className="font-medium text-small capitalize">{user?.number}</p>
          );
        case "role":
          return (
            <Chip
              color={
                user?.role === "merchant"
                  ? "primary"
                  : user?.role === "rider"
                  ? "secondary"
                  : user?.role === "admin"
                  ? "success"
                  : "default"
              }
              size="sm"
              variant="flat"
            >
              <span className="font-medium capitalize text-small">
                {user?.role}
              </span>
            </Chip>
          );
        case "division":
          return (
            <p className="font-medium text-small capitalize">
              {user?.division}
            </p>
          );
        case "district":
          return (
            <p className="font-medium text-small capitalize">
              {user?.district}
            </p>
          );
        case "address":
          return <p className="text-tiny text-default-500">{user?.address}</p>;
        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="md" variant="light">
                    <VerticalDotsIcon className="text-default-600" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="action-items">
                  <DropdownItem
                    className="text-left"
                    textValue="view"
                    as="button"
                    onClick={() => handleView(`${user?._id}`)}
                  >
                    View
                  </DropdownItem>
                  <DropdownItem
                    textValue="delete"
                    className="text-left"
                    as="button"
                    onClick={() => handleDelete(`${user?._id}`)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          );
        default:
          return <>{cellValue}</>;
      }
    },
    [refetchAll, router]
  );

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [setPage]
  );

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-4 items-end">
          <Input
            variant="bordered"
            radius="sm"
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search By Name, Email, Role"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClearSearch()}
            onValueChange={onSearchChange}
          />
          <Dropdown>
            <DropdownTrigger>
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                variant="flat"
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.slice(1, -1).map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {column.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-500 text-small">
            Total {users.length} Users
          </span>
          <label className="flex items-center text-default-500 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-500 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    setVisibleColumns,
    users.length,
    onRowsPerPageChange,
    onClearSearch,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, setPage, onPreviousPage, onNextPage]);

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        radius="sm"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[30rem]",
        }}
        topContent={topContent}
        topContentPlacement="outside"
      >
        <TableHeader columns={headerColumns}>
          {(column: { name: string; uid: string }) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={allIsLoading ? <Loading size="lg" /> : "No users found"}
          items={items}
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
    </>
  );
};

export default UserTable;
