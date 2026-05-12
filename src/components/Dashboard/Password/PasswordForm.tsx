"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/lib/i18n";
import { VALIDATION_PATTERNS } from "@/lib/utils";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PasswordForm = () => {
  const t = useTranslation();
  const { user, resetPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user?.email) setEmail(user.email);
  }, [user]);

  const handleReset = async () => {
    if (!VALIDATION_PATTERNS.email.test(email)) {
      toast.error(t.auth.errors.emailInvalid);
      return;
    }
    await resetPassword(email);
    // Toast is handled inside resetPassword in AuthProvider
  };

  return (
    <div className="space-y-6">
      <Input
        type="email"
        label={t.auth.email}
        variant="bordered"
        radius="sm"
        // Read-only when the email is pre-filled from the logged-in user
        isReadOnly={!!user?.email}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        description="A reset link will be sent to this address"
        classNames={{ base: "max-w-sm" }}
      />
      <div className="flex gap-3">
        <SecondaryButton size="md" onClick={() => router.back()}>
          {t.common.back}
        </SecondaryButton>
        <PrimaryButton size="md" onClick={handleReset}>
          Reset Now
        </PrimaryButton>
      </div>
    </div>
  );
};

export default PasswordForm;
