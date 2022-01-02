import React from 'react';
import Link from 'next/link';
import styled from 'styled-components'
import Footer from '../components/Footer';

const SubTitle = styled.h2`
  background-color: var(--primary);
  color: white;
  display: inline-block;
  padding: 5px;
`;


export default function Home(props) {
  return (
    <div>
      <header className="headerContainer">
      <img src={props.avatar_url}/>
      <Link href="/sobre">
        <a>
          <h1>André Lourenço Blog</h1>
        </a>
      </Link>
      </header>
      <section className="postContainer">
          <SubTitle> Posts</SubTitle>
          
              <article className="postContainer__post">
                <a href="/">
                  Alura.js 01!
                </a>
                <p>
                  O que aprendi com o  CDFTV e a Alura nesse episódio show!
                </p>
            </article>
       
        </section>

        <section className="postContainer">
          <SubTitle> Repositórios Favoritos</SubTitle>
          {props.repos.map((project,key) => (
              <article key={key} className="postContainer__post">
                <a href={`${props.url_github}${props.username}/${project.repo}`} target='blank'>
                  {project.repo}
                </a>
                <p>
                  {project.description}
                </p>
            </article>
         ))}
        </section>
        <Footer/>
    </div>
    

  )
}

export async function getStaticProps(){

  const githubResponse = await fetch(process.env.NODE_ENV_URL_API_GITHUB)
    .then(res => res.json())

  const repos = await fetch(process.env.NODE_ENV_URL_API_REPO)
    .then(res => res.json() )

  return {
    props: {
      url_github:process.env.NODE_ENV_URL_GITHUB,
      username: githubResponse.login,
      avatar_url: githubResponse.avatar_url,
      repos
    }
  }
}