"use client";

import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";
import { VALIDATION_PATTERNS } from "@/lib/utils";
import CustomInput from "@/ui/CustomInput";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { Card, CardBody, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGoogle, FaRocket } from "react-icons/fa";
import { toast } from "react-toastify";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const t = useTranslation();
  const { googleSignIn, loginUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    const result = await loginUser(email, password);
    if (result) {
      reset();
      toast.success("Redirecting to dashboard...");
      setTimeout(() => router.push(getDashboardPath(result.role)), 300);
    }
  };

  return (
    <div className="w-full sm:w-[28rem] mx-auto">
      <Card radius="sm" className="shadow-card-hover">
        <CardBody className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold">{t.auth.welcomeBack}</h1>
            <p className="text-sm text-gray-500">{t.auth.loginSubtitle}</p>
          </div>

          <Divider />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            {/* Google */}
            <SecondaryButton type="button" fullWidth onClick={googleSignIn}>
              <FaGoogle className="shrink-0" />
              <span>{t.auth.signInWithGoogle}</span>
            </SecondaryButton>

            {/* Demo Login */}
            <SecondaryButton
              type="button"
              fullWidth
              onClick={async () => {
                const result = await loginUser("demo@gmail.com", "121212");
                if (result) {
                  toast.success("Redirecting to dashboard...");
                  setTimeout(
                    () => router.push(getDashboardPath(result.role)),
                    500,
                  );
                }
              }}
            >
              <FaRocket className="shrink-0" />
              <span>{t.auth.demoLogin}</span>
            </SecondaryButton>

            <div className="flex items-center gap-3 text-xs text-gray-400">
              <Divider className="flex-1" />
              <span className="uppercase">{t.common.or}</span>
              <Divider className="flex-1" />
            </div>

            {/* Email */}
            <CustomInput
              label={t.auth.email}
              name="email"
              type="email"
              register={register}
              error={errors}
              validationRules={{
                required: t.auth.errors.emailRequired,
                pattern: {
                  value: VALIDATION_PATTERNS.email,
                  message: t.auth.errors.emailInvalid,
                },
              }}
            />

            {/* Password */}
            <CustomInput
              label={t.auth.password}
              name="password"
              type={showPassword ? "text" : "password"}
              register={register}
              error={errors}
              validationRules={{
                required: t.auth.errors.passwordRequired,
                minLength: {
                  value: 6,
                  message: t.auth.errors.passwordMinLength,
                },
              }}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaEye className="text-xl text-default-400" />
                  ) : (
                    <FaEyeSlash className="text-xl text-default-400" />
                  )}
                </button>
              }
            />

            {/* Submit */}
            <PrimaryButton type="submit" fullWidth isLoading={loading}>
              {t.auth.loginNow}
            </PrimaryButton>
          </form>

          <Divider />

          {/* Links */}
          <div className="text-center space-y-1.5 text-sm">
            <p>
              <span className="text-gray-500">{t.auth.noAccount} </span>
              <Link
                href="/register"
                className="text-primary font-semibold hover:underline"
              >
                {t.nav.register}
              </Link>
            </p>
            <p>
              <span className="text-gray-500">{t.auth.forgotPassword} </span>
              <Link
                href="/password"
                className="text-primary font-semibold hover:underline"
              >
                Reset now
              </Link>
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginForm;
