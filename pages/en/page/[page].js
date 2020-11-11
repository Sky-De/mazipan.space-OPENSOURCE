import Head from 'next/head'

import Container from '@/components/ContainerBox'
import List from '@/components/Post/List'
import Header from '@/components/Header/Default'
import Pagination from '@/components/Pagination'
import Layout from '@/components/Layout/Home'

import { getPagedPost, getAvailablePage } from '@/lib/api'

export default function PagedPost ({ data, page, next, prev }) {
  return (
    <>
      <Layout>
        <Head>
          <title>Page {page} | mazipan.space</title>
        </Head>
        <Container>
          <Header />

          {data.length > 0 && <List posts={data} lang="en" />}
          <Pagination prev={prev} next={next} lang="en"/>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps ({ params }) {
  const { data, next, prev } = getPagedPost(
    ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt', 'tags'],
    params.page,
    'en'
  )

  return {
    props: { data, page: `${params.page}`, next, prev }
  }
}

export async function getStaticPaths () {
  const pages = getAvailablePage('en')

  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: `${page}`
        }
      }
    }),
    fallback: false
  }
}
