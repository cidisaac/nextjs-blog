import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import React from 'react'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string,
    error: boolean
  }
}) {
  return !postData.error ? (
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
  ) : (
    <Layout>
      <Head>
        <title>NOT FOUND</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>NOT FOUND</h1>

      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    var postData = {}
    if(params) {
        postData = await getPostData(params.id as string)
    } else {
        postData = {
            error: true
        }
    }
    return {
        props: {
          postData
        }
      }
}