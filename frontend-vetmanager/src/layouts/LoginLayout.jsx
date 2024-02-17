import style from './LoginLayout.module.css'
import clsx from 'clsx'

export function LoginLayout({ title, children, img }) {
    const random = Math.ceil(Math.random() * 4)

    const src = `/images/login-${random}.jpg`

    return (
        <main className={style['login-layout']}>
            <picture className={style['login-layout__picture']}>
                <source src={src} />
                <img src={src} alt="background login" />
            </picture>

            <section className={style['login-layout__panel']}>
                {children}
            </section>
        </main>
   )
}