"use client";

import Modal from "@/components/Modal/Modal";
import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const {
    data: noteItem,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !noteItem) return <p>Something went wrong.</p>;

  return (
    <Modal
      onClose={() => {
        router.back();
      }}
    >
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{noteItem.title}</h2>
          </div>
          <p className={css.tag}>{noteItem.tag}</p>
          <p className={css.content}>{noteItem.content}</p>
          <p className={css.date}>{noteItem.createdAt}</p>
        </div>
        <button onClick={() => router.back()} className={css.backBtn}>
          Back
        </button>
      </div>
    </Modal>
  );
};

export default NotePreviewClient;
