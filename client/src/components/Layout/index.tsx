import { Container } from "@mui/material";
import NavMenu from "../Menu";
import "./Layout.css";

export default function Layout({ children }: any) {
  return (
    <div className="mainLayout">
      <Container
        maxWidth="md"
        sx={{ position: "relative", padding: "0 !important" }}
      >
        <div>{children}</div>
        <NavMenu />
      </Container>
    </div>
  );
}
