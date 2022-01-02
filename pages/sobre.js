import Link from 'next/link';

function Title(props) {
    return (
      <h1 style={{ color: props.color }}>{props.children}</h1>
    )
}

export default function Sobre(props) {
    return (
        <div>
            <header>
                <Title color="purple">Página Sobre</Title>

            </header>
            <header className="headerContainer">
                <a href={`${props.url_github}${props.username}/${props.repo}`} target='blank'> 
                    {props.repo}
                </a>   
            </header>
            <Link href="/">
                <a>
                    Link para Home!
                </a>
            </Link>
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