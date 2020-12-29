import Head from 'next/head'
import Link from 'next/link'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function Home () {
    return (
        <div className="Principal">
            <Head>
                <title>Porte-bot</title>
                <link rel="icon" href={ prefix + '/favicon.ico'} />
                <link rel="stylesheet" href={ prefix + '/index.css'} />
            </Head>
            <main>
                <div className='Home'>
                    <div className='center'>
                        <Link href={ prefix + 'Login'}>
                            Login
                        </Link>
                        Home page
                    </div>
                </div>
            </main>
        </div>
    )
}
