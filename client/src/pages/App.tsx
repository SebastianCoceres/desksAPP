import React, { useState, useEffect } from "react";
import { TDesk } from "@/@types/schema";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  TextField,
} from "@mui/material";
import Desks from "@/components/Desks/";
import { getDesks, createDesk, deleteDesk, editDesk } from "api/desksApi";

function App() {
  const [title, setTitle] = useState("");
  const [desks, setDesks] = useState<TDesk[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editModalContent, setEditModalContent] = useState({
    title: "",
    id: "",
  });
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getDesks();
      setDesks(data);
    })();
  }, [dataChanged]);

  async function handleCreateDesk(e: React.FormEvent) {
    e.preventDefault();
    const newDesk = await createDesk(title);
    setTitle("");
    setDesks([...desks, newDesk]);
  }

  async function handleDeleteDesk(deskId: string) {
    deleteDesk(deskId);
    setDesks(desks.filter((desk) => desk._id !== deskId));
  }

  async function handleEditDesk(deskId: string, newTitle: string) {
    await editDesk(deskId, newTitle);
    setDataChanged(!dataChanged);
  }

  return (
    <Container className="App" maxWidth="md">
      <Box component="h1" sx={{ color: "white" }}>
        Home
      </Box>
      <Box component="form" onSubmit={handleCreateDesk}>
        <FormControl sx={{ display: "flex", flexDirection: "row" }}>
          <TextField
            id="deck_title"
            variant="filled"
            label="New desk title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
            sx={{ flexGrow: "1", marginRight: "1em", background: "#fff" }}
          />
          <Button type="submit" variant="contained">
            Create Desk
          </Button>
        </FormControl>
      </Box>
      <Desks
        data={desks}
        handlers={{
          handleDeleteDesk,
          handleEditDesk,
          setEditModalOpen,
          setEditModalContent,
          editModalContent,
        }}
      />
      <Dialog
        open={editModalOpen}
        onClose={() => {
          handleEditDesk(editModalContent.id, editModalContent.title),
            setEditModalOpen(false);
        }}
      >
        <DialogTitle>Edit Desk</DialogTitle>
        <DialogContent>
          <DialogContentText>{editModalContent.id}</DialogContentText>
          <TextField
            autoFocus
            id="newTitle"
            label="New Title"
            type="text"
            value={editModalContent.title}
            fullWidth
            variant="standard"
            onChange={(e) =>
              setEditModalContent({
                ...editModalContent,
                title: e.target.value,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleEditDesk(editModalContent.id, editModalContent.title),
                setEditModalOpen(false);
            }}
          >
            Change!
          </Button>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
