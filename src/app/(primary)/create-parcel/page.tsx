import GuestParcel from "@/components/GuestParcel/GuestParcel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Parcel — Speed Xpress (Demo)",
  description:
    "Create a parcel without signing up. Experience Speed Xpress's parcel management features in guest mode.",
  openGraph: {
    title: "Create Parcel — Speed Xpress (Demo)",
    description:
      "Create a parcel without signing up. Experience Speed Xpress's parcel management features in guest mode.",
  },
};

const CreateParcelPage = () => {
  return <GuestParcel />;
};

export default CreateParcelPage;
