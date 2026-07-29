"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

interface GBook {
  id: string;

  volumeInfo: {
    title: string;

    authors?: string[];

    description?: string;

    imageLinks?: {
      thumbnail?: string;
    };

    averageRating?: number;

    publishedDate?: string;

    pageCount?: number;

    categories?: string[];
  };
}

async function searchBooks(query: string): Promise<GBook[]> {
  const q = query || "bestsellers";

  const res = await fetch(`/api/books?q=${encodeURIComponent(q)}`);

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }

  const data = await res.json();

  return data.items || [];
}


const filters = [
  "All",
  "Fantasy",
  "Sci-Fi",
  "Fiction",
  "Mystery",
  "Thriller",
  "Horror",
  "Romance",
  "Adventure",
  "Historical Fiction",
  "Biography",
  "Autobiography",
  "Memoir",
  "Self-Help",
  "Business",
  "Finance",
  "Psychology",
  "Philosophy",
  "Technology",
  "Programming",
  "Artificial Intelligence",
  "Data Science",
  "Health",
  "Fitness",
  "Education",
  "Politics",
  "Religion",
  "Poetry",
  "Comics",
  "Manga",
  "Young Adult",
];

const categoryMap: Record<string, string> = {
  Fantasy: "subject:fantasy",
  "Sci-Fi": "subject:science fiction",
  Fiction: "subject:fiction",
  Mystery: "subject:mystery",
  Thriller: "subject:thriller",
  Horror: "subject:horror",
  Romance: "subject:romance",
  Adventure: "subject:adventure",
  "Historical Fiction": "subject:historical fiction",
  Biography: "subject:biography",
  Autobiography: "subject:autobiography",
  Memoir: "subject:memoir",
  "Self-Help": "subject:self-help",
  Business: "subject:business",
  Finance: "subject:finance",
  Psychology: "subject:psychology",
  Philosophy: "subject:philosophy",
  Technology: "subject:technology",
  Programming: "subject:programming",
  "Artificial Intelligence": "subject:artificial intelligence",
  "Data Science": "subject:data science",
  Health: "subject:health",
  Fitness: "subject:fitness",
  Education: "subject:education",
  Politics: "subject:politics",
  Religion: "subject:religion",
  Poetry: "subject:poetry",
  Comics: "subject:comics",
  Manga: "subject:manga",
  "Young Adult": "subject:young adult",
};


export default function DiscoverPage() {

  const searchParams = useSearchParams();

  const [query,setQuery] = useState("");
  const [books,setBooks] = useState<GBook[]>([]);
  const [active,setActive] = useState("All");
  const [loading,setLoading] = useState(false);

  useEffect(() => {
  const q = searchParams.get("q");

  if (q) {
    setQuery(q);

    async function loadBooks() {
      setLoading(true);

      const result = await searchBooks(q!);

      setBooks(result);

      setLoading(false);
    }

    loadBooks();
  }
}, [searchParams]);

  async function handleSearch(){
  

    setLoading(true);

    const result = await searchBooks(
      query || active
    );

    setBooks(result);

    setLoading(false);
  }


  return (
    <div className="min-h-screen">

      <Navbar />


      <header className="px-6 py-16">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-primary font-mono text-xs uppercase">
            Discover
          </p>


          <h1 className="font-display text-5xl mt-5">
            Search the{" "}
            <span className="italic text-gradient-gold">
              entire
            </span>{" "}
            library
          </h1>


          <p className="text-foreground/60 mt-4">
            Millions of books powered by Google Books API
          </p>



          <div className="max-w-2xl mx-auto mt-10 flex gap-3">

            <input
              value={query}
              onChange={(e)=>setQuery(e.target.value)}
              placeholder="Search books..."
              className="
              flex-1
              glass
              rounded-xl
              px-5
              py-4
              outline-none
              "
            />


            <button
              onClick={handleSearch}
              className="
              bg-primary
              text-primary-foreground
              px-6
              rounded-xl
              "
            >
              Search
            </button>


          </div>



          <div className="flex flex-wrap justify-center gap-3 mt-8">

          {
            filters.map((f)=>(

              <button
              key={f}
              onClick={async () => {

  setActive(f);

  const searchTerm =
    f === "All"
      ? "bestsellers"
      : categoryMap[f] || f;

  setQuery(searchTerm);

  setLoading(true);

  const result = await searchBooks(searchTerm);

  setBooks(result);

  setLoading(false);

}}
              className={`
              px-4 py-2 rounded-full border
              ${
                active===f
                ?
                "border-primary text-primary"
                :
                "border-border"
              }
              `}
              >

              {f}

              </button>

            ))
          }

          </div>


        </div>

      </header>



<section className="px-6 pb-20">


<div className="max-w-7xl mx-auto">


{
loading &&
<p className="text-center">
Loading books...
</p>
}



<div className="
grid
grid-cols-2
md:grid-cols-4
lg:grid-cols-6
gap-6
">


{
books.map((book)=>{

const info = book.volumeInfo;

const image =
info.imageLinks?.thumbnail?.replace("http:", "https:");

return (
<Link
  href={`/book/${book.id}?title=${encodeURIComponent(info.title)}`}
  key={book.id}
  className="group"
>
<div
className="
aspect-[2/3]
rounded-xl
overflow-hidden
glass
relative
"
>


{
image ?

<img
src={image}
alt={info.title}
className="w-full h-full object-cover"
/>

:

<div
className="
h-full
flex
items-center
justify-center
p-3
text-center
"
>
{info.title}
</div>

}


</div>



<h3
className="
mt-3
font-semibold
text-sm
line-clamp-2
group-hover:text-primary
"
>
{info.title}
</h3>



<p
className="
text-xs
text-foreground/50
"
>
{
info.authors?.join(", ")
||
"Unknown Author"
}
</p>



{
info.averageRating && (

<div className="text-primary text-xs mt-2">
{"★".repeat(Math.round(info.averageRating))}
</div>

)
}



<div className="flex gap-2 mt-3">


<button
className="
text-xs
px-3
py-1
rounded-full
border
hover:border-primary
"
>
❤️ Save
</button>



<button
className="
text-xs
px-3
py-1
rounded-full
bg-primary
text-primary-foreground
"
>
🤖 Ask AI
</button>


</div>


</Link>

)

})
}



</div>


</div>


</section>



<Footer />


</div>
  )
}
