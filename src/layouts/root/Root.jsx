import { Outlet } from "react-router";
import Footer from "../../pages/shared/Footer/Footer";
import Container from "../../components/Container/Container";
import Navbar from "../../pages/shared/Navbar/Navbar";
import Wrapper from "../../components/Wrapper/Wrapper";

const Root = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      {/* nav  */}
      <Navbar />
      <main className="flex-1">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Wrapper />
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Root;
