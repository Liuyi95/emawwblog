import React from 'react';
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { sanityClient ,urlFor} from '../../sanity';
import { GetStaticProps  } from 'next';
import {Post} from "../../typings"
import { PortableText } from '@portabletext/react';

interface Props{
    post: Post
}

const Post = ({post}: Props) => {
  return (
    <div>
      <Header/>

        <img 
        className="w-full h-96 object-cover"
        src={urlFor(post.mainImage).url()!} alt='coverImage'/>
        
      <div className='max-w-3xl mx-auto '>
        <article className="w-full mx-auto p-5 ">
            <h1 className='font-titleFont font-medium 
            text-[32px] text-primary border-b-[1px] mt-10 mb-3'>{post.title}</h1>

            <h2 className = 'font-bodyFont text-[18px]'>{post.description}</h2>
            <div className='flex items-center gap-2'>
                <img className = 'rounded-full w-12 h-12 object-cover'
                src = {urlFor(post.author.image).url()}
                alt='authorImg'/>
                <p className='font-bodyFont text-base'> Blog post by <span>{post.author.name}</span> - 
                Published at   {new Date(post.publishedAt).toDateString()}</p>
            </div>
            <div className='mt-10'>
                <PortableText
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET || 'production' }
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||"5y506co7" }
                    value = {post.body}
                
                />
            </div>
        </article>
      </div>
      <Footer/>
    </div>
  )
}

export default Post;

export const getStaticPaths = async() => {
    const query = `*[_type == "post"]{
        _id,
          slug{
          current
          }
        
      }`;
      const posts = await sanityClient.fetch(query);
      const paths = posts.map((post: Post)=> ({
        params:{
            slug: post.slug.current,

        },
      }));

      return{
        paths,
        fallback:'blocking',
      };
};
export const getStaticProps: GetStaticProps = async({params})=>{
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
            publishedAt,
            title,
            author ->{
                name,
                image,
            },
            description,
            mainImage,
            slug,
            body
    }`

    const post = await sanityClient.fetch(query,{
        slug:params?.slug,
    });

    if (!post){
        return {
            notFound: true,
        };
    }
    return {
        props:{
            post,
        },
        revalidate:60,
    };
};