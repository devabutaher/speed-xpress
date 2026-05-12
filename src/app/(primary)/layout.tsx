import Footer from "@/components/Footer/Footer";
import MainNavbar from "@/components/Navbar/Navbar";
import { ChildrenProps } from "@/types/ChildrenProps";

export const dynamic = "force-dynamic";

const PrimaryLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <MainNavbar />
      {children}
      <Footer />
    </>
  );
};

export default PrimaryLayout;
