import { fetchNoteById } from "@/lib/api";
import css from "./NotePreview.module.css"
import ModalPreview from "@/components/Modal/ModalPreview";




type Props = {
  params: { id: string };
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const noteItem = await fetchNoteById(id);


  return (
    <ModalPreview>
 <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{noteItem.title}</h2>
          </div>
          <p className={css.tag}>{noteItem.tag}</p>
          <p className={css.content}>{noteItem.content}</p>
          <p className={css.date}>{noteItem.createdAt}</p>
        </div>
        </div>
</ModalPreview>
)
};

export default NotePreview;