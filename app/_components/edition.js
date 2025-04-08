
export default function Edition({ edition, onBookSelection, authors }) {


  if (
    edition == undefined ||
    edition == null ||
    edition.number_of_pages == null
  ) {
    return <></>;
  }

  return (
    <div
      key={edition.key}
      className="text-white flex-col bg-slate-600 mb-3 p-3 rounded-xl"
    >
      <div className="flex flex-row gap-2">
        <img
          src={`https://covers.openlibrary.org/b/id/${edition.covers}-S.jpg`}
          alt="cover_image"
        />
        <div className="flex flex-col">
          <p className="text-md font-semibold">{edition.title}</p>
          {edition != undefined && edition.number_of_pages != null && (
            <p>Number of Pages: {edition.number_of_pages}</p>
          )}
        </div>
      </div>

      <button
        className="text-lg p-2 place-items-center font-bold text-white bg-indigo-900 rounded-md mt-3"
        onClick={() =>
          onBookSelection({
            id: edition.isbn_13,
            title: edition.title,
            author: authors.join(", "),
            number_of_pages: edition.number_of_pages,
            coverUrl: `https://covers.openlibrary.org/b/id/${edition.covers}-M.jpg`,
          })
        }
      >
        Select Edition
      </button>
    </div>
  );
}

// onBookSelection({
//     id: book.isbn,
//     title: book.title,
//     author: book.author_name,
//     pages: book.num_of_pages_median,
//     coverUrl: `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`,
//   })
