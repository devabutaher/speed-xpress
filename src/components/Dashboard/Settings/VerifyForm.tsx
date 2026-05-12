"use client";

import { useAuth } from "@/hooks/useAuth";
import { useTranslation } from "@/lib/i18n";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { Chip, Input } from "@nextui-org/react";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const VerifyForm = () => {
  const t = useTranslation();
  const { user } = useAuth();
  const router = useRouter();

  const handleVerify = async () => {
    if (!user) {
      toast.error("You must be logged in to verify your account.");
      return;
    }

    if (user.emailVerified) {
      toast.info("Your email is already verified.");
      return;
    }

    try {
      await sendEmailVerification(user);
      toast.success("Verification email sent — please check your inbox.");
    } catch {
      toast.error("Failed to send verification email. Please try again later.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <Input
          type="email"
          label={t.auth.email}
          variant="bordered"
          radius="sm"
          isReadOnly
          value={user?.email ?? ""}
          description="A verification link will be sent to this address"
          classNames={{ base: "max-w-sm" }}
        />
        {user?.emailVerified && (
          <Chip color="success" variant="flat" size="sm" className="mt-1">
            ✓ Email verified
          </Chip>
        )}
      </div>

      <div className="flex gap-3">
        <SecondaryButton size="md" onClick={() => router.back()}>
          {t.common.back}
        </SecondaryButton>
        <PrimaryButton
          size="md"
          onClick={handleVerify}
          isDisabled={!!user?.emailVerified}
        >
          Verify Now
        </PrimaryButton>
      </div>
    </div>
  );
};

export default VerifyForm;
