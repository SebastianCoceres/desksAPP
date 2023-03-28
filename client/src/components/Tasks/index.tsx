import { styled } from "@mui/material/styles";
import { Paper, IconButton, Grid, Stack, Box, Checkbox } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { TTask } from "@/@types/schema";

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

const label = { inputProps: { "aria-label": "Checkbox demo" } };

function Tasks({ data, handlers }: { data: TTask[]; handlers: any }) {
  return (
    <Grid container spacing={2} sx={{ marginTop: "1em" }}>
      {data.map((task: TTask) => (
        <Grid key={task._id} item xs={12} md={4}>
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
                aria-label="Edit"
                size="small"
                onClick={() => {
                  handlers.setTaskToEdit({ ...task });
                  handlers.setSeeTaskModalOpen(true);
                }}
                sx={{
                  "&:hover": {
                    background: "#3f51b5",
                    color: "#fff",
                  },
                }}
              >
                <VisibilityIcon fontSize="small" />
              </IconButton>
              <IconButton
                aria-label="Edit"
                size="small"
                onClick={() => {
                  handlers.setEditTaskModalOpen(true);
                  handlers.setTaskToEdit({ ...task });
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
                onClick={() => handlers.handleDeleteTask(task._id)}
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
            <Box
              component="div"
              sx={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <Checkbox
                {...label}
                checked={task.checked}
                onClick={() =>
                  handlers.handleEditTask({ ...task, checked: !task.checked })
                }
              />
              <p>{task.title}</p>
            </Box>
          </Item>
        </Grid>
      ))}
    </Grid>
  );
}

export default Tasks;
