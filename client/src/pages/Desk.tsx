import { TDesk, TTask, TTaskRef } from "@/@types/schema";
import { useEffect, useState } from "react";
import { Params, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { getDesksById } from "api/desksApi";
import { createTask, deleteTask } from "api/tasksApi";
import Tasks from "@/components/Tasks/";

export default function Desk() {
  const { deskId }: Readonly<Params<string>> = useParams<string>();
  if (deskId) {
    const [deskExist, setDeskExist] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [desk, setDesk] = useState<TDesk>({
      _id: "",
      title: "",
      tasks: [],
      __v: 0,
    });
    const [task, setTask] = useState<any>({
      title: "",
      description: "",
      checked: false,
      desk: deskId,
    });

    const [createTaskModalOpen, setCreateTaskModalOpen] =
      useState<boolean>(false);
    const [dataChanged, setDataChanged] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TTaskRef[]>([]);

    useEffect(() => {
      (async () => {
        try {
          setLoading(true);
          const data = await getDesksById(deskId!);
          setDesk(data);
          setTasks(data.tasks);
          setLoading(false);
        } catch (err) {
          setLoading(false);
          setError(err);
          setDeskExist(false);
        }
      })();
    }, [dataChanged]);

    async function handleCreateTask(e: React.FormEvent) {
      e.preventDefault();
      const newTask = await createTask(task);
      setTask({ ...task, title: "", description: "", checked: false });
      setTasks([
        ...tasks,
        { _id: "", title: newTask.title, taskId: newTask._id },
      ]);
    }
    async function handleDeleteTask(taskId: string) {
      await deleteTask({ taskId, deskId });
      setTasks(tasks.filter((task) => {
        console.log({tasks, taskId})
        return task.taskId !== taskId
      }));
    }

    return !loading ? (
      deskExist ? (
        <Container className="App" maxWidth="md">
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <Box
              component="h1"
              sx={{ color: "white", textTransform: "capitalize" }}
            >
              {desk.title}
            </Box>
            <Stack direction="row">
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() => {
                  setCreateTaskModalOpen(true);
                }}
                sx={{
                  color: "#fff",
                  "&:hover": {
                    background: "#3f51b5",
                  },
                }}
              >
                <AddCircleIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <Tasks data={tasks} handlers={{ handleDeleteTask }} />

          <Dialog open={createTaskModalOpen} maxWidth={"md"} fullWidth={true}>
            <Box component="form" onSubmit={handleCreateTask}>
              <DialogTitle>Create new Task</DialogTitle>
              <DialogContent sx={{ paddingTop: "1em !important" }}>
                <FormControl
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    gap: "1em",
                  }}
                >
                  <TextField
                    id="task_title"
                    fullWidth
                    required
                    label="Task title"
                    value={task.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTask({ ...task, title: e.target.value });
                    }}
                    sx={{ background: "#fff" }}
                  />
                  <TextField
                    id="task_description"
                    fullWidth
                    multiline
                    rows={4}
                    label="Task description"
                    value={task.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setTask({ ...task, description: e.target.value });
                    }}
                    sx={{ background: "#fff" }}
                  />
                  <Box sx={{ width: "100%" }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={task.checked}
                          onChange={() =>
                            setTask({ ...task, checked: !task.checked })
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Finished"
                    />
                  </Box>
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button
                  type={"submit"}
                  onClick={(e) => {
                    handleCreateTask(e), setCreateTaskModalOpen(false);
                  }}
                >
                  Create
                </Button>
                <Button onClick={() => setCreateTaskModalOpen(false)}>
                  Cancel
                </Button>
              </DialogActions>
            </Box>
          </Dialog>
        </Container>
      ) : (
        <Container className="App" maxWidth="md">
          <p style={{ color: "white" }}>
            Sorry.... There is no desk with id: {deskId}
          </p>
        </Container>
      )
    ) : (
      <Container className="App" maxWidth="md">
        <p style={{ color: "white" }}>Loading...</p>
      </Container>
    );
  }
}
