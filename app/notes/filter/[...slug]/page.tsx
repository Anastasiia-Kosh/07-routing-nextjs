import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "../../Notes.client";

interface Props {
  params: {
    slug: string[];
  };

  searchParams: {
    searchQuery?: string;
    currentPage?: string;
  };
}

const NotesByCategory = async ({ searchParams, params }: Props) => {
  const searchQuery = 
    searchParams?.searchQuery ?? "";

  const currentPage = 
    Number(searchParams?.currentPage) || 1;

const tag =
  params.slug?.[0] === "all"
    ? undefined
    : params.slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchQuery, currentPage, tag],
    queryFn: () => fetchNotes(searchQuery, currentPage, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};
export default NotesByCategory;
