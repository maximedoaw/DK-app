import { useModalTeam } from "@/hooks/useModalTeam";
import CreateTeam from "./CreateTeam";
import UpdateTeam from "./UpdateTeam";
import DeleteTeam from "./DeleteTeam";


function TeamModal() {
  const { isOpen, onOpen, onClose, View } = useModalTeam();
  return (
   <>
   { View === "Create" && <CreateTeam /> }
   { View === "Edit" && <UpdateTeam/> }
   { View === "Delete" && <DeleteTeam/> }
   </>
  );
}

export default TeamModal