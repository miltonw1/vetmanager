import style from './LoginLayout.module.css'
import { useMemo } from 'react';
import clsx from 'clsx'

export function LoginLayout({ title, children, img }) {
    const src = useMemo(() => {
        const random = Math.ceil(Math.random() * 4);
        return `/images/login-${random}.jpg`;
    }, []);

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