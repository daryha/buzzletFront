export default function CommentForm({ postId }: { postId: string }) {
  return (
    <form className="mb-6">
      <textarea
        className="w-full rounded-xl p-3 bg-black/20 outline-none"
        placeholder="Оставить комментарий…"
        rows={4}
      />
      <button type="submit" className="mt-3 px-4 py-2 rounded-xl bg-secondary">
        Отправить
      </button>
    </form>
  );
}
