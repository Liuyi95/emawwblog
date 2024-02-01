import Head from "next/head";
import "slick-carousel/slick/slick.css";
import Image from 'next/image'
// import Banner from "../components/Banner";
// import BannerBottom from "../components/BannerBottom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import sanityCli from "../sanity.cli";
import { sanityClient, urlFor } from "../sanity";
import { Post} from "../typings"
import Link from "next/link";
interface Props{
  posts:[Post];
}

export default function Home({posts}: Props) {
  console.log(posts);

  return (

          
    <div>
      <Head>
        <title>Emaww Blog :: Blog</title>
        <link rel="icon" href="/smallLogo.ico" />
      </Head>

      <main className="font-bodyFont">
        {/* ============ Header Start here ============ */}
        <Header />
        <div className='max-w-3xl mx-auto '>
        <h1 className="font-titleFont 
        font-medium  text-[32px] text-primary font-blog mt-10 mb-3"> BLOG </h1>
        <h2 className = 'font-bodyFont text-[18px]'>We connect, grow and augment our lives by way of clicks, scrolls and taps on our screens, trackpads and mice.</h2>
        </div>
        
        {/* ============ Header End here ============== */}
        {/* ============ Banner Start here ============ */}
        {/* <Banner /> */}
        {/* ============ Banner End here ============== */}
        {/* <div className="max-w-7xl mx-auto h-60 relative">
          <BannerBottom />
        </div> */}
        {/* ============ Banner-Bottom End here ======= */}
        {/* ============ Post Part Start here ========= */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 py-6 px-4">   
          { 
            posts.map((post)=>(
            
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="border-[1px] border-secondaryColor border-opacity-40 h-[450px] group ">
              <div className="h-3/5 w-full overflow-hidden">
                <img 
                width = {300}
                height = {300}
                src={urlFor(post.mainImage).url()!}
                alt = "images"
                className="w-full h-full object-cover brightness-75 group-hover:brightness-100
                duration-300 group-hover:scale-110"
                />
              </div> 

              <div className='h-2/5 w-full flex flex-col justify-center'>
                <div className="flex justify-between items-center px-4 py-1 border-b-[1px] border-b-gray-500">
                  <p className="font-bold"> {post.title} </p>
                  <img 
                  className="w-12 h-12 rounded-full object-cover"
                  src={urlFor(post.author.image).url()!} alt='authorImg'
                   />
                </div>
                <p className='py-2 px-4 text-base'>
                    {post.description.substring(0,60)}
                   </p>
              </div>
 
              </div>
              
            </Link>

            ))
          }

        </div>
        {/* ============ Post Part End here =========== */}
        {/* ============ Footer Start here============= */}
        <Footer />
        {/* ============ Footer End here ============== */}
      </main>
    </div>
  );
}

export const getServerSideProps =async ()=> {
  const query = `*[_type == "post"]{
    _id,
    title,
    author ->{
      name,
      image
    },
      description,
      mainImage,
      slug,
      body
  }`;
  const posts = await sanityClient.fetch(query)
  return{
    props:{
      posts,
    },
  };

};
  

