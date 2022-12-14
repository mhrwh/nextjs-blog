//import { getAllPostIds, getPostData } from '../../lib/posts'
import Layout from '../../components/layout'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import Head from 'next/head'

const Post = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  try {
      const host = 'wordpress'
      const protocol = 'http'
      const post = await fetch(`${protocol}://${host}/wp-json/wp/v2/posts/${context.query.id}`)
          .then(data => data.json())
      return {
        props: {
          postData: {
            title: post.title.rendered,
            date: post.date,
            contentHtml: post.content.rendered,
          }
        }   
          
      }
  } catch (e) {
      console.log(e)
      return {
          props: {
            postData: {
              title: "error",
              date: "error",
              contentHtml: "error",
            }
          }
      }
  }
}

// export const getStaticPaths = async() => {
//   const paths = getAllPostIds()
//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps = async({ params }) => {
//   // "await" キーワードを以下のように追加する
//   const postData = await getPostData(params.id)
//   return {
//     props: {
//       postData
//     }
//   }
// }

export default Post;