import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";

function App() {
  return (
    <>
      <Stack spacing={2} direction="row">
        <Button className="bg-red-500 text-black" variant="text">
          Hello Tailwind v4
        </Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </>
  );
}

export default App;
