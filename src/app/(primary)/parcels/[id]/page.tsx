"use client";

import ParcelDetails from "@/components/Dashboard/Parcels/ParcelDetails";
import useSingleParcel from "@/hooks/useSingleParcel";
import Loading from "@/ui/Loading";
import PrimaryButton from "@/ui/PrimaryButton";
import SecondaryButton from "@/ui/SecondaryButton";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface ParcelDetailsPageProps {
  params: { id: string };
}

const ParcelDetailsPage = ({ params }: ParcelDetailsPageProps) => {
  const { data, isLoading, error } = useSingleParcel(params.id);
  const router = useRouter();
  const parcelRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => parcelRef.current,
    documentTitle: `Parcel-${params.id}`,
  });

  return (
    <div className="container-xl py-10 lg:py-16 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <h1 className="font-bold text-3xl lg:text-4xl">
          <span className="text-primary">PARCEL</span> DETAILS
        </h1>
        <div className="flex gap-3">
          <SecondaryButton size="sm" onClick={() => router.back()}>
            ← Back
          </SecondaryButton>
          {data && (
            <PrimaryButton size="sm" onClick={handlePrint}>
              Download PDF
            </PrimaryButton>
          )}
        </div>
      </div>

      <Divider />

      {/* States */}
      {isLoading && (
        <div className="grid place-items-center py-40">
          <Loading size="lg" />
        </div>
      )}

      {!isLoading && error && (
        <div className="grid place-items-center gap-4 py-20">
          <Image
            src="/assets/images/no_data.png"
            width={400}
            height={400}
            alt="No data"
            className="w-64 opacity-60"
          />
          <h2 className="text-xl font-bold">CANNOT GET PARCEL DATA</h2>
          <p className="text-sm text-gray-500">
            The parcel ID{" "}
            <span className="font-mono font-bold">{params.id}</span> was not
            found.
          </p>
        </div>
      )}

      {!isLoading && data && (
        <div ref={parcelRef} className="print:px-8 print:py-6">
          {/* Print-only header */}
          <div className="hidden print:block mb-6">
            <h1 className="text-2xl font-extrabold">
              SPEED<span className="text-primary">XPRESS</span>
            </h1>
            <p className="text-sm text-gray-500">
              Parcel Details — {params.id}
            </p>
          </div>
          <ParcelDetails parcelData={data} />
        </div>
      )}
    </div>
  );
};

export default ParcelDetailsPage;
