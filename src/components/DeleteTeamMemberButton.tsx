"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface DeleteTeamMemberButtonProps {
  memberId: string;
  memberName: string;
  memberImage?: string;
  onDelete: () => void;
}

export default function DeleteTeamMemberButton({
  memberId,
  memberName,
  memberImage,
  onDelete,
}: DeleteTeamMemberButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClientComponentClient();

  const handleDelete = async () => {
    if (!confirm(`"${memberName}" isimli takım üyesini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    setIsDeleting(true);
    
    try {
      console.log("Attempting to delete team member with ID:", memberId);
      
      // Delete the team member
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", memberId);
        
      if (error) {
        console.error("Delete error:", error);
        alert(`Silme hatası: ${error.message}`);
        return;
      }
      
      // Delete the image if it's in Supabase storage
      if (memberImage && !memberImage.startsWith("/")) {
        await supabase.storage
          .from("team-images")
          .remove([memberImage]);
      }
      
      // Call the onDelete callback to refresh the list
      onDelete();
      
      // Show success message
      alert("Takım üyesi başarıyla silindi!");
      
    } catch (err) {
      console.error("Error in handleDelete:", err);
      alert("Silme işlemi sırasında bir hata oluştu.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? "Siliniyor..." : "Delete"}
    </button>
  );
}
