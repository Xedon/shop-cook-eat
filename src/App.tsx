import { AppContent } from "./AppNavigation";
import { AppMenu } from "./modules/AppMenu/AppMenu";
import { CreateListDialog } from "./modules/CreateListDialog/CreateListDialog";
import { LoginDialog } from "./modules/Login/LoginDialog";

const App = () => (
  <>
    <AppContent />
    <AppMenu />
    <CreateListDialog />
    <LoginDialog />
  </>
);

export default App;
