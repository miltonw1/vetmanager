import Link from 'next/link'
import styles from './Navigation.module.css'

const links = [{
    label: 'Clientes',
    route: '/books'
}
]

export function Navigation() {
    return (
        <header className={styles.header}>
            <picture className={styles['header__brand-logo']}>
                <img src="/Golden Retriever Silhouette white.svg" className={styles['svg-logo']}  />
            </picture>

            <nav>
                <ul className={styles.navigation}>
                    {links.map(({ label, route }) => (
                        <li key={route}>
                            <Link href={route}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>)
}