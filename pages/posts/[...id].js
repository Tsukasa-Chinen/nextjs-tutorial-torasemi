import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

// getAllPostIds()で取得したID群を返す（必須：params）
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths, // [ { params: { id: "pre-rendering" } }, { params: { id: "ssg-ssr" } } ]
    fallback: false // 指定されたページ以外は404を返す
  }
}

// paramsから受け取ったIDをもとにgetPostData()でデータを取得（必須：props）
export async function getStaticProps({ params }) {

  const postData = await getPostData(params.id)

  /** postData
    {
      id: 'ssg-ssr',
      title: 'Server Side Renderingとは？',
      date: '2020-01-05'
    }
  */

  const postDataArr = await getPostData(params.id.join('/'))

  /** postDataArr
    {
      id: '/xxxx/xx/',
      title: 'Server Side Renderingとは？',
      date: '2020-01-05'
    }
  */


  return {
    props: {
      postData
    }
  }
}

// 渡されたprops（postData）のデータを表示する
export default function Post({ postData }) {
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
