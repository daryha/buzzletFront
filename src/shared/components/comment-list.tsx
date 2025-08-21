export default function CommentsList({
  comments,
}: {
  comments: { id: string; text: string; user: { name: string } }[];
}) {
  if (!comments?.length) return <p className="text-sm text-gray-400">Пока нет комментариев</p>;
  return (
    <ul className="space-y-4">
      {comments.map((c) => (
        <li key={c.id} className="p-3 rounded-xl bg-black/10">
          <p className="text-sm text-gray-400 mb-1">{c.user.name}</p>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  );
}
