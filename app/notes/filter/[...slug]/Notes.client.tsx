"use client"
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";


interface NotesClientProps {
  tagSearch: string | undefined;
}

const NotesClient = ({ tagSearch }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const { data } = useQuery({
    queryKey: ["notes", searchQuery, currentPage, tagSearch],
    queryFn: () => fetchNotes(searchQuery, currentPage, tagSearch),
    placeholderData: keepPreviousData,
     refetchOnMount: false,
  });
  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    300,
  );

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;
  useEffect(() => {
    if (searchQuery && data && data.notes.length === 0) {
      toast.error("No notes found for your request.");
    }
  }, [data, searchQuery]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
              <SearchBox onChange={updateSearchQuery} />
              {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
              </button>
              {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
                      <NoteForm onCancel={() => setIsModalOpen(false)}/>
          </Modal>
        )}
          </header>
          {notes.length > 0 && <NoteList notes={notes}  />}
      <div>
        <Toaster />
      </div>
    </div>
  );
}
export default NotesClient

