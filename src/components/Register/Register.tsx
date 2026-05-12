"use client";

import { ROLES, Role } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Key, useState } from "react";
import RegisterForm from "./RegisterForm";

const ROLE_TABS: { key: Role; label: string }[] = [
  { key: ROLES.REGULAR, label: "Regular" },
  { key: ROLES.MERCHANT, label: "Merchant" },
  { key: ROLES.RIDER, label: "Rider" },
];

const Register = () => {
  const t = useTranslation();
  const pathname = usePathname();
  const isAdminPage = pathname?.endsWith("/admin");

  const [selected, setSelected] = useState<Role>(
    isAdminPage ? ROLES.ADMIN : ROLES.REGULAR,
  );

  const handleTabChange = (key: Key) => {
    setSelected(key as Role);
  };

  return (
    <div className="w-full sm:w-[30rem] mx-auto">
      <Card radius="sm" className="shadow-card-hover">
        <CardBody className="p-6 space-y-4">
          {/* Header */}
          <Link
            href="/"
            className="block text-center text-xl font-extrabold tracking-tight select-none"
          >
            SPEED<span className="text-primary">XPRESS</span>
          </Link>
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">{t.auth.registerTitle}</h1>
            <p className="text-sm text-gray-500">{t.auth.registerSubtitle}</p>
          </div>

          {/* Role tabs */}
          <Tabs
            fullWidth
            size="sm"
            radius="sm"
            color="primary"
            aria-label="Select account type"
            selectedKey={selected}
            onSelectionChange={handleTabChange}
          >
            {isAdminPage && (
              <Tab key={ROLES.ADMIN} title="Admin">
                <RegisterForm role={ROLES.ADMIN} />
              </Tab>
            )}
            {ROLE_TABS.map(({ key, label }) => (
              <Tab key={key} title={label}>
                <RegisterForm role={key} />
              </Tab>
            ))}
          </Tabs>

          {/* Login link */}
          <p className="text-center text-sm pt-1">
            <span className="text-gray-500">{t.auth.haveAccount} </span>
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              {t.auth.loginNow}
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
