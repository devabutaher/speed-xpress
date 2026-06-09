"use client";

import { ROLES, Role } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import { Button, Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";
import RegisterForm from "./RegisterForm";

const ROLE_TABS: { key: Role; label: string }[] = [
  { key: ROLES.REGULAR, label: "Regular" },
  { key: ROLES.MERCHANT, label: "Merchant" },
  { key: ROLES.RIDER, label: "Rider" },
  { key: ROLES.ADMIN, label: "Admin" },
];

const Register = () => {
  const t = useTranslation();

  const [role, setRole] = useState<Role>(ROLES.REGULAR);

  return (
    <div className="w-full sm:w-[30rem] mx-auto">
      <Card radius="sm" className="shadow-card-hover">
        <CardBody className="p-6 space-y-4">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">{t.auth.registerTitle}</h1>
            <p className="text-sm text-gray-500">{t.auth.registerSubtitle}</p>
          </div>

          {/* Role selector */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
            {ROLE_TABS.map(({ key, label }) => (
              <Button
                key={key}
                size="sm"
                radius="sm"
                disableRipple
                fullWidth
                variant={role === key ? "solid" : "light"}
                color={role === key ? "primary" : "default"}
                onPress={() => setRole(key)}
                className="font-medium"
              >
                {label}
              </Button>
            ))}
          </div>

          {/* Active form */}
          {role === ROLES.REGULAR && <RegisterForm role={ROLES.REGULAR} />}
          {role === ROLES.MERCHANT && <RegisterForm role={ROLES.MERCHANT} />}
          {role === ROLES.RIDER && <RegisterForm role={ROLES.RIDER} />}
          {role === ROLES.ADMIN && <RegisterForm role={ROLES.ADMIN} />}

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
