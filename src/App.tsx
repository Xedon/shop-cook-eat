import { AppContent } from "./AppNavigation";
import { AppMenu } from "./modules/AppMenu/AppMenu";
import { CreateListDialog } from "./modules/CreateListDialog/CreateListDialog";

const App = () => (
  <>
    <AppContent />
    <AppMenu />
    <CreateListDialog />
  </>
);

export default App;
