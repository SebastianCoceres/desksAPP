import { TTask } from "@/@types/schema";
import { styled } from "@mui/material/styles";
import { Paper, IconButton, Grid, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

function Tasks({ data, handlers = {} }: any) {
  // function editDesk(teskId: any, title: any) {
  //   handlers.setEditModalOpen(true);
  //   handlers.setEditModalContent({
  //     title,
  //     id: teskId,
  //   });
  // }
  return (
    <Grid container spacing={2} sx={{ marginTop: "1em" }}>
      {data.map((task: TTask) => (
        <Grid key={task._id} item xs={4}>
          <Item>
            <p>{task.title}</p>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default Tasks;
