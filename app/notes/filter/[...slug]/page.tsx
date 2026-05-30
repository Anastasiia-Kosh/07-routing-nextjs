import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClientSlug from "./Notes.client";


interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
const queryClient = new QueryClient();


  

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClientSlug tagSearch={tag}/>
    </HydrationBoundary>
  );
};
export default NotesByCategory;
