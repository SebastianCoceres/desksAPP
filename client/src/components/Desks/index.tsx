import { TDesk } from "@/@types/schema";
import { styled } from "@mui/material/styles";
import { Button, Paper, IconButton, Grid, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const Item = styled(Paper)(() => ({
  width: "100%",
  padding: "1em",
  color: "#fff",
  background: "#3F4851",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
  "&:hover": {
    background: "#f5f5f5",
    color: "#000",
  },
}));

function Desks({ data, handlers }: any) {
  function editDesk(deskId: any, title: any) {
    handlers.setEditModalOpen(true);
    handlers.setEditModalContent({
      title,
      id: deskId,
    });
  }
  return (
    <Grid container spacing={2} sx={{ marginTop: "1em" }}>
      {data.map((desk: TDesk) => (
        <Grid key={desk._id} item xs={4}>
          <Item>
            <Stack
              direction="row"
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
              }}
            >
              <IconButton
                aria-label="edit"
                size="small"
                onClick={(e) => {
                  e.preventDefault();
                  return editDesk(desk._id, desk.title);
                }}
                sx={{
                  "&:hover": {
                    background: "#3f51b5",
                    color: "#fff",
                  },
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => handlers.handleDeleteDesk(desk._id)}
                sx={{
                  "&:hover": {
                    background: "#3f51b5",
                    color: "#fff",
                  },
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>

            <p>{desk.title}</p>

            <Button
              sx={{
                color: "inherit",
                alignSelf: "end",
                "&:hover": {
                  background: "#3f51b5",
                  color: "#fff",
                },
              }}
            >
              <Link
                to={`desks/${desk._id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Go!
              </Link>
            </Button>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default Desks;
