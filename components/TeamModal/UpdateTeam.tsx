import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FiUpload, FiX, FiCheck, FiRefreshCcw } from "react-icons/fi";
import { Dialog, DialogFooter, DialogHeader, DialogTitle, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/utils/getCroppedImg"; // Fonction utilitaire pour recadrer
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/firebase/clientApp";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useModalTeam } from "@/hooks/useModalTeam";
import { useAuthState } from "react-firebase-hooks/auth";

const UpdateTeam = () => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamImage, setTeamImage] = useState<string | null>(null);
  const { isOpen, onClose, teamId } = useModalTeam();
  const [user] = useAuthState(auth);

  // Charger les données de l'équipe
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const teamRef = doc(db, `Teams/users/${user?.uid}`, teamId);
        const teamDoc = await getDoc(teamRef);
        if (teamDoc.exists()) {
          const { name, description, image } = teamDoc.data();
          setTeamName(name);
          setTeamDescription(description || "");
          setTeamImage(image || null);
        }
        console.log(teamDoc.data());
        
      } catch (error) {
        console.error("Erreur lors du chargement de l'équipe : ", error);
      }
    };

    if (teamId) fetchTeam();
  }, [teamId, user]);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setCroppedImage(null); // Réinitialise l'image recadrée si un nouveau fichier est chargé
    }
  };

  const onCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleDeleteImage = () => {
    setFile(null);
    setCroppedImage(null);
  };

  const handleCrop = async () => {
    if (file && croppedAreaPixels) {
      try {
        const croppedImg = await getCroppedImg(file, croppedAreaPixels);
        setCroppedImage(croppedImg); // Définit l'image recadrée
      } catch (error) {
        console.error("Erreur lors du recadrage : ", error);
      }
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      let downloadURL = teamImage; // Garder l'image actuelle si aucune nouvelle n'est chargée

      if (croppedImage) {
        // Convertir l'image recadrée (base64) en Blob
        const base64Response = await fetch(croppedImage);
        const blob = await base64Response.blob();

        // Référence dans Firebase Storage
        const storageRef = ref(storage, `uploads/${Date.now()}.jpg`);

        // Démarrer l'upload
        const uploadTask = await uploadBytesResumable(storageRef, blob);

        // Obtenir l'URL de l'image uploadée
        downloadURL = await getDownloadURL(uploadTask.ref);
      }

      // Référence de l'équipe dans Firestore
      const teamRef = doc(db, `Teams/users/${user?.uid}`, teamId);

      // Mettre à jour les données de l'équipe
      await updateDoc(teamRef, {
        name: teamName,
        description: teamDescription,
        image: downloadURL, // URL de l'image mise à jour
      });

      toast.success("Équipe mise à jour avec succès!");
      onClose(); // Fermer le modal
    } catch (error) {
      console.error("Erreur lors de la mise à jour : ", error);
      toast.error("Une erreur s'est produite.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Mettre à jour votre équipe</DialogTitle>
        </DialogHeader>
        <div className="relative w-full h-[300px]">
          {croppedImage ? (
            <div className="relative w-full h-full">
              <img
                src={croppedImage}
                alt="Cropped"
                className="w-full h-full object-cover rounded-lg"
              />
              <FiRefreshCcw
                size={24}
                className="absolute top-2 right-2 text-blue-500 cursor-pointer"
                onClick={() => setCroppedImage(null)}
              />
            </div>
          ) : file ? (
            <>
              <Cropper
                image={file}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <FiCheck
                  size={24}
                  className="text-green-500 cursor-pointer"
                  onClick={handleCrop}
                />
                <FiX
                  size={24}
                  className="text-red-500 cursor-pointer"
                  onClick={handleDeleteImage}
                />
              </div>
            </>
          ) : teamImage ? (
            <>
              <img
                src={teamImage}
                alt="Team"
                className="w-full h-full object-cover rounded-lg"
                onClick={() => fileRef.current?.click()}
              />
              <div className="absolute top-2 right-2 flex gap-2">
              <FiRefreshCcw
                size={24}
                className="absolute top-2 right-2 text-blue-500 cursor-pointer"
                onClick={() => setTeamImage(null)}
              />
              </div>
            </>
          ) : (
            <div
              className="border-dashed w-full h-full border border-gray-400 flex justify-center items-center cursor-pointer
              hover:bg-gray-100 hover:brightness-125"
              onClick={() => fileRef.current?.click()}
            >
              <FiUpload size={40} className="text-blue-500" />
              <input
                type="file"
                className="hidden"
                ref={fileRef}
                onChange={handleChangeFile}
                accept="image/*"
              />
            </div>
          )}
        </div>
        <Input
          type="text"
          placeholder="Nom de votre équipe"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          className="mt-4 focus:outline-none border-none"
        />
        <textarea
          value={teamDescription}
          className="mt-4 mx-auto w-full focus:outline-none border-none"
          placeholder="Description de votre équipe"
          onChange={(e) => setTeamDescription(e.target.value)}
        ></textarea>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            className="bg-blue-500 text-white hover:bg-blue-500 hover:brightness-125"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
        <ToastContainer />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTeam;
