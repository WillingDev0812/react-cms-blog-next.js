import React from 'react'
import Butter from 'buttercms'
import Head from 'next/head'

const butter = Butter('f148a1e8d384482bf3e5aa9e2b3a7af5dc62c734')

export default class extends React.Component {
  static async getInitialProps ({ query }) {
    console.log('query: ', query)
    const resp = await butter.category.retrieve(query.slug, {
      include: 'recent_posts'
    })
    console.log('got posts', resp.data)
    return resp.data
  }
  render () {
    const category = this.props.data

    return (
      <div>
        <Head>
          <title>{category.name}</title>
        </Head>
        <h1>{category.name}</h1>
        <div>
          {this.props.data.recent_posts.map((post, key) => {
            return (
              <div key={key}>
                <a href={`/posts/${post.slug}`}>{post.title}</a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
