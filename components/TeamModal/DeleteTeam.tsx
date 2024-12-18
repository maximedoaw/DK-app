import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { auth, db, storage } from "@/firebase/clientApp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useModalTeam } from "@/hooks/useModalTeam";
import { useAuthState } from "react-firebase-hooks/auth";

const DeleteTeam = () => {
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, teamId } = useModalTeam();
  const [user] = useAuthState(auth);

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Référence de l'équipe dans Firestore
      const teamRef = doc(db, `Teams/users/${user?.uid}`, teamId);

      // Charger les données pour obtenir l'URL de l'image
      const teamDoc = await getDoc(teamRef);
      if (teamDoc.exists()) {
        const { image } = teamDoc.data();

        // Supprimer l'image associée si elle existe
        if (image) {
          const imageRef = ref(storage, image);
          await deleteObject(imageRef);
        }
      }

      // Supprimer l'équipe du Firestore
      await deleteDoc(teamRef);

      toast.success("Équipe supprimée avec succès !");
      onClose(); // Fermer le modal
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipe : ", error);
      toast.error("Une erreur s'est produite lors de la suppression.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Supprimer votre équipe</DialogTitle>
        </DialogHeader>
        <div className="text-center my-4">
          <p>Êtes-vous sûr de vouloir supprimer cette équipe ?</p>
          <p className="text-red-500">Cette action est irréversible.</p>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            className="mr-2"
            onClick={onClose}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Suppression..." : "Supprimer"}
          </Button>
        </DialogFooter>
        <ToastContainer />
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTeam;
