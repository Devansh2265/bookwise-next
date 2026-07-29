"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import UserStatus from "@/components/UserStatus";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


const trending = [
  {
    title: "The Book Thief",
    author: "Markus Zusak",
    rating: 5,
    cover: "/images/book-thief.jpg",
  },
  {
    title: "The Silent Echo",
    author: "Elena Vance",
    rating: 5,
    cover: "/images/book-silent-echo.jpg",
  },
  {
    title: "Paper Moons",
    author: "Sana K. Moore",
    rating: 4,
    cover: "/images/book-paper-moons.jpg",
  },
  {
  title: "Atomic Habits",
  author: "James Clear",
  rating: 5,
  cover: "/images/atomic-habits.jpg",
},
{
  title: "Dune",
  author: "Frank Herbert",
  rating: 5,
  cover: "/images/dune.jpg",
},
{
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  rating: 5,
  cover: "/images/hobbit.jpg",
},
];


const categories = [
  "Fiction",
  "Philosophy",
  "Design",
  "Memoir",
  "Sci-Fi",
  "Fantasy",
  "Poetry",
  "History",
];


function Stars({count}:{count:number}){

return (
<div className="flex gap-1 text-primary text-xs">

{
Array.from({length:5}).map((_,i)=>(
<span key={i}
className={
i<count ? "" : "text-foreground/15"
}
>
★
</span>
))
}

</div>
)

}



export default function Home(){
const [activeCategory, setActiveCategory] = useState("");

return (
<div className="min-h-screen">

  <Navbar />

  <div className="max-w-7xl mx-auto px-6 pt-4">
    <UserStatus />
  </div>

<section className="relative px-6 pt-20 pb-32 overflow-hidden">


<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">


<div>


<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs text-primary mb-8">

<span className="size-1.5 bg-primary rounded-full animate-pulse"/>

AI-Powered Discovery

</div>



<h1 className="font-display text-5xl md:text-7xl leading-tight">

Discover Your Next

<span className="italic text-gradient-gold">
 Favorite
</span>

 Book

</h1>



<p className="text-lg text-foreground/60 mt-6 max-w-lg">

Search millions of books, compare prices,
read trusted reviews, and get AI-powered
recommendations from your personal librarian.

</p>



<div className="flex gap-4 mt-10">


<Link
href="/discover"
className="bg-primary text-primary-foreground px-7 py-3 rounded-xl font-bold"
>
Explore Books
</Link>



<Link
href="/ai"
className="glass px-7 py-3 rounded-xl font-bold"
>
Get Recommendations
</Link>


</div>


</div>{/* Floating Books */}

<div className="relative h-[520px] hidden lg:block">

<div className="absolute top-8 right-44 w-52 aspect-[2/3] rotate-[8deg] z-10 opacity-90 shadow-glow-indigo rounded-lg overflow-hidden ring-1 ring-border animate-float">

<Image
src="/images/book-silent-echo.jpg"
alt="The Silent Echo"
fill
sizes="(max-width: 768px) 100vw, 220px"
className="object-cover"
/>

</div>



<div className="absolute bottom-2 right-2 w-52 aspect-[2/3] rotate-[-6deg] z-20 shadow-glow-indigo rounded-lg overflow-hidden ring-1 ring-border animate-float">

<Image
src="/images/book-paper-moons.jpg"
alt="Paper Moons"
fill
sizes="(max-width: 768px) 100vw, 220px"
className="object-cover"
/>

</div>




<div className="absolute top-0 right-16 w-60 aspect-[2/3] rotate-[-12deg] z-30 shadow-glow-indigo rounded-lg overflow-hidden ring-2 ring-primary/30 animate-float">

<Image
src="/images/book-thief.jpg"
alt="The Book Thief"
fill
sizes="(max-width: 768px) 100vw, 240px"
priority
className="object-cover"
/>

</div>


</div>


</div>

</section>



{/* Categories */}

<section className="px-6 py-12 border-y border-border bg-card/30">


<div className="max-w-7xl mx-auto flex flex-wrap gap-3 justify-center">



{
categories.map((c) => (

<Link
  key={c}
  href={`/discover?q=subject:${encodeURIComponent(c)}`}
  onClick={() => setActiveCategory(c)}
  className={`px-5 py-2 rounded-full border text-sm transition ${
    activeCategory === c
      ? "border-primary bg-primary/10 text-primary"
      : "border-border text-foreground/60 hover:border-primary hover:text-primary"
  }`}
>
  {c}
</Link>

))
}


</div>


</section>





{/* Trending Books */}


<section className="px-6 py-24">


<div className="max-w-7xl mx-auto">


<div className="mb-12">

<span className="text-primary text-xs uppercase tracking-widest">
Curated Selection
</span>


<h2 className="font-display text-4xl md:text-5xl mt-3">
Trending in the Library
</h2>


</div>



<div className="
grid
grid-cols-2
md:grid-cols-3
lg:grid-cols-6
gap-6
">


{
trending.map((book)=>(

<Link
key={book.title}
href={`/book/${encodeURIComponent(book.title)}`}
className="group"
>

<div className="
aspect-[2/3]
glass
rounded-xl
overflow-hidden
relative
group-hover:-translate-y-1
transition
">


{
book.cover ?

<Image
src={book.cover}
alt={book.title}
fill
sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
className="object-cover"
/>

:

<div className="
h-full
flex
items-center
justify-center
text-center
p-3
text-foreground/40
">

{book.title}

</div>

}


</div>



<h3 className="
font-semibold
text-sm
mt-3
group-hover:text-primary
">

{book.title}

</h3>


<p className="text-xs text-foreground/50">

{book.author}

</p>


<Stars count={book.rating}/>


</Link>


))
}



</div>


</div>


</section>





      {/* AI Section */}

      <section className="px-6 py-16">

        <div className="max-w-6xl mx-auto glass rounded-[2rem] p-10">

          <h2 className="font-display text-4xl md:text-5xl">
            Your personal librarian, powered by AI.
          </h2>

          <p className="text-foreground/60 mt-5 max-w-xl">
            Describe a mood, feeling, or favorite book and discover your next perfect read.
          </p>

          <Link
            href="/ai"
            className="inline-block mt-8 bg-primary text-primary-foreground px-7 py-3 rounded-xl font-bold"
          >
            Start Conversation
          </Link>

        </div>

      </section>


      <Footer />

    </div>
  );
}