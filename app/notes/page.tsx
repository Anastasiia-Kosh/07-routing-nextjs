// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";
// import NotesClient from "./Notes.client";
// import { fetchNotes } from "@/lib/api";

// interface Props {
//   searchParams: {
//     searchQuery: string;
//     currentPage: number;
//   };
// }

// const Notes = async ({ searchParams }: Props) => {
//   const searchQuery = searchParams?.searchQuery ?? "";
//   const currentPage = Number(searchParams?.currentPage) || 1;

//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery({
//     queryKey: ["notes", searchQuery, currentPage],
//     queryFn: () => fetchNotes(searchQuery, currentPage),
//   });

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <NotesClient />
//     </HydrationBoundary>
//   );
// };
// export default Notes;
