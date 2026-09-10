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
                <h1 className="text-4xl font-bold text-violet-800 text-center pt-10">Vet Manager</h1>
                {children}
            </section>
        </main>
   )
}