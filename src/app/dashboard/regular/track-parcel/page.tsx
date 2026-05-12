import Image from "next/image";
import TrackParcel from "@/ui/TrackParcel";

export default function TrackParcelPage() {
  return (
    <section className="container-xl py-10 lg:py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Image src="/assets/images/track-parcel.png" width={600} height={600} alt="Track parcel" className="w-full max-w-md drop-shadow-xl mx-auto" />
        <div className="flex flex-col justify-center text-center md:text-left space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Effortless <span className="text-primary">Tracking</span> Your <span className="text-primary">Parcel</span> Status
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Track your parcel hassle-free. Enter your Parcel ID for instant access to real-time status updates and expected delivery time.
          </p>
          <TrackParcel />
        </div>
      </div>
    </section>
  );
}