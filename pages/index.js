import Head from 'next/head'
import Link from 'next/link'

export default function Home () {
    return (
        <div className="Principal">
            <Head>
                <title>Porte-bot</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/index.css" />
            </Head>
            <main>
                <div className='Home'>
                    <div className='center'>
                        <Link href='Login'>
                            Login
                        </Link>
                        Home page
                    </div>
                </div>
            </main>
        </div>
    )
}
