import style from './MainLayout.module.css'
import clsx from 'clsx'

export function MainLayout({ title, children }) {
    return (
        <main className={style['main-layout']}>
            <nav className={style['main-layout__menu']}></nav>

            <h2 className={clsx(style['main-layout__title'], 'text-3xl', 'font-bold')}>
                {title}
            </h2>

            <search className={style['main-layout__search']}></search>

            <section className={style['main-layout__content']}>
                {children}
            </section>
        </main>
   )
}