import Todo2Home from "./Todo2Home";
import Todo2Provider from "./Todo2Provider";
import { SnackbarProvider } from "notistack";

export default function Todo2() {
  return (
    <Todo2Provider>
      <Todo2Home />
      <SnackbarProvider />
    </Todo2Provider>
  );
}
